import { ListItem, ListItemText, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase";


export default function Test({todo,special,inprogress,id,place,coordLat , coordLng, eName, b64encode , reporttime,percentfire}) {
    const [open,setOpen] = useState('hidden')
      const [trigged,setTrigged] = useState(false)
    function toggleInProgress() {
        db.collection("history").doc(id).update({
          inprogress: !inprogress,
          Status: 1
        });
      }
      console.log(eName)
      function deleteTodo() {
        db.collection("history").doc(id).delete();  
      }


    function getInfo() {
           setTrigged(!trigged)
        if (trigged == true) {
            setOpen('visible')
        } else{
            setOpen('hidden')
        }
    }
    return (
        <div>
            <br/>
            <table>
                <tr onClick={getInfo}>
                    <th style={{ width: '30%' }}>
                        <ListItemText
                            primary={todo}
                            secondary={inprogress ? "In Progress" : "Completed"}
                        />
                    </th>
                    <div style={{ width: '20%' }}>
                        <Button onClick={deleteTodo}> X </Button>
                    </div>
                </tr>
                    <tr style={{visibility: open}}>
                        <td >
                            <h5 style={{ marginLeft: '20%' ,color:"black"}}> สถานที่: <h6>{place}</h6> </h5>
                        </td>
                        {/*<td>
                            <h6 style={{ marginLeft: '-700%' ,color:"black"}}> {place} </h6>
    </td>*/}
                    </tr>
                    <tr style={{visibility: open}}>
                        <td >
                            <h5 style={{ marginLeft: '20%' ,color:"black"}}> Firepercent:{percentfire} </h5>
                        </td>
                        <td>
                            <h6 style={{ marginLeft: '25%' ,color:"black"}}> {reporttime} </h6>
                        </td>
                    </tr>
                    <tr style={{visibility: open}}>
                        <h5 style={{ marginLeft: '25%' ,color:"black"}}> Location </h5>
                    </tr>
                    <tr style={{visibility: open}}>
                        <td>
                            <p style={{ marginLeft: '25%',color:"black" }}> {'>'} latitude : {coordLat}</p>
                            <p style={{ marginLeft: '25%', marginTop: '0%' ,color:"black"}}> {">"} longitude: {coordLng}</p>
                        </td>
                    </tr>
                    <tr>
                    <img src={b64encode} style={{marginLeft: '25%',width:'200px',visibility: open,opacity:'100%'}}/>
                    </tr>
                    <th style={{visibility: open, width: '1%' ,textAlign:'center'}}>
                        <Button onClick={toggleInProgress} >
                            {inprogress ? "Comfirm" : "Cancel"}
                        </Button>
                    </th>
                
            </table>



            {/* <ListItem>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "In Progress" : "Completed"}
        />
      </ListItem>
      <Button onClick={toggleInProgress}>
        {inprogress ? "ยืนยัน" : "ยกเลิก"}
      </Button>
      <Button onClick={deleteTodo}>X</Button> */}

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



        </div >
    );
}