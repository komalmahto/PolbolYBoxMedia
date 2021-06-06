import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import AwardCategoriesCard from '../../Components/Cards/AwardCategoriesCard'
import { Link } from 'react-router-dom'

const AwardSubCat = ({ match }) => {
  const [subCat, setSubCat] = useState([])
  useEffect(() => {
    fetchAward();
    window.scrollTo(0, 0);

  }, [])

  const fetchAward = async () => {
    await axios.get(`award/awardList?showId=${match.params.showId}`)
      .then((res) => {
        console.log(res.data)
        setSubCat(res.data.payload)
      })
  }
  return (
    <React.Fragment>
      <div className="box" style={{ backgroundColor: '#f5f5f5' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2></h2>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Sub Categories</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', justifyItems: 'center' }}>
          {subCat.map((c) => (<Link to={`/categories/subcat/award/${match.params.showId}/${c._id}`}><AwardCategoriesCard c={c} type={"sub"} /></Link>
          ))
          }
        </div>
      </div>
    </React.Fragment>
  )
}

export default AwardSubCat
