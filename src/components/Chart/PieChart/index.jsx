import { PieChart, Pie, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import { getUserScore } from '../../../services/api';

// const data01 = [
//     {
//       "name": "Group A",
//       "value": 400
//     },
//     {
//       "name": "Group B",
//       "value": 300
//     },
//     {
//       "name": "Group C",
//       "value": 300
//     },
//     {
//       "name": "Group D",
//       "value": 200
//     },
//     {
//       "name": "Group E",
//       "value": 278
//     },
//     {
//       "name": "Group F",
//       "value": 189
//     }
//   ];
//   const data02 = [
//     {
//       "name": "Group A",
//       "value": 2400
//     },

//   ];
      
function Piechart() {

    const [userScoreData, setUserScoreData] = useState(null)

    useEffect(()=> {
      const fecthData = async () => {
        try {
          const data = await getUserScore(12)
          console.log(data)
          setUserScoreData(data)
        } catch(err) {
          console.log('Error getting user score data', err)
        }
      }
      fecthData()
    }, [])

  
    if (!userScoreData) {
      return <p>Loading...</p> 
    }

    let scorePercentage = 0;

    if(userScoreData.data.todayScore) {
      scorePercentage = userScoreData.data.todayScore * 100;
    }
    if(userScoreData.data.score) {
      scorePercentage = userScoreData.data.score * 100;
    }
 
    const scoreInDegrees = (scorePercentage * 360) / 100;
    
    const data = [
      {
        "name": "Score",
        "value": scorePercentage
      },

    ];

  
    return(
      <div className='pie__wrapper'>
        <PieChart width={300} height={250} className='pie__chart'
        >
            <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            fill="#E60000"
            // startAngle={0}
            // endAngle={scoreInDegrees}
            startAngle={70}
						endAngle={230}
            cornerRadius={10}
						innerRadius={"60%"}
						outerRadius={"70%"}
            />
        </PieChart>
        <div className="pie__wrapper--score">
            <div className="pie__wrapper--score--percentage">{scorePercentage} %</div>
            <div className="pie__wrapper--score--text">de votre <br></br> objectif</div>
        </div>
        <h3  className="pie__wrapper--scoreTitle">Score</h3>
      </div>
    )
}

export default Piechart