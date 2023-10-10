import React from 'react';
import { Routes, Route } from "react-router-dom";
import Messenger from './Messenger';
import Home from './Home';
import Login from './Login';

export default function App() {
  return (
     <Routes>
      <Route path= '/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/messenger' element={<Messenger/>} />
    </Routes>
  );
}

// import { useState } from 'react';
// import './App.css';
// import $ from 'jquery';

// export default function App() {
//     const [privateChat, setPrivateChat] = useState('');
//     const [groupChat, setGroupChat] = useState('');
//     const [broadcastChat, setBroadcastChat] = useState('');
//     const [errMessage, setErrMessage] = useState('');
//     const [room, setRoom] = useState('Select Group to join');

//     const joinGroup = (xval: any) => {      
//       if (xval === "Select Group to join") return;
//       setRoom(xval);
//       setGroupChat('Group Chat with ' + xval);
//       const x11 = `<div style="width:105px;height:100px;padding-bottom:10px;padding-left:3px;padding-top:10px;"><a onClick="javascript:clickGroup('${xval}')" href="#"><img src="/users/google.png" alt="group" style="width:30px;height:30px;border-radius:50%;"/></a>&nbsp;<span>${xval}</span></div>`;
//       $("#xusers").append(x11); 
//       $("#xusers").scrollTop(600);
//       $("#usersContent").scrollTop(600);
//       $("#xid")[0].focus();
//     }

//     const offLine = () => {
//         let x1:any = $("#tmpuser").val();
//         $("#xusers")[0].children.namedItem(x1)?.remove()
//       }

//     const sendMessage = (e: any) => {
//       e.preventDefault();
//       if (privateChat === '' && groupChat === '' && broadcastChat === ''){
//         setErrMessage("** Please select CHAT option.");
//         $("#grupo").hide();
//         window.setTimeout(() => {
//           setErrMessage('')
//           $("#grupo").show();
//         }, 3000);
//         return;
//       }

//       if (broadcastChat !== '') {
//         alert('broadcast message');
//         return;
//       }

//       let receipient: any = $("#tmpuser").val();
//       let xgroup: any = $("#isuser").val();
      
//       if (privateChat !== '') {
//         if( receipient === "" ) {
//           $("#grupo").hide();
//           setErrMessage("** Please select user receipient (click the icon)...");
//           window.setTimeout(() => {
//             setErrMessage('')
//             $("#grupo").show();
//           }, 3000);
//           return;        
//         }
  
//         if (xgroup === 'GROUP') {
//           $("#grupo").hide();
//           setErrMessage("** Please select user receipient (click the icon)...");
//           setTimeout(() => {
//             setErrMessage('')
//             $("#grupo").show();
//           }, 3000);
//           return
//         }
//         let x1: any = $("#tmpuser").val();
//         setPrivateChat('Private Chat with ' + x1);
//       }

//       if (groupChat !== '') {
//         if( receipient === "" ) {
//           $("#grupo").hide();
//           setErrMessage("** Please select group receipient (click the icon)...");
//           window.setTimeout(() => {
//             setErrMessage('')
//             $("#grupo").show();
//           }, 3000);
//           return;        
//         }
  
//         if (xgroup === 'USER') {
//           setErrMessage("** Please select group receipient (click the icon)...");
//           setTimeout(() => {
//             setErrMessage('')
//           }, 3000);
//           return
//         }
//         let x2: any = $("#tmpuser").val();
//         setGroupChat('Group Chat with ' + x2);
//       }

//     }    

//     const addUser = () => {
//       let user = "REYNALD";
//       let x1: any = `<div id="${user}" style="width:50px;height:100px;padding-bottom:10px;padding-left:3px;padding-top:10px;"><a onclick="javascript:userClick('${user}')" href="#" style="text-decoration:none;"><img src="/users/pix.png" style="width:30px;height:30px;border-radius:50%;"/></a>${user}</div>`;
//       $("#xusers").append(x1);
//       $("#xusers").scrollTop(600);
//       $("#usersContent").scrollTop(600);    
//     }

//     const addGroup = () => {
//       let xval = "HR DEPARTMENT";
//       const x11 = `<div id="${xval}" style="width:105px;height:100px;padding-bottom:10px;padding-left:3px;padding-top:10px;"><a onClick="javascript:clickGroup('${xval}')" href="#"><img src="/users/google.png" alt="group" style="width:30px;height:30px;border-radius:50%;"/></a>&nbsp;<span>${xval}</span></div>`;
//       $("#xusers").append(x11); 
//       $("#xusers").scrollTop(600);
//       $("#usersContent").scrollTop(600);
//       $("#xid")[0].focus();  
//     }

//     const privateClick = () => {
//       if ($('#private').is(":checked")) {
//           $('#group').prop('checked', false);
//           $('#broadcast').prop('checked', false);
//           setBroadcastChat('')
//           setGroupChat('');
//           let receipient1: any = $("#tmpuser").val();
//           let isuser1: any = $("#isuser").val();
    
//           if (isuser1 === "GROUP") {
//             setGroupChat('');            
//             $("#tmpuser").val('');
//             $("#isuser").val('');
//             setPrivateChat('Private Chat');
//           }
//           if (receipient1 === "") {
//             setPrivateChat('Private Chat');
//           } else {
//             setPrivateChat('Private Chat with ' + receipient1);
//           }
//           receipient1 = '';
//         }
//         if (!$('#private').is(":checked")) {
//           setTimeout(() => {
//             $("#tmpuser").val('');
//             setPrivateChat('');              
//           }, 1000);
//         }            
//       }

