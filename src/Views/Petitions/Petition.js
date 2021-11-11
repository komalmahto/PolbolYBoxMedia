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
    <div className={styles.main} style={{ width: "45%", margin: "0 auto" }}>
      {/* <div className={styles.header}>
        <p className={styles.pHeading}>PETITION</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div> */}
      <div>
        <div className={styles.steps}>
          {/* <div className={`${styles.circle} ${styles.active}`}>
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
          </div> */}
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
                style={{
                  borderRadius: "50%",
                }}
                className={
                  category.includes(value.name)
                    ? `${styles.tile} ${styles.tileactive}`
                    : `${styles.tile}`
                }
                id={value.name}
                onClick={handleSelect}
              >
                <svg
                  onClick={handleSelect}
                  src={value.image}
                  className={styles.lol}
                  id={value.name}
                  width="50px"
                  height="50px"
                  viewBox="0 0 73 75"
                  style={{ color: "red" }}
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      transform="translate(11.000000, 1.000000)"
                      fill="currentColor"
                      fill-rule="nonzero"
                    >
                      <path d="M50.7998981,25.1013877 C50.7998981,11.2603304 39.4265732,0 25.4467261,0 C11.4649299,0 0.0899808917,11.2603304 0.0899808917,25.1013877 C0.0899808917,38.1275463 10.1675159,48.864978 23.0104204,50.0828238 L23.0104204,56.7229295 L13.9850446,56.7229295 C12.6395541,56.7229295 11.5487389,57.802815 11.5487389,59.1348238 C11.5487389,60.4668326 12.6395541,61.5467181 13.9850446,61.5467181 L23.0100955,61.5467181 L23.0100955,70.4790881 C23.0100955,71.8110969 24.1009108,72.8909824 25.4464013,72.8909824 C26.7918917,72.8909824 27.882707,71.8110969 27.882707,70.4790881 L27.882707,61.5467181 L36.9045096,61.5467181 C38.25,61.5467181 39.3408153,60.4668326 39.3408153,59.1348238 C39.3408153,57.802815 38.25,56.7229295 36.9045096,56.7229295 L27.882707,56.7229295 L27.882707,50.0828238 C40.7236624,48.8646564 50.7998981,38.1275463 50.7998981,25.1013877 Z M4.96259236,25.1013877 C4.96259236,13.9201674 14.1516879,4.82378855 25.4467261,4.82378855 C36.7398153,4.82378855 45.9276115,13.9201674 45.9276115,25.1013877 C45.9276115,36.2816432 36.7398153,45.3773789 25.4467261,45.3773789 C14.1516879,45.3773789 4.96259236,36.2813216 4.96259236,25.1013877 Z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p
                onClick={handleSelect}
                id={value.name}
                style={{ fontWeight: "bold" }}
              >
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
