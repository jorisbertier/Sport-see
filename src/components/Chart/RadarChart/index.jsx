import React from 'react';
import { PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar, Legend, RadarChart } from 'recharts';
import { useState, useEffect } from 'react';
import { getUserPerformance } from '../../../services/api';

function Radarchart() {

    const [userPerformanceData, setUserPerformanceData] = useState(null);
    console.log(userPerformanceData)
    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getUserPerformance(18);

                if (response.data) {
                    const transformedData = response.data.data.map(item => ({
                        subject: response.data.kind[item.kind],
                        A: item.value,
                    }));
                    transformedData.reverse();
                    setUserPerformanceData(transformedData);
                } else {
                    console.error('Unexpected response structure:', response);
                }
            }
            catch(err) {
                console.log('Error getting data user performance', err)
            }
        }
        fetchData()

    }, [])

    const formatLabel = (value) => {
        if(value=== 'intensity') return 'Intensité'
        if(value=== 'cardio') return 'Cardio'
        if(value=== 'energy') return 'Energie'
        if(value=== 'endurance') return 'Endurance'
        if(value=== 'strength') return 'Force'
        if(value=== 'speed') return 'Vitesse'
    }

    return (
    // <div className='responsive--chart'>
        <ResponsiveContainer width={320} height="100%">                             
            <RadarChart className="radarChart" outerRadius={90} data={userPerformanceData}>
                <PolarGrid stroke="#FFFFFF" radialLines={false} polarRadius={[0, 10, 27, 49, 72, 90]} />
                <PolarAngleAxis dataKey="subject" dy={4} tickSize={15} tickFormatter={formatLabel}/>
                {/* <PolarRadiusAxis angle={30} domain={[0, 150]} /> */}
                <Radar dataKey="A" fill="#FF0101B2" fillOpacity={1} />
                <Legend />
            </RadarChart>
        </ResponsiveContainer>
    // </div>
)}

export default Radarchart