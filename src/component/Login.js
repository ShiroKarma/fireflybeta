import { Route, Switch, Link , useHistory, Redirect } from "react-router-dom";
import { db } from "../utils/firebase";
import liff from '@line/liff';
import { useState, useEffect } from "react";
import { AiFillRead } from "react-icons/ai";
import logo from '../logo.svg'
import "./Card.css";
import { Button } from "@material-ui/core";
import Cookies from "js-cookie";
function LogIn() {
  const navigate = useHistory()
  const [pictureUrl, setPictureUrl] = useState(logo);
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [Loader, setLoader] = useState(true)
  const [userData,setUserData] = useState([])
  const [Auth,setAuth] = useState([])
  useEffect(() => {
    GetuserData();
  }, []); // blank to run only on first launch
  const GetuserData =() => {
    db.collection("users").onSnapshot(function (querySnapshot) {
      setUserData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          userIdPost : doc.data().userId
        }))
      );
    });
  }
  const initLine = () => {
    liff.init({ liffId:'1656564563-kqRWyPoX'}, () => {
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
 const readCookies = () => {
  const StatusCookies = Cookies.get("userCookies")
  if (StatusCookies != ""){
    setAuth(true)
  }
 }
 useEffect(()=>{
  readCookies();
 }, [])
 const HandleOnClick =()=>{
console.log(Auth)
if (Auth == true) {
navigate.push('/camera')
} {
navigate.push('/register')
}
}
  return (
    
    <div className="App">
      <header className="App-header">
        <div style={{ textAlign: "center" }}>
          <h3 style={{ color: "gold" }}>Welcome to Firefly ,<l1>{displayName}</l1></h3>
          <hr />
    <div className="bg">
      <div className="Card">
        <div className="upper-container">
          <div className="image-container">
          <img src={pictureUrl}   
          alt=""
              height="100px"
              width="100px" />
              </div>
        </div>
        <div className="lower-container">
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>display name: </b> {displayName}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>status message: </b> {statusMessage}</p>
          <p style={{ textAlign: "left", marginLeft: "20%", marginRight: "20%", wordBreak: "break-all" }}><b>user id: </b> {userId}</p>
          <Button onClick={HandleOnClick}>ไปต่อ</Button>
          </div>
      </div>
    </div>
        </div>
      </header>
    </div>
  );
}

export default LogIn
