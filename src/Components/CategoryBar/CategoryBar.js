import React from 'react'
import {Checkbox} from 'antd'
import {hindiTranslate} from '../icons/Icons'
import { connect } from 'react-redux';

const convertToHindi = (string)=>{
  let p = string.charAt(0).toLowerCase() + string.slice(1);
  let ans=  p.split(' ').join('');
  return ans;
}

const CategoryBar = ({english:{english},cats,onChange,checkChecked}) => {
  return (
    <div className='section-news-left--tags  news-tags'>
    <Checkbox.Group
    className='tags'
    style={{ width: '100%' }}
    onChange={onChange}
  >
    {cats.map((p) => (
      <label className="cat cur" style={checkChecked(p)}>
        {english ? p : hindiTranslate[convertToHindi(p)] }
        <Checkbox style={{ display: 'none' }} value={p}></Checkbox>
      </label>
    ))}
  </Checkbox.Group>
  </div>
  )
}

const mapStateToProps = (state) => ({
  english:state.english
});


export default connect(mapStateToProps)(CategoryBar);
