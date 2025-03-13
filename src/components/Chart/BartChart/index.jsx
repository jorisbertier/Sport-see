import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getUserActivity } from '../../../services/api';

export default class Barchart extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  constructor(props) {
    super(props);
    this.state = {
      sessions: [],
    }
  }
  

  componentDidMount() {
    const { id } = this.props;
    const { mock } = this.props;
    const { dataMock } = this.props;


    if(mock) {
      
      this.setState({ sessions: dataMock });

    }else {
      getUserActivity(id)
        .then((data) => {
          console.log('Données API reçues :', data);
    
          const transformedSessions = data.data.sessions.map(session => ({
            ...session,
            day: parseInt(session.day.split('-')[2], 10),
          }));
    
          this.setState({ sessions: transformedSessions });
        })
        .catch((err) => {
          console.log('Error getting activity data', err);
        });
    }
    }

    
    
    
    render() {
      
      const { sessions } = this.state

        const CustomTooltip = ({ active, payload }) => {
          if (active && payload && payload.length) {
            return (
              <div className="custom-tooltip" style={{background : 'red', width: '60px', height: '100px', display: 'flex',gap: '20px',
                justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginLeft: '30px', marginBottom: '130px'
              }}>
                {/* <p className="label">{`${label} : ${payload[0].value}`}</p> */}
                <p className="label" style={{fontSize: '10px', color: 'white', fontWeight: '500'}}>{`${payload[0].value}kg`}</p>
                <p className="desc" style={{fontSize: '10px', color: 'white', fontWeight: '500'}}>{payload[1].value}kcal</p>
              </div>
            );
          }
        
          return null;
        };

        // const maxWeight = Math.max(...sessions.map(session => session.kilogram));
        // const minWeight = Math.min(...sessions.map(session => session.kilogram));
        // const yAxisDomain = [minWeight - 2, maxWeight + 2];


        const CustomTick = (props) => {
          const { x, y, payload } = props;
          return (
            <text
              x={x}
              y={y}
              dy={10}
              textAnchor="end"
              fontSize={14}
              fontWeight={500}
              fontFamily="Roboto, sans-serif"
              fill="#9B9EAC"
            >
              {payload.value}
            </text>
          );
        };

    return (
      <div className='activity'>
        <div className='activity-wrapper'>
          <div>
            <h2>Activité quotidienne</h2>
          </div>
          <div className='activity-wrapper--macro'>
            <div className='activity-wrapper--macro--bloc'>
              <div className='dot-black'></div>
              <h3>Poids (kg)</h3>
            </div>
            <div className='activity-wrapper--macro--bloc'>
              <div className='dot-red'></div>
              <h3>Calories brulées (kCal)</h3>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height="100%" minHeight="200px" minWidth="200px" className="responsive-container">
          <BarChart
            data={sessions}
            barSize={7} barGap={8}
            margin={{
              top: 25,
              right: 25,
              left: 25,
              bottom: 25,
            }}
            >
            <CartesianGrid
              strokeDasharray="2 2"
              horizontal={true}
              vertical={false}
            />
            <XAxis 
              dataKey="day"
              tickLine={false} 
              tick={CustomTick} 
            />
            <YAxis
              orientation="right"
              tick={CustomTick}
              tickLine={false}
              axisLine={false}
              // domain={yAxisDomain}
              // domain={[minWeight - 2, maxWeight]}
              // domain={['dataMin-2', 'dataMax+1']}
              // domain={['dataMin-2', 'dataMax+1']}
              allowDataOverflow={true}
              tickCount={4}
              tickMargin={50}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(196, 196, 196, 0.5)' }}
            />
            {/* <Legend /> */}
            <Bar barSize={10} radius={[10, 10, 0, 0]} dataKey="kilogram" fill="#282D30" activeBar={<Rectangle fill="#282D30" stroke="#282D30" />} />
            <Bar barSize={10} radius={[10, 10, 0, 0]} dataKey="calories" fill="#E60000" activeBar={<Rectangle fill="#E60000" stroke="#E60000" />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
