import React from 'react';
import { PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, RadarChart } from 'recharts';
import { useState, useEffect } from 'react';
import { getUserPerformance } from '../../../services/api';

const data = [
    {
      "subject": "Math",
      "A": 120,
      "B": 110,
      "fullMark": 150
    },
    // {
    //   "subject": "Chinese",
    //   "A": 98,
    //   "B": 130,
    //   "fullMark": 150
    // },
    {
        "subject": "English",
        "A": 86,
        "fullMark": 150
    },
    {
      "subject": "Geography",
      "A": 99,
      "B": 100,
      "fullMark": 150
    },
    {
      "subject": "Physics",
      "A": 85,
      "B": 90,
      "fullMark": 150
    },
    {
      "subject": "History",
      "A": 65,
      "B": 85,
      "fullMark": 150
    }
  ]
  
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
    console.log(data)

    return (                             
    <RadarChart className="radarChart"outerRadius={90} width={730} height={250} data={userPerformanceData} style={{backgroundColor: 'red'}}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        {/* <PolarRadiusAxis angle={30} domain={[0, 150]} /> */}
        <Radar dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Legend />
    </RadarChart>
)}

export default Radarchart