import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react' 
import { Link } from 'react-router-dom';

function LoginForm({ Login,Error}) {
    const [details,setDetails] =useState({ClientID:"",Password:""});
    const submitLoginHandler = e => {
        e.preventDefault();
        Login(details);
    }
    return (
        <form onSubmit={submitLoginHandler}>
            <div>
                <h2>Login</h2>
                <div>
                    <label>Id</label>
                    <TextField
                    placeholder='Client_id' value={details.ClientID} onChange={e => setDetails({...details, ClientID : e.target.value})}/>
                </div>
                <div>
                    <label>Password</label>
                    <TextField type='password' value={details.Password} onChange={e => setDetails({...details, Password : e.target.value})}/>
                </div>        
                <Button type="submit">Login</Button>
            </div>
        </form>
    );
}
export default LoginForm