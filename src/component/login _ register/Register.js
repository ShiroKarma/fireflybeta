import React from 'react';
import { db } from '../../utils/firebase';
import liff from '@line/liff';
import { useState, useEffect } from 'react';
import './ContentCSS.css'
import logo from '../../logo.svg'
import { Link, Redirect, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
function Register() {
  const navigate = useHistory();
  const [Name, setName] = useState('')
  const [House, setHouse] = useState('')
  const [Token, setToken] = useState('')
  const [phone, setphone] = useState('')
  const [hotmail, setHotmail] = useState('')
  const [passsword, setPasssword] = useState('')
  const [betapasss, setBetapasss] = useState('')
  const [Loader, setLoader] = useState(false)
  const [diplay, setDiplay] = useState('')
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const initLine = () => {
    liff.init({ liffId: '1656564563-yLq8xvOn' }, () => {
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
      setPictureUrl(profile.pictureUrl);
      setStatusMessage(profile.statusMessage);
      setUserId(profile.userId);
    }).catch(err => console.error(err));
  }
  useEffect(() => {
    initLine();
  }, []);
  const suemit = (e) => {
    if (passsword == betapasss && passsword != '') {
      console.log('hehe', userId, 'and', statusMessage)
      e.preventDefault();
      setLoader(true);
      db.collection('users').doc(userId).set({
        userId: userId,
        displayName: displayName,
        Name: Name,
        House: House,
        Notify_Token: Token,
        phoneNumber: phone,
        Email: hotmail,
        Pass: passsword,
        piority: 0,
        userName: diplay,
      })
        .then(() => {
          setLoader(false);
          alert("Register Complete");
          navigate.push('/camera')

        })
        .catch((error) => {
          alert(error.message);
          setLoader(false);
        });
      setphone("");
      setHouse("");
      setName("");
      setToken("");
      setHotmail("");
      setPasssword("");
      setBetapasss("");
      setDiplay("");
      Cookies.set("userCookies","true")
    } else {
      alert('falied to compile')
      alert('Your password did not match')
    }
  }

  return (
    <div className="shadow p-3 mb-5 bg-body" id='Login' >
      <div id='headText'>
        {/* <div className='row d-flex flex-row justify-content-center'> 
                Welcome To
            </div> */}
        <div className='row d-flex flex-row justify-content-center pb-2' style={{ fontSize: '280%', color: '#EF6F6F' }} >
          Register
        </div>
        {/* <div className='row d-flex flex-row justify-content-center'> 
                Login
            </div> */}

      </div>

      <form className='row d-flex flex-row justify-content-center' onSubmit={suemit}>
        <input value={Name} onChange={(e) => setName(e.target.value)} type="text" class="form-control m-2" placeholder="Full Name" id='inputFieldFormat' />
        <input value={diplay} onChange={(e) => setDiplay(e.target.value)} type="text" class="form-control mb-2" placeholder="Username" id='inputFieldFormat' />
        <input value={House} onChange={(e) => setHouse(e.target.value)} type="text" class="form-control mb-2" placeholder="Location" id='inputFieldFormat' />
        <input value={phone} onChange={(e) => setphone(e.target.value)} type="text" class="form-control mb-2" placeholder="Phone Number" id='inputFieldFormat' />
        <input value={hotmail} onChange={(e) => setHotmail(e.target.value)} type="text" class="form-control mb-2" placeholder="Email" id='inputFieldFormat' />
        <input value={passsword} onChange={(e) => { setPasssword(e.target.value) }} type="password" class="form-control mb-2" placeholder="Password" id='inputFieldFormat' />
        <input value={betapasss} onChange={(e) => { setBetapasss(e.target.value) }} type="password" class="form-control mb-2" placeholder="Confirm password" id='inputFieldFormat' />
      </form>

      <div className='row d-flex flex-row justify-content-center my-3'>
        <div className='d-flex flex-row justify-content-center d-grid gap-2'>
          <button type='button' className='btn text-white fw-bold' id='SignInBtn' onClick={suemit}> Sign In </button>
        </div>
      </div>

    </div>

  );
}

export default Register;