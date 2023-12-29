// components/VideoPlayer.js

import React from 'react';
import Iframe from 'react-iframe'
function VideoPlayer({ videoURL, videoRef }) {
    if (videoURL === '') {
        return null;
    }

    return (
        <Iframe 
                ref={videoRef} 
                className='responsive-iframe' 
                url={videoURL + '?enablejsapi=1'} 
                title="YouTube video player" 
                display='block'
                frameBorder='0'
                width='100%'
                height='400px'
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;fullscreen" 
                
                >
        </Iframe>
    );
}

export default VideoPlayer;