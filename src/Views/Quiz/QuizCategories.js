import React,{useEffect,useState} from 'react'
import axios from 'axios'
import QuizCategoryCard from '../../Components/Cards/QuizCategoryCard'
const QuizCategories = () => {
  const [categories,setCategories]=useState([])
  useEffect(() =>{
    fetchQuizCategories();
  },[])
  const fetchQuizCategories=async()=>{
await axios.get('http://52.66.203.244:2113/api/v1/quiz/fetchAllCategories')
.then((res)=>{
  console.log(res.data)
  setCategories(res.data.payload)
})
  }
  return (
    <div className="box">
    <h2 style={{textAlign:'center'}}>Choose quiz category</h2>
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(155px,1fr))',gridGap:'2rem'}}>
    {
categories && categories.length > 0 && categories.map(category =>(
  <QuizCategoryCard category={category}/>
))
    }
    </div>
    </div>
  )
}

export default QuizCategories
