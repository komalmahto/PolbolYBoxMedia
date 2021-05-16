import React,{useEffect,useState} from 'react'
import axios from '../../axios'
import QuizCategoryCard from '../../Components/Cards/QuizCategoryCard'
import {connect} from 'react-redux'
const QuizCategories = ({english:{english}}) => {
  const [categories,setCategories]=useState([])
  useEffect(() =>{
    fetchQuizCategories();
  },[])
  const fetchQuizCategories=async()=>{
await axios.get('/quiz/fetchAllCategories')
.then((res)=>{
  console.log(res.data)
  setCategories(res.data.payload)
})
  }
  return (
    <div className="box">
    <h2 style={{textAlign:'center'}}>{english?'Choose Quiz category':"क्विज़ की श्रेणी चुनें"}</h2>
    <div className="quiz-cat-con" >
    {
categories && categories.length > 0 && categories.map(category =>(
  <QuizCategoryCard category={category}/>
))
    }
    </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
 english: state.english,
});

export default connect(mapStateToProps)(QuizCategories);