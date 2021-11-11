import React, { useState, useEffect } from "react"
import styles from "./Petition.module.css"
import { useHistory } from "react-router-dom"
import { GiHorizontalFlip } from "react-icons/gi"
import { connect } from "react-redux"
import { updatestateCategory } from "../../redux/Actions"
import { petitionCategories as categories } from "../../data/index"

function Petition(props) {
  const history = useHistory()
  const [category, setCategory] = useState([])

  useEffect(() => {
    console.log(props)
    if (props.categorystate.length !== 0) {
      setCategory(props.categorystate)
    }
    console.log(categories)
  }, [])

  const handleSelect = (e) => {
    if (category.includes(e.target.id)) {
      setCategory(category.filter((item) => item !== e.target.id))
    } else {
      setCategory((oldArray) => [...oldArray, e.target.id])
    }
  }
  const handleClick = () => {
    props.updatestateCategory(category)
    history.push("/petition1")
  }
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0)
    })
    return () => {
      unlisten()
    }
  }, [history])

  // useEffect(()=>{
  //   setCategory(props.categorystate)
  // },[])
  return (
    <div>
      <div className={styles.header}>
        <p className={styles.pHeading}>PETITION</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.steps}>
        <div className={`${styles.circle} ${styles.active}`}>
          <p className={styles.text}>1</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>2</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>3</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>4</p>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.ques}>
          What kind of issue are you petitioning on?
        </p>
        <p className={styles.qtext}>
          Selecting a topic allows Change.org to recommend your petition to
          interested supporters.
        </p>
      </div>

      <div className={styles.cards}>
        {categories.map((value, key) => (
          <div
            key={key}
            id={value.name}
            className={
              category.includes(value.name)
                ? `${styles.card} ${styles.active}`
                : `${styles.card}`
            }
          >
            <div
              className={
                category.includes(value.name)
                  ? `${styles.tile} ${styles.tileactive}`
                  : `${styles.tile}`
              }
              id={value.name}
              onClick={handleSelect}
            >
              <img
                onClick={handleSelect}
                src={value.image}
                className={styles.lol}
                alt="s"
                id={value.name}
              />
            </div>
            <p onClick={handleSelect} id={value.name}>
              {value.name}
            </p>
          </div>
        ))}
      </div>
      {/* <div className={styles.box}>See More</div> */}
      <center>
        <button className={styles.btn} onClick={handleClick}>
          Continue
        </button>
      </center>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categorystate: state.pet.category,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updatestateCategory: (category) => dispatch(updatestateCategory(category)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Petition)
