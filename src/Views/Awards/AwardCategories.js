import React,{useEffect,useState} from 'react'
import axios from '../../axios'
import AwardCategoriesCard from '../../Components/Cards/AwardCategoriesCard'
import {Link} from 'react-router-dom'

const AwardCategories = ({match}) => {
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    fetchCat()

  },[])


  const hello=()=>{
    console.log("hello world");

  }
  const fetchCat=async()=>{
    await axios.get(`award/awardCategoryList?id=${match.params.id}`)
    .then((res)=>{
setCategories(res.data.payload)  
console.log(res.data.payload);
  })
  }
  return (
    <div className="box" style={{backgroundColor:'#f5f5f5'}}>
    <div style={{marginBottom:'2rem'}}><span style={{fontSize:'1.5rem',fontWeight:'bold'}}>Categories</span></div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',justifyItems:'center'}}>
    {categories.map((c)=>(<Link to={`/categories/subcat/${match.params.id}/${c._id}`}><AwardCategoriesCard c={c} type={"cat"}/></Link>
      ))
    }
    </div>
    </div>
  )
}

export default AwardCategories
