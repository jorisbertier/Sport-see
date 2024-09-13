
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Scatter, Rectangle, Legend } from 'recharts';
import { getUserAverageSessions } from '../../../services/api';

function Areachart() {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserAverageSessions(12);
                if (response && response.data && response.data.sessions) {
                    setSessionData(response);
                } else {
                    throw new Error('Invalid data structure');
                }
            } catch (err) {
                console.log('Error getting data user average sessions', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // const formatLabel = (value) => {
    //     if (value === 1) return 'L';
    //     if (value === 2) return 'M';
    //     if (value === 3) return 'M';
    //     if (value === 4) return 'J';
    //     if (value === 5) return 'V';
    //     if (value === 6) return 'S';
    //     if (value === 7) return 'D';
    //     return value;
    // };
    const CustomLegend = (props) => {
        const { payload } = props;
        console.log(payload)
    
        return (
            <div>
                <span className='recharts-legend-item-text'>Durée moyenne des<br></br> sessions</span>
                
                <div className='recharts-legend-item-day'>
                    <div>L</div>
                    <div>M</div>
                    <div>M</div>
                    <div>J</div>
                    <div>V</div>
                    <div>S</div>
                    <div>D</div>
                </div>
            </div>

        );
    };

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!sessionData || !sessionData.data || !sessionData.data.sessions) {
        return <div>No data available</div>;
    }
    const CustomCursor = (props) => {
        const { points, width, height, stroke } = props;
        const { x, y } = points[0];
        // const { x1, y1 } = points[1];
        return (
          <Rectangle
            fill="#E60000"
            stroke="#E60000"
            x={x}
            y={y}
            width={300}
            height={310}
            opacity={0.6}
            borderRadius={30}
          />
        );
      };

    const CustomTooltip = ({ active, payload }) => {

        if (active && payload && payload.length) {
        return (
        <div className='payload--arechart'>
            {payload[0].value} min
        </div>
        );
    }
    
    return null;
    };

    return (
        <div className="chart-container">
        <AreaChart
            width={300}
            height={300}
            data={sessionData.data.sessions}
            margin={{ top: 0, right: -20, left: -20, bottom: -10 }}
            padding={{left: 0}}
            style={{ background: 'red', borderRadius: '10px' }}  
        >
            <defs>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                    <stop offset="65%" stopColor="rgba(255, 255, 255, 0.5)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.9)" />
                </linearGradient>
                <linearGradient id="strokeGradientBackground" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="65%" stopColor="rgba(255, 255, 255, 0)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                </linearGradient>
            </defs>
            {/* <XAxis
                dataKey="day"
                tickFormatter={formatLabel}
                stroke="rgba(255, 255, 255, 1)"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                padding={{ left: 20, right: 30 }}
                // domain={['dataMin-30', 'dataMax-30']}
                // tick={<CustomAxisTick />}
                interval={0}
            /> */}
            <YAxis hide domain={['dataMin-10', 'dataMax+10']} />
            <Legend height={36} content={<CustomLegend/>}/>
            <Tooltip
            cursor={<CustomCursor />}
            content={<CustomTooltip />}
            />
            <Scatter dataKey="cnt" fill="red"  points={[{ cx: 0, cy: 0, r: 0, payload: {x: 0, y: 0, z: 0 }}]}/>
            <Area
                type="basis"
                dataKey="sessionLength"
                strokeWidth={3}
                stroke="url(#strokeGradient)"
                fillOpacity={1}
                fill="url(#colorUv)"
            />
        </AreaChart>
            </div>
    );
}

export default Areachart;
