import './HomePage.css';
import { FaLine } from "react-icons/fa";
import { AiFillLock, AiFillExclamationCircle, AiFillHome } from "react-icons/ai";
import Header from './Header';
import { Link } from 'react-router-dom';


function HomePage() {
  return (<div class="container">
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    
    <div class="row" className='taw'>
      <div class="col">
        <h1>FIRE FLY</h1>
        <p>Application organizing and reduce air pollution for community</p>
        <Link to='/camera'>
        <button type="botton">Explore</button>
        </Link>
      </div>
      <div class="col">
        <div class="card card1">
          <h5>Line notify</h5>
          <p>Ai for detection fire  detects flames at the source.
            ตรวจจับไฟไหม้เพื่อแจ้งอัคคีภัย/การเผาขยะ
          </p>
        </div>
        <div class="card card2">
          <h5>AQI</h5>
          <p>The Air Quality Index is used for reporting daily air quality.
            ทำนายสภาพอากาศ
          </p>
        </div>
        <div class="card card3">
          <h5>About FIRE FLY</h5>
          <p>For show what FIREFLY app are.
            อธิบายแอพพลิเคชั่น
          </p>
        </div>
        <div class="card card4">
          <h5>For Admin</h5>
          <p>only available for staff.
            สำหรับเจ้าหน้าที่
          </p>
        </div>
       

      </div>
    </div>
  </div>


  );
}

export default HomePage;