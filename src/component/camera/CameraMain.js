import { Button } from "@material-ui/core";
// import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../utils/firebase";

function Camera() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const [IdTimeStamp,setIdTimeStamp] = useState('')
  const [data,setData] = useState("")
  


  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 500 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };
  
  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;
    let video = videoRef.current;
        
    const width = 648;
    const height = 480;
    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    console.warn(strip);

    setData = photo.toDataURL("image/jpeg");
    console.warn(data);
    console.log("Data:", data)

    const a = document.createElement('a'); 
    a.href = data;
    strip.insertBefore(a, strip.firstChild);
    a.download = 'screenshot.jpg';
    
    document.getElementById('btn1').innerText = 'Pleas wait...';
    setIdTimeStamp(Date().getTime())
    db.collection("CameraData")
      .add({
        picturebase64: data,
      })
  };
  const HandleSubmit =(e) =>{
    db.collection('Camera Data').add({
      picturebase64: data
    })
  }
  
  return (
    <div class = "Main">
      <h><video ref={videoRef} /></h>
      <c><button onClick={takePhoto} id="btn1">Take a photo</button></c>
      <canvas ref={photoRef} />
      <div>
        <div ref={stripRef} />
      </div>
      <Link to='/home'><Button onClick={HandleSubmit}>Submit</Button></Link>
      </div>
  );
};
export default Camera;