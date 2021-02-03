import React,{useEffect,useState} from 'react'
import axios from '../../axios'
import AwardCategoriesCard from '../../Components/Cards/AwardCategoriesCard'
import {Link} from 'react-router-dom'

const AwardSubCategories = ({match}) => {
  const [subCat,setSubCat]=useState([])
  useEffect(()=>{
fetchAward();
  },[])

  const fetchAward=async()=>{
await axios.get(`award/awardList?categoryId=${match.params.catId}`)
.then((res)=>{
  console.log(res.data)
  setSubCat(res.data.payload)
})
  }
  return (
    <div className="box" style={{backgroundColor:'#f5f5f5'}}>
    <div style={{marginBottom:'2rem'}}>
    <h2></h2>
    <span style={{fontSize:'1.5rem',fontWeight:'bold'}}>Sub Categories</span></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',justifyItems:'center'}}>
    {subCat.map((c)=>(<Link to={`/categories/subcat/award/${match.params.showId}/${match.params.catId}/${c._id}`}><AwardCategoriesCard c={c} type={"sub"}/></Link>
      ))
    }
    </div>
    </div>
  )
}

export default AwardSubCategories
