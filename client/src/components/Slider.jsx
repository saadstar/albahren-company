import React from 'react'
import "./slider.scss";

export const Slider = () => {
  return (
      <div className='Slider'>
     <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="false">
        <div class="carousel-inner">
          <div className= "carousel-item active">
      <video src={'./videos/vid4.mp4'} autoPlay={true} muted={true} class="d-block w-100 vid" alt={'fgh'} />          
    </div>
  </div>
</div> 
    </div>
  )
}
