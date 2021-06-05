import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import QuizLevelsCard from '../../Components/Cards/QuizLevelsCard'
import { connect } from 'react-redux'
import DownloadModal from '../../Components/Modal/Modal';

const QuizLevels = ({ match, history, english: { english } }) => {
  const [levels, setLevels] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    fetchLevels();
  }, [])


  const fetchLevels = async () => {
    await axios.get(`/quiz/fetchQuiz/guest?categoryId=${match.params.catId}`)
      .then((res) => {
        console.log(res.data)
        setLevels(res.data.payload.quizzes)
      })

  }

  const startLevel1 = (level) => {
    if (level.level === 1) {
      history.push(`/quiz/level/${match.params.catId}/${level._id}`)
    }
    else {
      setIsModalVisible(true);
    }
  }

  return (
    <React.Fragment>
      <DownloadModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        text={"To enjoy the complete experience of quiz download our app."}
      />

      <div className="box">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gridGap: '2rem', marginTop: '10rem' }}>

          {
            levels && levels.length > 0 && levels.map((level) => (
              <div onClick={() => startLevel1(level)}>
                <QuizLevelsCard english={english} level={level} />
              </div>
            ))
          }

        </div>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  english: state.english,
});

export default connect(mapStateToProps)(QuizLevels);