
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
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

    const CustomAxisTick = ({ x, y, payload }) => (
        <text x={x - 30} y={y + 10} dy={16} textAnchor="middle" fill="rgba(255, 255, 255, 0.6)">
            {payload.value}
        </text>
    );

    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!sessionData || !sessionData.data || !sessionData.data.sessions) {
        return <div>No data available</div>;
    }

    return (
        <AreaChart
            width={300}
            height={300}
            data={sessionData.data.sessions}
            margin={{ top: 10, right: 0, left: 0, bottom: 30 }}
            style={{ background: 'red', borderRadius: '10px' }}
        >
            <defs>
                <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                    <stop offset="65%" stopColor="rgba(255, 255, 255, 0.5)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0.9)" />
                </linearGradient>
            </defs>
            <XAxis
                dataKey="day"
                tickFormatter={formatLabel}
                stroke="rgba(255, 255, 255, 1)"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                padding={{ left: 20, right: 20 }}
                domain={['dataMin-10', 'dataMax+10']}
                // tick={<CustomAxisTick />}
            />
            <YAxis hide domain={['dataMin-10', 'dataMax+10']} />
            <Tooltip />
            <Area
                type="natural"
                dataKey="sessionLength"
                strokeWidth={3}
                stroke="url(#strokeGradient)"
                fillOpacity={1}
                fill="url(#colorUv)"
            />
        </AreaChart>
    );
}

export default Areachart;
