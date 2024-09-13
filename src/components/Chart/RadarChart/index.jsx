import React from 'react';
import { PolarGrid, PolarAngleAxis, ResponsiveContainer, Radar, Legend, RadarChart } from 'recharts';
import { useState, useEffect } from 'react';
import { getUserPerformance } from '../../../services/api';

  function Radarchart() {

    const [userPerformanceData, setUserPerformanceData] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await getUserPerformance(12);

                console.log(response)
                if (response.data) {
                    const transformedData = response.data.data.map(item => ({
                        subject: response.data.kind[item.kind],
                        A: item.value,
                    }));
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
    console.log(userPerformanceData)

    const formatLabel = (value) => {
        if(value=== 'intensity') return 'Intensité'
        if(value=== 'cardio') return 'Cardio'
        if(value=== 'energy') return 'Energie'
        if(value=== 'endurance') return 'Endurance'
        if(value=== 'strength') return 'Force'
        if(value=== 'speed') return 'Vitesse'
    }

    return (
    // <ResponsiveContainer width="300px" height="300px">                             
        <RadarChart className="radarChart" outerRadius={90} width={350} height={300} data={userPerformanceData}>
            <PolarGrid stroke="#FFFFFF" radialLines={false} polarRadius={[0, 10, 27, 49, 72, 90]} />
            <PolarAngleAxis dataKey="subject" dy={4} tickSize={15} tickFormatter={formatLabel}/>
            {/* <PolarRadiusAxis angle={30} domain={[0, 150]} /> */}
            <Radar dataKey="A" fill="#FF0101B2" fillOpacity={1} />
            <Legend />
        </RadarChart>
    // </ResponsiveContainer>
)}

export default Radarchart