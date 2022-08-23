import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { db } from "../../utils/firebase";
import Test from './Test'
import { IoMailUnreadOutline } from "react-icons/io5";
import './Footer.css'
function Verify() {
  const [todos, setTodos] = useState([]);
  const [cords, setCords] = useState("");
  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch
  function getTodos() {
    db.collection("history").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().Details,
          eName: doc.data().Name,
          placeholder: doc.data().Place,
          coordsLat: doc.data().Location[0],
          coordsLng: doc.data().Location[1],
          inprogress: doc.data().inprogress,
          Static: doc.data().status,
          b64encode: doc.data().Fire_image,
          reporttime: doc.data().Time,
          percentfire: doc.data().Fire
        }))
      );
    });
  }
  return (
    <div>
    <h4 className='Vari'>Verify <IoMailUnreadOutline /></h4>
    <div className="FootBox">
      {todos.map((todo) => (
        <Test
          todo={todo.todo}
          special={todo.timestamp}
          inprogress={todo.inprogress}
          id={todo.id}
          place={todo.placeholder}
          coordLat={todo.coordsLat}
          coordLng={todo.coordsLng}
          name={todo.Name}
          b64encode={todo.b64encode}
          time={todo.reporttime}
          percentfire = {todo.percentfire}
        />
      ))}
    </div>
    </div>
  );
}

export default Verify;
