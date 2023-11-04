import Chat from './Chat';

const root = document.getElementById('root');

const app = new Chat(root);

app.init();

// const chat = document.querySelector('.chat');
// const chatMessage = document.querySelector('.chat-message');
// const chatSend = document.querySelector('.chat-send');

// const chatMessage2 = document.querySelector('.chat-message2');
// const chatSend2 = document.querySelector('.chat-send2');

// // chatSend.addEventListener('click', () => {
// //     const message = chatMessage.value;
// //     const data = {name: message};
// //     if (!message) return;

// //     fetch('http://localhost:3000/new-user', {
// //         method: 'POST',
// //         body: JSON.stringify(data),
// //     }).then((responce) => {
// //         console.log(responce);  
// //         const ws = new WebSocket('ws://localhost:3000/');

// chatSend.addEventListener('click', () => {
//     const message = chatMessage.value;
//     const data = {name: message};
//     if (!message) return;
    
//     fetch('http://localhost:3000/new-user', {
//         method: 'POST',
//         body: JSON.stringify(data),
//     }).then((responce) => {
//         console.log(responce);  

// const ws = new WebSocket('ws://localhost:3000/ws');

// ws.addEventListener('open', (e) => {
//     console.log(e);

//     console.log('ws open');
// });

// ws.addEventListener('close', (e) => {
//     console.log(e);

//     console.log('ws close');
// });

// ws.addEventListener('message', (e) => {
//     console.log(e);
//     console.log('ws message');
// });  

//     });
// });




// const ws = new WebSocket('ws://localhost:3000/ws');

// ws.addEventListener('open', (e) => {
//     console.log(e);

//     console.log('ws open');
// });

// ws.addEventListener('close', (e) => {
//     console.log(e);

//     console.log('ws close');
// });

// ws.addEventListener('message', (e) => {
//     console.log(e);
//     console.log('ws message');
// });  

// chatSend2.addEventListener('click', () => {
//     // ws.send(JSON.stringify(chatMessage2.value));
//     ws.send(JSON.stringify({type: 'exit'}));
//     // const receivedMessage = {type: 'send'};
//     // ws.message(receivedMessage);
// })
   
// //   });
// // });

  
    

