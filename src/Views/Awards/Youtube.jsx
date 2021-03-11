import React from 'react'

const Youtube = ({match}) => {
  return (
    <div style={{padding:'3rem',height:'90vh'}}>
<iframe src={`https://www.youtube.com/embed/${match.params.ytlink}`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        style={{height:'100%',width:'100%'}}
        allowfullscreen
        title='video'
/>
    </div>
  )
}

export default Youtube
