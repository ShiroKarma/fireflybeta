import './Cam1.css';
import { useRef, useEffect,useState } from 'react';
import liff  from 'react-liff';

function Cam1() {
  const [pictureUrl, setPictureUrl] = useState();
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");

  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);



  
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
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

    const data = photo.toDataURL("image/jpeg");
    console.warn(data);
    console.log("Data:", data)


    const a = document.createElement('a');
    a.href = data;
    strip.insertBefore(a, strip.firstChild);
    a.download = 'screenshot.jpg';

    document.getElementById('btn1').innerText = 'Pleas wait...';

  };
  return (
    <div classNae="ba">

      <div className='Cam1-header'>
        <img class="image" src="kuso.jpg"></img>

      </div>
      <div className='boxo'>

      </div>
      <div className='LoginLine'>
        กล้องถ่ายรูปตรวจจับไฟ
      </div>
      <div className='Line'>
        <img class="image" src=""></img>
      </div>
      <div className='box'>
        <h><video ref={videoRef} /></h>
        <button type="botton botton1" onClick={takePhoto}>Take photo</button>
        <button type="botton botton2">submit</button>
      </div>
      <div>
      
      <div className='buai'>
      <div className='bebe'>
        การเผาที่เกิดจากไฟไหม้ หากใช่ให้กดปุ่ม
      </div> 
        <div className="glass">
          การเผาที่เกิดจากการเผาขยะ หากใช่ให้กดปุ่ม
        </div>
      </div>
      </div>
      <div className='Firefly'>
          <img class="image" src="fyyyyyyyy.jpg"></img>
        </div>
    </div>

  );
}

export default Cam1;
