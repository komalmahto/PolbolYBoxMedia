import React from 'react'

const Youtube = ({match}) => {
  return (
    <div style={{height:'100vh'}}>
<iframe src={`https://www.youtube.com/embed/${match.params.ytlink}?autoplay=1&fullscreen=1&mute=0`}
        frameBorder='0'
        allow='autoplay; encrypted-media; fullscreen'
        style={{height:'100%',width:'100%'}}
        allowFullScreen
        title='video'
        allow='autoplay'
/>
    </div>
  )
}

export default Youtube
