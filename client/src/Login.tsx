import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './App.css';
import $ from 'jquery';

export default function Login() {
  sessionStorage.clear();
  const [username, setUsername] = useState('');
  let navigate = useNavigate();

   const closeLogin = () => {
    return window.location.href="/";
   }  

  const submitLogin = (e: any) => {
      e.preventDefault();
      sessionStorage.setItem('USERNAME', username.toUpperCase());
      $("#closeLogin")[0].click();
      navigate("/messenger");
  }

  useEffect(() => {
    $("#xlogin")[0].click();
  },[]);

  return (

    <div className="container">

      <button id="xlogin" type="button" className="btn btn-primary" style={{visibility: 'hidden'}} data-bs-toggle="modal" data-bs-target="#loginBackdrop">sign</button>
      {/* Login Modal */}
      <div className="modal fade" id="loginBackdrop" data-bs-backdrop="static" tabIndex={-1} data-bs-keyboard="false" aria-labelledby="loginBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h1 className="modal-title fs-5 text-white" id="loginBackdropLabel">User Login</h1>
              <button onClick={closeLogin} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitLogin}>
                    <input id="usrname" type="text" value={username} onChange={(e) => { setUsername(e.target.value); }} className='form-control input-login mb-1' required autoComplete='off' placeholder='enter Username'/>
                    {/* <select value={selectedItem} onChange={e => setSelectedItem(e.target.value)} className='w100 form-control mt-2' id="xroom">
                      <option value="Join">Join Room</option>
                      <option value="HR Department">HR Department</option>
                      <option value="Accounting Department">Accounting Department</option>
                      <option value="IT Department">IT Department</option>
                    </select> */}
                    <button type='submit' className='btn btn-primary mt-2'>login</button>
                    <button id="closeLogin" type="button" className="btn-close btnClose btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>

              </form>
            </div>
            <div className="modal-footer">
              {/* <div className='w-100 text-danger text-center'>{msg}</div> */}
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

