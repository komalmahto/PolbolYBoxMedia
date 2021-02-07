import React,{useEffect,useState} from 'react'
import axios from '../../axios'
import QuizLevelsCard from '../../Components/Cards/QuizLevelsCard'
import {connect} from 'react-redux'

const QuizLevels = ({match,history,english:{english}}) => {
  const [levels,setLevels]=useState([])
  useEffect(() => {
fetchLevels();
  },[])


  const fetchLevels=async()=>{
    await axios.get(`http://52.66.203.244:2113/api/v1/quiz/fetchQuiz/guest?categoryId=${match.params.catId}`)
    .then((res)=>{
      console.log(res.data)
      setLevels(res.data.payload.quizzes)
    })

  }

  const startLevel1=(level)=>{
    if(level.level===1){
      history.push(`/quiz/level/${match.params.catId}/${level._id}`)
    }

  }

  return (
    <div className="box">
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))',gridGap:'2rem'}}>
    
    {
      levels && levels.length >0&& levels.map((level)=>(
        <div onClick={()=>startLevel1(level)}>
        <QuizLevelsCard  english={english} level={level}/>
        </div>
        ))
    }
    
    </div> 
    </div>
  )
}

const mapStateToProps = (state) => ({
  english: state.english,
 });
 
 export default connect(mapStateToProps)(QuizLevels);