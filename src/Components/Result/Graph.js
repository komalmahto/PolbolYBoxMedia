import React,{useEffect,useState} from 'react'
import { Chart } from "react-google-charts";
import axios from '../../axios'


const Graph = ({match}) => {
  const [data,setData]=useState([])


  useEffect(() => {
    fetchResult();

  },[])
  const fetchResult=async()=>{
    await axios.get(`award/results/guest?id=${match.params.id}`)
    .then((res)=>{
setData(res.data.payload)   
console.log(res.data.payload);
 })
  }



const dat=[['Votes', 'Audience vote', 'Jury votes','Overall']]

const setDat=()=>{
Object.keys(data).length>0 && data.award.nominations.length>0 && data.award.nominations.map((n)=>(
    dat.push([n.name,data.nominees[n.name].audience,data.nominees[n.name].jury,data.nominees[n.name].overall.percentage])
  ))
  console.log(dat)
}
setDat();
console.log(dat)

 
  
  return (
    <div
    style={{
      width: '400px',
      height: '300px'
    }}
  >
  <Chart
width={'350px'}
height={'300px'}
chartType="BarChart"
loader={<div>Loading Chart</div>}
data={dat}
options={{
  title: `${""}`,
  chartArea: { width: '50%' },
  hAxis: {
    title: 'Votes percentage',
    minValue: 0,
    maxValue:100
  },
  vAxis: {
    title: 'Nominees',
  },
}}
// For tests
rootProps={{ 'data-testid': '1' }}
/>
  </div>
  )
}

export default Graph
