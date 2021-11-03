import { useState } from "react"
import { regions } from "../../../data"
import styles from "./Filter.module.css"
import PropTypes from "prop-types"

const Filter = ({ updateFilterOptions }) => {
  const [displayFilter, setDisplayFilter] = useState(false)

  return (
    <div className={styles.filter}>
      <p onClick={() => setDisplayFilter(!displayFilter)}>
        Filter Results <i className="fas fa-caret-down"></i>
      </p>
      <div
        className={`${
          !displayFilter
            ? styles.filter_body
            : `${styles.filter_body} ${styles.display}`
        }`}
      >
        <div className={styles.filter_option}>
          <p className={styles.filter_head}>No Filter</p>
          <div className={styles.filter_value}>
            <p onClick={() => updateFilterOptions("Overall")}>Overall</p>
          </div>
        </div>
        <div className={styles.filter_option}>
          <p className={styles.filter_head}>Gender</p>
          <div className={styles.filter_value}>
            <p onClick={() => updateFilterOptions("Male")}>Male</p>
            <p onClick={() => updateFilterOptions("Female")}>Female</p>
            <p onClick={() => updateFilterOptions("Other")}>Other</p>
          </div>
        </div>
        <div className={styles.filter_option}>
          <p className={styles.filter_head}>Age</p>
          <div className={styles.filter_value}>
            <p onClick={() => updateFilterOptions("12-17")}>12-17</p>
            <p onClick={() => updateFilterOptions("18-24")}>18-24</p>
            <p onClick={() => updateFilterOptions("25-35")}>25-34</p>
            <p onClick={() => updateFilterOptions("35-44")}>35-44</p>
            <p onClick={() => updateFilterOptions("45-59")}>45-59</p>
            <p onClick={() => updateFilterOptions("60 and above")}>
              60 and above
            </p>
          </div>
        </div>
        <div className={styles.filter_option}>
          <p className={styles.filter_head}>Region</p>
          <div className={styles.filter_value}>
            {regions.map((region, index) => (
              <p key={index} onClick={() => updateFilterOptions(region)}>
                {region}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

Filter.propTypes = {
  updateFilterOptions: PropTypes.func.isRequired,
}

export default Filter
