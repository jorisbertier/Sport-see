
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
                setLoading(false); // Fin du chargement
            }
        };

        fetchData();
    }, []);

    const formatLabel = (value) => {
        if (value === 1) return 'L';
        if (value === 2) return 'M';
        if (value === 3) return 'M';
        if (value === 4) return 'J';
        if (value === 5) return 'V';
        if (value === 6) return 'S';
        if (value === 7) return 'D';
        return value;
    };

    // const CustomAxisTick = ({ x, y, payload }) => (
    //     <text className='test' x={x} y={y + 10} dy={0} textAnchor="" fill="rgba(255, 255, 255, 0.6)">
    //         {payload.value}
    //     </text>
    // );

    const CustomLegend = (props) => {
        const { payload } = props;
    
        return (

            <span className='recharts-legend-item-text'>Durée moyenne <br></br>des sessions</span>

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
        console.log(props);
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

    return (

        <AreaChart
            width={300}
            height={300}
            data={sessionData.data.sessions}
            margin={{ top: 0, right: 0, left: 0, bottom: 30 }}
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
            <XAxis
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
            />
            <YAxis hide domain={['dataMin-10', 'dataMax+10']} />
            <Tooltip cursor={<CustomCursor />} />
            <Scatter dataKey="cnt" fill="red" />
            <Legend className="test" height={36} content={<CustomLegend/>}/>
            <Area
                type="natural"
                dataKey="sessionLength"
                strokeWidth={3}
                stroke="url(#strokeGradient)"
                fillOpacity={1}
                fill="url(#colorUv)"
                padding={{ left: -20, right: -20 }}
            />
        </AreaChart>
    );
}

export default Areachart;
