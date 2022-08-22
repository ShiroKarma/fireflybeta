import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { db } from "../../utils/firebase";
import firebase from "firebase";
import TodoListItem from "./Todo";
import Test from './Todo'

function Verify() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []); // blank to run only on first launch

  function getTodos() {
    db.collection("history").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().Details,
          name: doc.data().Name,
          placeholder : doc.data().Place,
          coordsM: doc.data().Location,
          inprogress: doc.data().inprogress,
          Static: doc.data().status,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    db.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1>Verify Page</h1>
        
        

        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px", backgroundColor: 'red'}}>
          title
          
          {todos.map((todo) => (
            <Test
              todo={todo.todo}
              special={todo.timestamp}
              inprogress={todo.inprogress}
              id={todo.id}
              place={todo.placeholder}
              coord={todo.coordsM}
              name={todo.Name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Verify;
