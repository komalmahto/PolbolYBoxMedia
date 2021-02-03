import React from 'react'
import {Link} from 'react-router-dom'

const QuizCategoryCard = ({category}) => {
  return (
    <Link to={`/quiz/levels/${category._id}`} className="quiz-cat">
    <img style={{width:'150px'}} src={category.icon} alt=""/>
    <span>{category.name}</span>
      
    </Link>
  )
}

export default QuizCategoryCard
