
import React,{Component} from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cam1 from './camera';

   const photo = [
       {
           name: 'Photo 1',
           url:"http://image.free.in.th/v/2013/ia/220126034957.jpg"
        },
       {
           name: 'Photo 2',
           url:"http://image.free.in.th/v/2013/ie/220126024422.jpg"
        },
       {
           name: 'Photo 3',
           url:"http://image.free.in.th/v/2013/iu/220126123505.jpg"
        },
       {
           name: 'Photo 4',
           url:"http://image.free.in.th/v/2013/ij/220126024549.jpg"
        }
    ]

class Camera extends Component{
    render(){
        const settings = {
            dots: true,
            fade: true,
            infinte: true,
            speed: -500,
            slidesToShow: 1,
            arrrows: true,
            slidesToScroll: 1,
            className: "slides"
        }
    return (
      <div clasName="backdrop">
        <Cam1/>
        <div className="App">
            <Slider {...settings}>
        {photo.map((photo) =>{
            return(
                <div>
                    <img width="800px" height="400px" src={photo.url}/>
                </div>
            )
        })}
            </Slider>
            
        </div>
        
      </div>
        
    ); 
    }
}

export default Camera;