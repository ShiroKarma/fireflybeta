import React, { useEffect } from "react";
import { ListItem, ListItemText, Button } from "@material-ui/core";
import { db } from "../../utils/firebase";
import firebase from 'firebase'
export default function TodoListItem({ todo, inprogress, id , place , coord , name }) {
  function toggleInProgress() {
    db.collection("history").doc(id).update({
      inprogress: !inprogress,
      
    });
  }

  function deleteTodo() {
    db.collection("history").doc(id).delete();
  }

  return (
    <div style={{ display: "flex" }}>
      <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "In Progress" : "Completed"}
        />
      </ListItem>
      <Button onClick={toggleInProgress}>
        {inprogress ? "ยืนยัน" : "ยกเลิก"}
      </Button>
      <Button onClick={deleteTodo}>X</Button>

      {/* <div>
        <div className="col">
          <div className="row">
            Location
          </div>
          <div className="ml-2">
            lat: 132 <br/>
            long: 132
          </div>

        </div>
      </div> */}



    </div>
  );
}