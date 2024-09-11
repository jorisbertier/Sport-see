import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/simple-bar-chart-72d7y5';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      sessions: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/user/12/activity')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erreur dans la récupération des données');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Données API reçues :', data);
      this.setState({sessions : data.data.sessions})
    })
    .catch((err) => {
      console.log('Error get data activity', err)
    })
  }

  render() {

    const { data } = this.state
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

        const tickFormatter = (tick) => {
          return (parseInt(tick, 10) + 1).toString();
        };

    console.log({sessions})
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
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
          orientation="right" tickLine={false} axisLine={false}
          />
          <Tooltip
          content={<CustomTooltip />} 
          />
          {/* <Legend /> */}
          <Bar barSize={10} radius={[10, 10, 0, 0]} dataKey="kilogram" fill="#282D30" activeBar={<Rectangle fill="#282D30" stroke="#282D30" />} />
          <Bar barSize={10} radius={[10, 10, 0, 0]} dataKey="calories" fill="#E60000" activeBar={<Rectangle fill="#E60000" stroke="#E60000" />} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
