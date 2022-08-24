
import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'
import LoginForm from './AdminLogin'
import Verify from './Verify'

function Path() {
    const adminUser = {
        ClientID: 'BetaAdmin',
        Password: 'adminnothere'
    }
    const [user, setUser] = useState({ ID: "" })
    const [Error, setError] = useState('')

    const Login = (details) => {
        console.log(details);

        if (details.ClientID == adminUser.ClientID && details.Password == adminUser.Password) {
            alert("Welcome Back Admin")
            setUser({
                ID: details.ClientID
            })
        } else {
            alert("who are you?")
            setError("detail doesn't Match")
        }
    }
    const Logout = () => {
        console.log("Logout")
    }

    return (
        <div>
            {(user.ID != "") ? (
                <div>
                    <h2>Welcome,<span>{user.ID}</span></h2>
                    <Link to='/Verify' component={Verify}>
                        go To verify
                    </Link>
                    <button>Logout</button>
                </div>
            ) : (<LoginForm Login={Login} error={Error} />)}

        </div>
    );

}
export default Path