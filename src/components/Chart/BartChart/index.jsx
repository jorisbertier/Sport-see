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
    getUserActivity(12) // Pass userId
      .then((data) => {
        console.log('Données API reçues :', data);
        this.setState({ sessions: data.data.sessions });
      })
      .catch((err) => {
        console.log('Error getting activity data', err);
      });
  }

  

  render() {

    const { sessions } = this.state

        const CustomTooltip = ({ active, payload, label }) => {
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

        const maxWeight = Math.max(...sessions.map(session => session.kilogram));
        const minWeight = Math.min(...sessions.map(session => session.kilogram));
        console.log(minWeight)
        const yAxisDomain = [minWeight - 2, maxWeight + 2];

        const tickFormatter = (tick) => {
          return (parseInt(tick, 10) + 1).toString();
        };

    // console.log({sessions})
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sessions}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          >
          <CartesianGrid
            strokeDasharray="2 2"
            horizontal={true}
            vertical={false}
          />
          <XAxis tickFormatter={tickFormatter}/>
          <YAxis
          orientation="right"
          tick={{ fill: '#9B9EAC' }}
          tickLine={false}
          axisLine={false}
          // domain={yAxisDomain}
          tickCount={3}
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
    );
  }
}
