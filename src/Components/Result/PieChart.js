import React,{useState} from 'react'
import ReactApexChart from 'react-apexcharts';

const PieChart = (dataPie) => {
  const [data,setData]=useState({
          
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  })
  return (
    <div id="chart">
    <ReactApexChart options={Object.keys(dataPie).length>0&&dataPie.options} series={Object.keys(dataPie).length>0&&dataPie.series} type="pie" width={380} />
  </div>
      
  )
}

export default PieChart
