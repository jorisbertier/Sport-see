import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { getUserScore } from '../../../services/api';

function Piechart({id, mock, dataMock}) {
  
    const [userScoreData, setUserScoreData] = useState(null)
    const [scorePercentage, setScorePercentage] = useState()

    useEffect(()=> {
      if(mock) {
        setUserScoreData(dataMock)
        setScorePercentage(dataMock)
      } else {
        const fecthData = async () => {
          try {
            const data = await getUserScore(id)
            setScorePercentage(data.data.score)
            setUserScoreData(data)
          } catch(err) {
            console.log('Error getting user score data', err)
          }
        }
        fecthData()
      }
    }, [mock, id])

    if (!userScoreData) {
      return <p>Loading...</p> 
    }
    
    // console.log('usersocredattatata', userScoreData.data.score)
    // if(userScoreData.data.todayScore) {
    //   scorePercentage = userScoreData.data.todayScore * 100;
    // }
    // if(userScoreData.data.score) {
    //   scorePercentage = userScoreData.data.score * 100;
    // }
    // if(dataMock) {
    //   scorePercentage = dataMock * 100;
    // }

    
    const data = [
      {
        "name": "Score",
        "value": scorePercentage
      },

    ];

  
    return(
      <div className='pie__wrapper responsive--chart--pie'>
        <ResponsiveContainer width={320} height="100%" minHeight="200px" minWidth="200px">
          <PieChart className='pie__chart'
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
              <div className="pie__wrapper--score--percentage">{scorePercentage * 100} %</div>
              <div className="pie__wrapper--score--text">de votre <br></br> objectif</div>
          </div>
          <h3  className="pie__wrapper--scoreTitle">Score</h3>

        </ResponsiveContainer>
      </div>
    )
}

export default Piechart