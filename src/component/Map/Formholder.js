
import React, { Component ,useEffect,useState} from 'react';
import liff  from '@line/liff';
import LocationMap from './LocationMap';
import Map from './Map'
export default function Format() {
  const [pictureUrl, setPictureUrl] = useState();
  const [idToken, setIdToken] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const initLine = () => {
    liff.init({ liffId: '1656564563-E0jbaVJG' }, () => {
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
  var a = "sdfghjk"
  console.log("===========>",a)

  useEffect(() => {
    initLine();
  }, []);
    return (
        <Map userId={userId}/>
    );
    
}