//       const groupClick = () => {
//         let receipient2: any = $("#tmpuser").val();
//         let isuser2: any = $("#isuser").val();
//         if ($('#group').is(":checked")) {
//           $('#private').prop('checked', false);
//           $('#broadcast').prop('checked', false);
//           setBroadcastChat('')
//           setPrivateChat('');
//           if (isuser2 === "USER") {
//             $("#tmpuser").val('');
//             $("#isuser").val('');
//           }

//           if (receipient2 === "") {
//             setGroupChat('Group Chat');
//           } else {
//             setGroupChat('Group Chat with ' + receipient2);
//           }
//           receipient2 = '';
//         } else {
//           $("#tmpuser").val('');
//           setTimeout(() => {
//             $("#tmpuser").val('');
//             setGroupChat('')
//           }, 1000);

//         }            
//       }

//       const broadcastClick = () => {
//         if ($('#broadcast').is(":checked")) {
//           $('#private').prop('checked', false);
//           $('#group').prop('checked', false);
//           if (!$('#private').is(":checked") && !$('#group').is(":checked")) {
//             $("#tmpuser").val('');
//             $("#isuser").val('');
//           }

//           setPrivateChat('');
//           setGroupChat('');
//           setPrivateChat('');
//           setBroadcastChat('Broadcast Message to all');
//         } 
//         if (!$('#broadcast').is(":checked")) { 
//           setTimeout(() => {
//             setBroadcastChat('');
//             setRoom('');
//             joinGroup('Select Group to join')
//             $("#tmpuser").val('');              
//           }, 1000);
//         }            

//       }

//   return (
//     <div className="container">
//       <div className="card">
//         <div className="card-header bg-primary text-white text-center">
//             <div className="modal-header bg-primary">
//               {
//                 privateChat === '' && groupChat === '' && broadcastChat === '' ? (
//                   <h4 className="modal-title fs-5 text-white">Chat Room</h4>
//                 ) :
//                 null
//               }

//               {
//               privateChat !== '' ? (
//                 <h4 className="modal-title fs-5 text-white">{privateChat}</h4>
//               ):
//               null
//             }

//             {
//               groupChat !== '' ? (
//                 <h4 className="modal-title fs-5 text-white">{groupChat}</h4>
//               ): 
//               null
//             }

//             {
//               broadcastChat !== '' ? (
//                 <h4 className="modal-title fs-5 text-white">{broadcastChat}</h4>
//               ) :
//               null
//             }


//               <button type="button" className="btn-close btn-close-white" aria-label="Close"></button>
//             </div>
//         </div>
//         <div className='card-body bg-warning'>


//                 <div className='row'>
//                   <div className='col-md-3'>
//                       <div id="usersContent"><div id='xusers'></div></div>
//                   </div>

//                   <div className='col-md-9'>
//                       <div className='message-box'>
//                           <div id="messageContent"></div>
//                       </div>
//                       <div className='row'>
//                           <div className='col'>
//                               <div className='mb-3'>
//                                   <form onSubmit={sendMessage}>
//                                     <textarea id="xid" className='form-control mt-2 mb-2' autoComplete='off' required placeholder='enter message'/>
//                                     <div className="text-left text-danger"><strong>{errMessage}</strong></div>
//                                     <input id="tmpuser" type="hidden"></input>
//                                     <input id="isuser" type="hidden"></input>
//                                     <button type='submit' className='btn btn-primary btn-messenger'>send</button>
//                                     <button onClick={addUser} type='button' className='btn btn-primary btn-messenger'>adduser</button>
//                                     <button onClick={addGroup} type='button' className='btn btn-primary btn-messenger'>addgroup</button>
//                                     <button onClick={offLine} type='button' className='btn btn-primary btn-messenger'>offLine</button>
//                                     { groupChat !== '' ? (
//                                         <div id="grupo" className="w-50 nav-item dropdown">
//                                           <a className="nav-link dropdown-toggle" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                                             <strong>{room}</strong>
//                                           </a>
//                                           <ul className="dropdown-menu">
//                                             <li><a onClick={e => {joinGroup("HR Department");}} href="/#" className="dropdown-item">HR Department</a></li>                                          
//                                             <li><a onClick={e => {joinGroup("Accounting Department");}}  className="dropdown-item" href="/#">Accounting Department</a></li>                                                                                        
//                                             <li><hr className="dropdown-divider"/></li>
//                                             <li><a onClick={e => {joinGroup("ICT Department");}}  className="dropdown-item" href="/#">ICT Department</a></li>                                          
//                                           </ul>
//                                         </div>
//                                       ): null
//                                     }

//                                   </form>
//                                 </div>

//                           </div>
//                       </div>
//                   </div>
//                 </div>

//                 <div className='row'>
//                 <h5>Select Chat option :</h5>

//                   <div className='col col-md-2'>
//                       <div className="form-check">
//                           <input type="checkbox" onChange={privateClick} className="form-check-input" id='private' />
//                           <label className="form-check-label" htmlFor="private" style={{fontSize: 12}}>
//                               PRIVATE CHAT
//                           </label>
//                       </div>
//                   </div>
//                   <div className='col col-md-2'>
//                       <div className="form-check">
//                           <input type="checkbox" onChange={groupClick} className='form-check-input' id='group'  />
//                           <label className="form-check-label" htmlFor="group" style={{fontSize: 12}}>
//                               GROUP CHAT
//                           </label>
//                       </div>
//                   </div>

//                   <div className='col'>
//                       <div className="form-check">
//                           <input type="checkbox" onChange={broadcastClick} className='form-check-input' id='broadcast'  />
//                           <label className="form-check-label" htmlFor="broadcast" style={{fontSize: 12}}>
//                               BROADCAST MESSAGE
//                           </label>
//                       </div>
//                   </div>

//               </div>


//         </div>
//       </div>



//     </div>
    
//   );
// }


