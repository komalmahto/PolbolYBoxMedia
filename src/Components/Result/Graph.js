import React,{useEffect,useState} from 'react'
// import { Chart } from "react-google-charts";
import axios from '../../axios'
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts'
import { Select } from 'antd';
import { Checkbox } from 'antd';
import { Modal, Button } from 'antd';

const { Option } = Select;
const Graph = ({match,id,isModalVisible,setIsModalVisible}) => {
  const [ageFilter,setAgeFilter]=useState('Age')
  const [regionFilter,setRegionFilter]=useState('Region')
  const [genderFilter,setGenderFilter]=useState('Gender')
  const [overall,setOverall]=useState(true)
  const [data,setData]=useState([])
  const [series,setSeries]=useState([])

  const [data1,setData1]=useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 430
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        title:{text:"Percentage votes"},
        categories: [],
      },
      yaxis: {
        min: 0,
        max: 100,
        title: {
          text: 'Ratings',
        },
      }
    },
  }
  )

  useEffect(() => {
    if(id)
{    fetchResult();}
  },[id])
 
 const dat=[['Votes', 'Audience vote', 'Jury votes','Overall']]
const dat1=[]
const dat2=[]
const dat3=[]
const dat4=[]
let seriesData=[]

const setDat=()=>{
// Object.keys(data).length>0 && data.award.nominations.length>0 && data.award.nominations.map((n)=>{
//     // dat.push([n.name,data.nominees[n.name].audience,data.nominees[n.name].jury,data.nominees[n.name].overall.percentage])
//     dat1.push(n.name)
//     dat2.push(data.nominees[n.name].audience)
//     dat3.push(data.nominees[n.name].jury)
//     dat4.push(data.nominees[n.name].overall.percentage)
    
// })

if(overall){
Object.keys(data).length>0 && data.global.chartData.length>0 && data.global.chartData.map((d)=>{
  dat1.push(d.rating)
  dat2.push(d.perc)
})
}
if(ageFilter!=="Age"){
  Object.keys(data).length>0 && data.age[ageFilter].chartData&& data.age[ageFilter].chartData.map((d)=>{
    dat1.push(d.rating)
    dat2.push(d.perc)
  })
}
if(regionFilter!=="Region"){
  Object.keys(data).length>0 && data.region[regionFilter].chartData&& data.region[regionFilter].chartData.map((d)=>{
    dat1.push(d.rating)
    dat2.push(d.perc)
  })
}
if(genderFilter!=="Gender"){
  Object.keys(data).length>0 && data.gender[genderFilter].chartData&& data.gender[genderFilter].chartData.map((d)=>{
    dat1.push(d.rating)
    dat2.push(d.perc)
  })
}
seriesData=[
  {
    name: 'Audience Votes',
    data:[...dat2]
  },
]
setData1({...data1,series:seriesData})

setData1(prevState => ({
  ...prevState,           // copy all other field/objects
  options: {              // recreate the object that contains the field to update
    ...prevState.options, // copy all the fields of the object
    xaxis: {...prevState.xaxis,categories:[...dat1]}    // overwrite the value of the field to update
  }
}));
 return seriesData
}

  const fetchResult=async()=>{
    // await axios.get(`award/results/guest?id=${match.params.id}`)
    await axios.get(`poll/results/guest?id=${id}`)
    .then((res)=>{
setData(res.data.payload)   
console.log(res.data.payload);
 })
  }
  
  useEffect(
    () => {
      let timer1 = setTimeout(() => setDat(), 1000)
      return () => {
        clearTimeout(timer1)
      }
    },
    [data1] )


  const age=()=>{
    const ageArr=[]
    for (const property in data.age) {
ageArr.push(<Option value={property}>{property}</Option>)
    }
    return ageArr
  }
  function handleChangeAge(value) {
    console.log(`selected ${value}`);
    setOverall(false)
    setAgeFilter(value)
    setRegionFilter("Region")
    setGenderFilter("Gender")
  }
  function handleChangeRegion(value) {
    console.log(`selected ${value}`);
    setOverall(false)

    setRegionFilter(value)
    setAgeFilter("Age")
    setGenderFilter("Gender")
  }
  function handleChangeGender(value) {
    console.log(`selected ${value}`);
    setOverall(false)

    setGenderFilter(value)
    setRegionFilter("Region")
    setAgeFilter("Age")
    
  }
  const region=()=>{
    const ageArr=[]
    for (const property in data.region) {
ageArr.push(<Option value={property}>{property}</Option>)
    }
    return ageArr
  }
  const gender=()=>{
    const ageArr=[]
    for (const property in data.gender) {
ageArr.push(<Option value={property}>{property}</Option>)
    }
    return ageArr
  }
  function onChangeOverall(e) {
    console.log(`checked = ${e.target.checked}`);
    setOverall(e.target.checked)
    setGenderFilter("Gender")
    setRegionFilter("Region")
    setAgeFilter("Age")
  }
 
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const overAllRating=()=>{
    if(Object.keys(data).length>0){
    if(overall){
      return `Average :${data.global.averageRating}/10`
    }
    if(ageFilter!=='Age'){
      return `Average : ${data.age[ageFilter].averageRating}/10`
    }
    if(regionFilter!=='Region'){
      return `Average :${data.region[regionFilter].averageRating}/10`
    }
    if(genderFilter!=='Gender'){
      return `Average :${data.gender[genderFilter].averageRating}/10`
    }
  }
  }
  const totalVotes=()=>{
    if(Object.keys(data).length>0){
    if(overall){
      return `Total Votes : ${data.global.totalVotes}`
    }
    if(ageFilter!=='Age'){
      return `Total Votes : ${data.age[ageFilter].totalVotes}`
    }
    if(regionFilter!=='Region'){
      return `Total Votes : ${data.region[regionFilter].totalVotes}`
    }
    if(genderFilter!=='Gender'){
      return `Total Votes :${data.gender[genderFilter].totalVotes}`
    }
  }
  }
  return (
    <Modal  id="res" title="Poll result" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

    <div
    style={{
      width: '100%',
      height: '100%'
    }}
  >
  <div>
  <p>{Object.keys(data).length>0 && data.poll.question}</p>
  <p><span style={{fontWeight:'bold',marginRight:'2rem'}}>{overAllRating()}</span> <span style={{fontWeight:'bold'}}>{totalVotes()}</span></p>
 
  </div>
  
  <div>

  <Checkbox checked={overall}  onChange={onChangeOverall}>Overall</Checkbox>
  
  <Select value={ageFilter} defaultValue="Age" style={{ width: 120 }} onChange={handleChangeAge}>
  {age()}
</Select>
<Select value={regionFilter} defaultValue="region" style={{ width: 120 }} onChange={handleChangeRegion}>
  {region()}
</Select>
<Select value={genderFilter} defaultValue="gender" style={{ width: 120 }} onChange={handleChangeGender}>
  {gender()}
</Select>

  </div>

  <ReactApexChart options={data1.options} series={data1.series} type="bar" height={400} />

  {/*<Chart
width={'100%'}
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
/>*/}
  </div>
  </Modal>
  )
}

export default Graph
