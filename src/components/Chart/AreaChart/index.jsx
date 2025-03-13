
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, Tooltip, Rectangle, Legend, ResponsiveContainer } from 'recharts';
import { getUserAverageSessions } from '../../../services/api';

function Areachart({id}) {
    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserAverageSessions(id);
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

    console.log('sessisondate', sessionData)

    const CustomLegend = (props) => {
        // const { payload } = props;
        // console.log(payload)
    
        return (
            <div>
                <div className='recharts-text'>Durée moyenne des<br></br> sessions</div>
                
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
                y={y - 100}
                width={350}
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
        <ResponsiveContainer width={320} height="100%" minHeight="200px" minWidth="200px">  
            <AreaChart
                width={300}
                height={300}
                data={sessionData.data.sessions}
                // margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                margin={{ top: 100, right: -20, left: -20, bottom: -10 }}
                padding={{left: 0}}
                style={{ background: 'red', borderRadius: '10px' }}  
            >
                <defs>
                    <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                        <stop offset="75%" stopColor="rgba(255, 255, 255, 0.8)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0.9)" />
                    </linearGradient>
                    <linearGradient id="strokeGradientBackground" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0)" />
                        <stop offset="75%" stopColor="rgba(255, 255, 255, 0)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                    </linearGradient>
                </defs>
                <div className='recharts-legend-item-text'>Durée moyenne des<br></br> sessions</div>
                <Legend height={80} content={CustomLegend}/>
                <Tooltip
                    offset={0}
                    cursor={<CustomCursor />}
                    content={<CustomTooltip />}
                />
                <Area
                    type="monotone"
                    dataKey="sessionLength"
                    strokeWidth={3}
                    stroke="url(#strokeGradient)"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                    dot={false}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export default Areachart;
