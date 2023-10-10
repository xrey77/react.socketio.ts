import React, { useEffect, useState } from 'react';
import {io} from "socket.io-client";
import './App.css';
import $ from 'jquery';
// let URLS: any = process.env.NODE_ENV === 'production' ? undefined : 'https://react-socketio-ts-server.vercel.app:3001"';

const socket = io("wss://react-socketio-ts-server.vercel.app:4001");

export default function Messenger() {
  let username: any = sessionStorage.getItem('USERNAME');
  
  const [message, setMessage] = useState('');
  const [privateChat, setPrivateChat] = useState('');
  const [groupChat, setGroupChat] = useState('');
  const [broadcastChat, setBroadcastChat] = useState('');
  const [errMessage, setErrMessage] = useState('');
  let [room, setRoom] = useState('');

  // Function to get initials, ex: Rey Gragasin = RG
  // const getInitial = (x1:any) => {
  //   let x2:number = x1.indexOf(' ');
  //   let x3: any = x1.substring(0,x2);
  //   let x4: any = x1.substring(x1.length,x2);
  //   let x5: any = x3.trim().toUpperCase().substring(0,1) + x4.trim().toUpperCase().substring(0,1);    
  //   return x5
  // }

  const joinGroup = (xval: any) => {      
    setRoom(xval);
    let x11: any = `<div id="${xval}" style="width:105px;height:100px;padding-bottom:10px;padding-left:3px;padding-top:10px;"><a onClick="javascript:clickGroup('${xval}'); return false;" href="#"><img src="/users/google.png" alt="group" style="width:30px;height:30px;border-radius:50%;"/></a>&nbsp;<span>${xval}</span></div>`;
    $("#xusers").append(x11); 
    $("#xusers").scrollTop(600);
    $("#usersContent").scrollTop(600);
    $("#xid")[0].focus();
    return;
  }

  const closeMessenger = (e: any) => {
    e.preventDefault();
    sessionStorage.removeItem('USERNAME');
    window.location.href="/";
  }

  useEffect(() => {  
    
    if (!$('#private').is(":checked")) {
      $('#private').prop('checked', true);
    }
    if ($('#group').is(":checked")) {
      $('#private').prop('checked', false);
    }

    if ($('#broadcast').is(":checked")) {
      $('#private').prop('checked', false);
      $('#group').prop('checked', false);
    }

    // FOCUS TO MESSAGE INPUT
    $("#xid")[0].focus();
    
    if (room === '') {

      setPrivateChat(username + " CHAT ROOM");

      //USER LOGGED IN
      socket.emit("joinUser", {username});
      socket.on('userRoom', (msg: any) => {    

          // DISPLAY OTHER ONLINE USERS
            let x1: any = `<div id="${msg.username.username}" style="width:50px;height:100px;padding-bottom:10px;padding-left:3px;padding-top:10px;"><a onclick="javascript:userClick('${msg.username.username}'); return false;" href="#" style="text-decoration:none;"><img src="/users/pix.png" style="width:30px;height:30px;border-radius:50%;"/></a>${msg.username.username}</div>`;
            $("#xusers").append(x1);
            $("#xusers").scrollTop(600);
            $("#usersContent").scrollTop(600);    

            //DISPLAY USER STATUS
            $("#messageContent").append(`<div style="color: red;">${msg.username.username} | ${msg.time}</div><div style="font-size:12px;">${msg.text}</div>`);
            let messageArea: any = document.getElementById('messageContent');
            messageArea.scrollTop = messageArea.scrollHeight;              

      });
      
      // PRIVATE USER CHAT
      socket.on('userChat', (msg: any) => {
        let x1: any = `<div id="${msg.username.username}" style="width:50px;height:100px;padding-bottom:10px;padding-left:3px;padding-top:10px;"><a onclick="javascript:userClick('${msg.username.username}'); return false;" href="#" style="text-decoration:none;"><img src="/users/pix.png" style="width:30px;height:30px;border-radius:50%;"/></a>${msg.username.username}</div>`;
        $("#xusers").append(x1);
        $("#xusers").scrollTop(600);
        $("#usersContent").scrollTop(600);    
        $("#messageContent").append(`<div style="color: red;">${msg.username.username} | ${msg.time}</div><div>${msg.text}</div>`);    
        let messageArea: any = document.getElementById('messageContent');
        messageArea.scrollTop = messageArea.scrollHeight;              
  });

    } else {

        // GROUP CHAT ROOM ==================================
      setPrivateChat('');
      if (room !== 'Select Group to join') {
        socket.emit("joinGroup", {username, room});
        socket.on('groupMessage', (msg: any) => {    

              //DISPLAY GROUP STATUS
              $("#messageContent").append(`<div style="color: red;">${msg.username.room} | ${msg.time}</div><div style="font-size:12px;">${msg.text}</div>`);
              let messageArea: any = document.getElementById('messageContent');
              messageArea.scrollTop = messageArea.scrollHeight;              
        });

        //RECEIVE GROUP MESSAGE AND DISPLAY
        socket.on('groupChat', (msg: any) => {
          $("#messageContent").append(`<div style="color: red;">${msg.username.username} | ${msg.time}</div><div>${msg.text}</div>`);    
          let messageArea: any = document.getElementById('messageContent');
          messageArea.scrollTop = messageArea.scrollHeight;              
      });
          
      }

    }

    // BROADCAST MESSAGE TO EVERYONE
    socket.on('broadcastMessage', (msg: any) => {
      $("#messageContent").append(`<div style="color: red;">${msg.username.username} | ${msg.time}</div><div>${msg.text}</div>`);    
      let messageArea: any = document.getElementById('messageContent');
      messageArea.scrollTop = messageArea.scrollHeight;              
});
    
    // USER LOGGED OUT
    socket.on('offLine', (msg: any) => {    
      $("#messageContent").append(`<div style="color: red;">${msg.username.username} | ${msg.time}</div><div style="font-size:12px;">${msg.text}</div>`);
      let messageArea: any = document.getElementById('messageContent');
      messageArea.scrollTop = messageArea.scrollHeight;        

      //REMOVE USER
      $("#xusers")[0].children.namedItem(msg.username.username)?.remove()        
    });


},[username,room])

const sendMessage = (e: any) => {
  e.preventDefault();

  if (!$('#private').is(":checked") || !$('#group').is(":checked") || !$('#broadcast').is(":checked")) {
    setErrMessage("** Please select CHAT option.");
    $("#grupo").hide();
    window.setTimeout(() => {
      setErrMessage('')
      $("#grupo").show();
    }, 3000);
    return;
  }

  let receipient: any = $("#tmpuser").val();
  let xgroup: any = $("#isuser").val();  
  if (privateChat !== '') {
    setRoom('');
    if( receipient === "" ) {
      $("#grupo").hide();
      setErrMessage("** Please select user receipient (click the icon)...");
      window.setTimeout(() => {
        setErrMessage('')
        $("#grupo").show();
      }, 3000);
      return;        
    }
  }

  // PRIVATE CHAT
  if ($('#private').is(":checked")) {
    if (room === '') {

      let xreceipient: any = $("#tmpuser").val();
      socket.emit("userChat", {username, xreceipient,message});
      return;
    }
  }

  // GROUP CHAT
  if ($('#group').is(":checked")) {

      if( receipient === "" ) {

        $("#grupo").hide();
        setErrMessage("** Please select group receipient (click the icon)...");
        window.setTimeout(() => {
          setErrMessage('')
          $("#grupo").show();
        }, 3000);  
        return;        
      }

      if (xgroup === 'USER') {
        setErrMessage("** Please select group receipient (click the icon)...");
        window.setTimeout(() => {
          setErrMessage('')
        }, 3000);
        return
      }
      let x2: any = $("#tmpuser").val();
      setGroupChat('Group Chat with ' + x2);
      socket.emit("groupChat", {username,room,message});
      $("#xid")[0].focus();            
      $("#xid").val('');
      setMessage('');
  
  }

  // BROADCAST MESSAGE TO ALL
  if ($('#broadcast').is(":checked")) { 
    socket.emit("broadcastMessage", {username,room,message});
    $("#xid")[0].focus();            
    $("#xid").val('');
    setMessage('');  
  }

}

  // PRIVATE CHECKBOX
  const privateClick = () => {
    $('#group').prop('checked', false);
    $('#broadcast').prop('checked', false);

    if ($('#private').is(":checked")) {
        setBroadcastChat('')
        setGroupChat('');
        let receipient1: any = $("#tmpuser").val();
        let isuser1: any = $("#isuser").val();
  
        if (isuser1 === "GROUP") {
          setGroupChat('');            
          $("#tmpuser").val('');
          $("#isuser").val('');
          setPrivateChat('Private Chat');
        }
        if (receipient1 === "") {
          setPrivateChat('Private Chat');
        } else {
          setPrivateChat('Private Chat with ' + receipient1);
        }
        receipient1 = '';
      }
      if (!$('#private').is(":checked")) {
        setTimeout(() => {
          $("#tmpuser").val('');
          setPrivateChat('');              
        }, 1000);
      }            
    }

    // GROUP CHECKBOX
    const groupClick = () => {
      window.setTimeout(() => {
        $('#private').prop('checked', false);
        $('#broadcast').prop('checked', false);          
      }, 500);
      let receipient2: any = $("#tmpuser").val();
      let isuser2: any = $("#isuser").val();
      setBroadcastChat('')
      setPrivateChat('');
  
      setGroupChat('Group Chat');
      setRoom('Select Group to join')
      if (room.trim() === 'Select Group to join') {
        return;
      } 

      if ($("#xusers").children().length === 0) {
        setErrMessage("** Please select group receipient (click the icon)...");
        setTimeout(() => {
          setErrMessage("");
          $('#group').prop('checked', false);
        }, 3000);

        return;
      }

      if ($('#group').is(":checked")) {
        setBroadcastChat('')
        setPrivateChat('');
  

        if (isuser2 === "USER") {
          $("#tmpuser").val('');
          $("#isuser").val('');
        }

        if (receipient2 === "") {
          setGroupChat('Group Chat');
        } else {
          setGroupChat('Group Chat with ' + receipient2);
        }
        receipient2 = '';
      } else {
        $("#tmpuser").val('');
        setTimeout(() => {
          $("#tmpuser").val('');
          setGroupChat('')
        }, 1000);

      }            
    }

    //BROADCAST CHECKBOX
    const broadcastClick = () => {
      setPrivateChat('');
      setGroupChat('');
      $('#private').prop('checked', false);
      $('#group').prop('checked', false);

      if ($('#broadcast').is(":checked")) {
        setBroadcastChat('Broadcast Message to everyone.');
      } 

    }

  return (

    <div className="container">
      <div className="card">
        <div className="card-header bg-primary text-white text-center">
        <div className="modal-header bg-primary">
        {
                privateChat === '' && groupChat === '' && broadcastChat === '' ? (
                  <h4 className="modal-title fs-5 text-white">Chat Room</h4>
                ) :
                null
              }

              {
              privateChat !== '' ? (
                <h4 className="modal-title fs-5 text-white">{privateChat}</h4>
              ):
              null
            }

            {
              groupChat !== '' ? (
                <h4 className="modal-title fs-5 text-white">{groupChat}</h4>
              ): 
              null
            }

            {
              broadcastChat !== '' ? (
                <h4 className="modal-title fs-5 text-white">{broadcastChat}</h4>
              ) :
              null
            }
              <button onClick={closeMessenger} type="button" className="btn-close btn-close-white" aria-label="Close"></button>
            </div>
        </div>
        <div className='card-body bg-warning'>

            <div className='row'>

            <div className='col-md-3'>
                <div id="usersContent"><div id='xusers'></div></div>
            </div>

            <div className='col-md-9'>
                <div className='message-box'>
                    <div id="messageContent"></div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <form onSubmit={sendMessage}>

                        <div className='mb-3'>

                            <div className="input-group mt-2 mb-3">
                              <textarea id="xid" onChange={e => {setMessage(e.target.value);}}  className="form-control btn-outline-primary" autoComplete='off' placeholder="Enter your message" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                              <button className="btn btn-outline-primary bg-primary text-white" type="submit" id="button-addon2">send</button>
                          </div>

                            <div className="text-left text-danger"><strong>{errMessage}</strong></div>
                            <input id="tmpuser" type="hidden"></input>
                            <input id="isuser" type="hidden"></input>
                        </div>
                        { groupChat !== '' ? (
                                        <div id="grupo" className="w-50 nav-item dropdown">
                                          <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <strong>{room}</strong>
                                          </a>
                                          <ul className="dropdown-menu">
                                                                                      
                                            <li><span onClick={e => {joinGroup("HR Department");}} className="dropdown-item xpointer">HR Department</span></li>
                                            <li><span onClick={e => {joinGroup("Accounting Department");}}  className="dropdown-item xpointer">Accounting Department</span></li>
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><span onClick={e => {joinGroup("ICT Department");}}  className="dropdown-item xpointer">ICT Department</span></li>
                                          </ul>
                                        </div>
                                      ): null
                                    }
                        </form>

                    </div>
                </div>

            </div>

            </div>
            <div className='row'>
                <h5>Select Chat option :</h5>

                  <div className='col col-md-2'>
                      <div className="form-check">

                          <input id='private' type="checkbox" onChange={privateClick} className="form-check-input"/>
                          <label className="form-check-label" htmlFor="private" style={{fontSize: 12}}>
                              PRIVATE CHAT
                          </label>
                      </div>
                  </div>
                  <div className='col col-md-2'>
                      <div className="form-check">
                          <input id='group' type="checkbox" onChange={groupClick} className='form-check-input'/>
                          <label className="form-check-label" htmlFor="group" style={{fontSize: 12}}>
                              GROUP CHAT
                          </label>
                      </div>
                  </div>

                  <div className='col'>
                      <div className="form-check">
                          <input id='broadcast' type="checkbox" onChange={broadcastClick} className='form-check-input'/>
                          <label className="form-check-label" htmlFor="broadcast" style={{fontSize: 12}}>
                              BROADCAST MESSAGE
                          </label>
                      </div>
                  </div>

              </div>

            </div>
      </div>
    </div>
  );
}