import React from 'react'

const Youtube = ({match}) => {
  return (
    <div style={{height:'100vh'}}>
<iframe src={`https://www.youtube.com/embed/${match.params.ytlink}?autoplay=1&mute=1`}
        frameborder='0'
        allow='autoplay; encrypted-media'
        style={{height:'100%',width:'100%'}}
        allowfullscreen
        title='video'
        allow='autoplay'
/>
    </div>
  )
}

export default Youtube
