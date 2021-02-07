import React from 'react'
import {Checkbox} from 'antd'

const CategoryBar = ({cats,onChange,checkChecked}) => {
  return (
    <div className='section-news-left--tags  news-tags'>
    <Checkbox.Group
    className='tags'
    style={{ width: '100%' }}
    onChange={onChange}
  >
    {cats.map((p) => (
      <label className="cat cur" style={checkChecked(p)}>
        {p}
        <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
      </label>
    ))}
  </Checkbox.Group>
  </div>
  )
}

export default CategoryBar
