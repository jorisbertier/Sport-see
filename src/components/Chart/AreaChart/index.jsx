import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getUserAverageSessions } from '../../../services/api';
import { useState, useEffect } from 'react';

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]
    

function Areachart() {

    const [sessionData, setSessionData] = useState([])
    
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const data = await getUserAverageSessions(12)
                setSessionData(data)
                console.log(data)
            }
            catch(err){
                console.log('Error getting data user average sessions', err)
                throw err
            }
        }
        fetchData()
    }, [])

    console.log(sessionData.data.sessions)

    const formatLabel = (value) => {
		if (value === 1) return 'L'
		if (value === 2) return 'M'
		if (value === 3) return 'M'
		if (value === 4) return 'J'
		if (value === 5) return 'V'
		if (value === 6) return 'S'
		if (value === 7) return 'D'
		return value
	}
    return (
        <AreaChart width={300} height={300} data={sessionData.data.sessions}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="15%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <XAxis dataKey={data.day} tickCount={0} tickFormatter={formatLabel}/>
            {/* <YAxis /> */}
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Area type="monotone" dataKey="sessionLength" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
    )
}

export default Areachart