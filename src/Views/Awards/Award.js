import React ,{useEffect,useState}from 'react'
import { Tabs } from 'antd';
import axios from '../../axios'
import NomineeCard from '../../Components/Cards/NomineeCard'
import JuryCard from '../../Components/Cards/JuryCard'
import AwardResult from '../../Components/Result/AwardResult'



const Award = ({match}) => {
  const { TabPane } = Tabs;


  const [subCat,setSubCat]=useState([])
  useEffect(()=>{
fetchAward();
window.scrollTo(0, 0);
  },[])

  const fetchAward=async()=>{
await axios.get(`award/awardList?categoryId=${match.params.catId}`)
.then((res)=>{
  console.log(res.data)
  setSubCat(res.data.payload)
})
  }

function callback(key) {
  console.log(key);
}
const award=()=>{
  const arr=subCat.filter((c)=>{return c._id === match.params.awardId})
  return arr
}
  return (
    <div className="box">
    <h3>{award()&& award().length>0 && award()[0].heading}</h3>
    <Tabs onChange={callback} type="card">
    <TabPane tab="Nominees" key="1">
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',justifyItems:'center',gridGap:'1.5rem'}}>
      {award()&& award().length>0 &&award()[0].nominations.map((p)=>(
        <NomineeCard p={p}/>
      ))}
      </div>
    </TabPane>
    <TabPane tab="Jury" key="2">
    <div tyle={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',justifyItems:'center',gridGap:'1.5rem'}}>
    {award()&& award().length>0 &&award()[0].jurys.map((p)=>(
      <JuryCard p={p}/>
    ))}
    </div>
    </TabPane>
   
    <TabPane tab="Results" key="3">
    <AwardResult id={award()&& award().length>0 &&award()[0]._id}/>
  </TabPane>
  </Tabs>
    </div>
  )
}

export default Award
