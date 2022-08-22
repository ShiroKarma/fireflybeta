import React, { useEffect, useRef, useState } from "react";
import howTo1 from "./img/howTo1.png";
import howTo2 from "./img/howTo2.png";
import howTo3 from "./img/howTo3.png";
import OnFire from "./img/OnFire.jpg";
import { Carousel } from "react-bootstrap";
import { db } from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import liff from '@line/liff'
export default function Firefly() {
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useHistory()
  const [data, setData] = useState("")
  const [choice, setChoice] = useState("")
  const [postAi,setPostAi] = useState([])
  const initLine = () => {
    liff.init({ liffId:'1656564563-apJZEex4'}, () => {
      if (liff.isLoggedIn()) {
        runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }
  
  const runApp = () => {
    const idToken = liff.getIDToken();
    setIdToken(idToken);
    liff.getProfile().then(profile => {
      console.log(profile);
      setDisplayName(profile.displayName);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }

  useEffect(() => {
    initLine();
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setData(base64);
    console.log(data)
  };
  const convertBase64 = (file) => {
    let photo = file
      const width = 648;
      const height = 480;
      photo.width = width;
      photo.height = height;
    return new Promise((resolve, reject) => { 
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
const clearFiles =(e) =>{
  setData("")
}
  const handleSubmit = (e) => {
    if (data != "") {
      if (choice != "") {
        db.collection('history').doc(userId).set({
          Fire_image: data,
          Ai_Status: 1,
          type: choice,
          reporter_id :userId,
          Time: Date().toLocaleString()
        })
        .then(()=>{
          alert('สำเร็จ!!')
          {window.location.replace("https://fireflybeta.vercel.app/form")}
       })
       
      } else { alert('กรุณาเลือกประเภทการเผาที่เกิดขึ้น')}
        }
       else {
      alert("โปรดทำการอัพโหลดรูปภาพก่อน")
    }
  }
  const handleOpton = (e) => {
    setChoice(e.target.value)
  }
  return (
    <div>
      <div className="row-fluid bg-danger bg-gradient d-flex justify-content-start">
        <div
          className="col-5 text-white"
          style={{ fontSize: "10vw", marginLeft: "4%" }}
        >
          FIREFLY
        </div>
        <div
          className="col-6 text-white"
          style={{ fontSize: "3vw", marginLeft: "-7%", marginTop: "3.5%" }}
        >
          AI CAMERA SYSTEM FOR TIMELY DETECTION OF FIRE
        </div>
      </div>
      <div className="container-fluid bg-dark pt-2 bg-opacity-75">
        <Carousel>
          <Carousel.Item>
            <img src={howTo1} className="img-fluid rounded mx-auto d-block" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={howTo2} className="img-fluid rounded mx-auto d-block" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={howTo3} className="img-fluid  rounded mx-auto d-block" />
          </Carousel.Item>
        </Carousel>
        <div className="row d-flex align-items-center">
          <div
            className="col-4 mx-2 text-white"
            style={{ fontSize: "3vw", fontWeight: "200" }}
          >
            Camera Detection |
          </div>
          <div
            className="col-8 text-white"
            style={{
              fontSize: "1.8vw",
              marginLeft: "-9%",
              marginTop: "1%",
              fontFamily: "RSU",
            }}
          >
            ระบบกล้องถ่ายรูปเพื่อแจ้งเหตุเพลิงไหม้ให้กับเจ้าหน้าที่
            เพื่อรักษาความปลอดภัยของชุมชน
          </div>
        </div>
      </div>
      <div
        className="container-sm my-2 d-flex justify-content-center"
        style={{ backgroundColor: "#ECF0F1", width: "70vw" }}
      >
        <div className="row d-flex justify-content-center">
          <div
            className="col-12 py-1 text-white"
            style={{
              backgroundColor: "#EC7063",
              fontFamily: "RSU",
              fontSize: "5vw",
            }}
          >
            กล้องถ่ายรูปตรวจจับไฟ
          </div>
          <input
            type="file"
            class="input-upload"
            name="myfile"
            accept="image/jpeg"
            onChange={uploadImage}/>
          <img src={data} height="200px" />
          <div className="row mb-2">
          <div className="input-group my-2">
        <select
          className="form-select"
          id=""
          aria-label="Example select with button addon"
          value={choice}
          onChange={handleOpton}
        >
          <option value="">สาเหตุการเผาไหม้</option>
          <option value="การเผาขยะ">การเผาขยะ</option>
          <option value="การเผาใบไม้">การเผาใบไม้</option>
        </select>
      </div> 
            <div className="col-4 d-flex justify-content-start">
              <button className="btn btn-danger" style={{ padding: "10% 20%" }} onClick={handleSubmit}>
                <h7>ยืนยัน</h7>
              </button>
            </div>

            <div className="col-4 d-flex justify-content-end">
              <button
                className="btn btn-warning"
                style={{ padding: "10% 15%" }}
                onClick={clearFiles}
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}