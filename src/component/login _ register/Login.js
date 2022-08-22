import React from 'react';
import { Link } from 'react-router-dom';

import './ContentCSS.css'

import logo from './logo.png.png'


function LoginT() {
    return (
      <div className="shadow p-3 mb-5 bg-body" id='Login' >


          <div className='row d-flex flex-row justify-content-center' style={{marginTop: '-5%'}}>
            <img src={logo} className="App-logo" alt="logo" style={{width: '65%'}}/>
          </div>
          
          
          <div id='headText' style={{marginTop: '-10%'}}>
            {/* <div className='row d-flex flex-row justify-content-center'> 
                Welcome To
            </div> */}
            <div className='row d-flex flex-row justify-content-center pb-2' style={{fontSize: 'xx-large'}}> 
                Fire Fly
            </div>
            {/* <div className='row d-flex flex-row justify-content-center'> 
                Login
            </div> */}
          </div>

          <div className='row d-flex flex-row justify-content-center'>
            <input type="text" class="form-control m-2" placeholder="Username" id='inputFieldFormat'/>
            <input type="text" class="form-control mb-2" placeholder="Password" id='inputFieldFormat'/>
          </div>

          <div className='row d-flex flex-row justify-content-center'>
              {/* <div className='col-2'/> */}
              <div className='d-flex flex-row justify-content-center d-grid gap-2'>
                <button className='btn text-white fw-bold' id='SignInBtn' > Sign In </button>
              </div>
              {/* <div className='col-2'/> */}
          </div>

          

          <div className='row d-flex flex-row justify-content-center mt-3' >
              <hr style={{width: '90%'}}/>
              <Link to='/register' style={{fontSize: 'small', marginTop: '-4%'}}> Register </Link>
          </div>
          
          
      </div>

    );
  }
  
  export default LoginT;