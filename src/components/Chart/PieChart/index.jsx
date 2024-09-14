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
      return <p>Loading...</p>  // Optionnel, tu peux afficher un message de chargement
    }

    console.log(userScoreData.data.todayScore )
    let scorePourcentage = userScoreData.data.todayScore * 100
    

    const scoreInDegrees = (scorePourcentage * 360) / 100;
    
    const data = [
      {
        "name": "Score",
        "value": scorePourcentage
      },

    ];

    const CustomLegend = () => {
      return (
          <h3 className='pie__chart--text'>Test</h3>
        );
    };

  
    return(
      <div className='pie__wrapper'>
        <PieChart width={300} height={250} className='pie__chart'
        >
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%"
            fill="#82ca9d"
            startAngle={0}
            endAngle={360}
            cornerRadius={100}
						innerRadius={"60%"}
						outerRadius={"70%"}
            label />
            {/* <Legend height={250} content={<CustomLegend/>}  wrapperStyle={{ zIndex: 1 }}/> */}
        </PieChart>
        		<div className="pie__wrapper--score">
              <div className="pie__wrapper--score--percentage">12 %</div>
              <div className="pie__wrapper--score--text">de votre <br></br> objectif</div>
            </div>
            </div>
    )
}

export default Piechart