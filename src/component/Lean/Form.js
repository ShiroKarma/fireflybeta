// import React, { useState } from "react";
// import { db } from "../utils/firebase";
// import storage from '../utils/firebase';
// import firebase from "firebase";
// import LocationSearchModal from "./LandingPage";
// import { Link } from "react-router-dom";
// const Form = () =>{
//   const [inAdress, setinAdress] = useState("");
//   const [fireInform, setFireInform] = useState("");
//   const [complete, setcomplete] = useState(false)
//   const [loader, setLoader] = useState(false);
//   const [image, setImage] = useState('');
//   const [eName, seteName] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoader(true);

//     db.collection("history")
//       .add({
//         Location: 1,
//         Adress: inAdress,
//         detail: fireInform,
//         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
//         Staus: 1
//       })

//       .then(() => {
//         setLoader(false);
//         alert("Report has fly to center");
//       })
//       .catch((error) => {
//         alert(error.message);
//         setLoader(false);
//       });

//     setFireInform("");
//     setinAdress("");
//   };
//   const pull_data = (data) => {
//     console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
//   }
//   return (
    
//     <div>
//       <div classname="contact-wrap" >
//         <div classname="contact-in">

//           <div class=""></div>
//         </div>
//         <div class="contact-in">

//           <h1>Form</h1>
//           <form onSubmit>
//             <input type="text" value={eName} onChange={(e) => seteName(e.target.value)} placeholder="Full Name" class="contact-in-input" ex>
//             </input>
//             <input type="text" value={inAdress} onChange={(e) => setinAdress(e.target.value)} placeholder="Location" class="contact-in-input">
//             </input>
//             <textarea value={fireInform} id="test3" onChange={(e) => setFireInform(e.target.value)} placeholder="More detail" class="contact-in-textarea"></textarea>
             
//             <Link to='/camera'>
//               <button type="button" class="contact-in-btn" onClick={handleSubmit.apply}>Submit</button>
//             </Link>

//           </form>

//         </div>
//         <div class="contact-in">
//           <div class="container">

//             <nav>
//               <ul>
//                 <li><a href="">Home</a></li>
//                 <li><a href="">Register</a></li>
//                 <li><a href="">about</a></li>

//               </ul>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Form;

////Extra 
// //{(userId == db.collection('Users').doc()) ? (
//     <div>
//     <h2>Welcome,<span>{userId}</span></h2>
//     <Link to='/camera' component={Camera}>
//         Next
//     </Link>
//     <button>Logout</button>
// </div>
// ) : (

//LinE
// const [pictureUrl, setPictureUrl] = useState(logo);
// const [idToken, setIdToken] = useState("");
// const [displayName, setDisplayName] = useState("");
// const [statusMessage, setStatusMessage] = useState("");
// const [userId, setUserId] = useState("");
// const initLine = () => {
//   liff.init({ liffId:'1656564563-kqRWyPoX'}, () => {
//     if (liff.isLoggedIn()) {
//       runApp();
//     } else {
//       liff.login();
//     }
//   }, err => console.error(err));
// }
// const runApp = () => {
//   const idToken = liff.getIDToken();
//   setIdToken(idToken);
//   liff.getProfile().then(profile => {
//     console.log(profile);
//     setDisplayName(profile.displayName);
//     setPictureUrl(profile.pictureUrl);
//     setStatusMessage(profile.statusMessage);
//     setUserId(profile.userId);
//   }).catch(err => console.error(err));
// }
// useEffect(() => {
//   initLine();
// }, []);