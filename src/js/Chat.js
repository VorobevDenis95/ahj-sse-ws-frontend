import ChatAPI from './api/ChatAPI';
import Modal from './Modal';

export default class Chat {
  constructor(container) {
    this.container = container;
    this.api = new ChatAPI();
    this.websocket = null;
    this.modal = new Modal();
    this.user = null;
    this.userId = null;
  }

  init() {
    this.modal.openModal();
    this.onEnterChatHandler();
  }

  bindToDOM() {
    const div = document.createElement('div');
    div.classList.add('container');
    div.innerHTML = Chat.markup;
    this.container.append(div);
  }

  static get markup() {
    return `
    <div class="chat__header">Добро пожаловать в чат</div>
    <div class="chat__container">
      <div class="chat__userlist"></div>
      <div class="chat__area">
        <div class="chat__messages-container"></div>
        <form class="form">
          <input class="form__input" placeholder="type your messages here">
        </form>
      </div>
    </div>
    `;
  }

  createMessage(data) {
    const div = document.createElement('div');
    const messagesContainer = this.container.querySelector('.chat__messages-container');
    div.classList.add('message__container');
    div.innerHTML = `<div class='message__header'>${data.name} ${data.message.time}</div>
    <div class="message__container-interlocutor">${data.message.text}</div>
    `;
    messagesContainer.append(div);
  }

  registerEvents() {
    
  }

  subscribeOnEvents() {
    const formMessage = this.container.querySelector('.form');
    formMessage.addEventListener('submit', (e) => {
      e.preventDefault();
      this.sendMessage();
    });
  }

  websocketOnEvents() {
    this.websocket.addEventListener('open', (e) => {
      console.log(e);
      console.log('ws open');
    });

    this.websocket.addEventListener('message', (e) => {
      const data = JSON.parse(e.data);
      if (Object.getPrototypeOf(data).constructor === Array) {
        data.map((el) => {
          this.renderUser(el.name);
        });
        this.userId = data[data.length - 1].id;
      }
      console.log(Object.getPrototypeOf(data).constructor === Object);
      if (Object.getPrototypeOf(data).constructor === Object) {
        console.log(e);
        this.createMessage(data);
      }
      console.log('ws message');
    });

    this.websocket.addEventListener('close', (e) => {
      console.log(e);
      console.log('ws close');
    });
  }

  onEnterChatHandler() {
    const { formInput, form, modalClose } = this.modal;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (formInput.value.trim()) {
        const data = { name: formInput.value };
        fetch('http://localhost:3000/new-user', {
          method: 'POST',
          body: JSON.stringify(data),
        }).then((responce) => {
          if (responce.ok === true && responce.status === 200) {
            this.user = formInput.value;
            this.modal.deleteModal();
            this.bindToDOM();
            this.websocket = new WebSocket('ws://localhost:3000/ws');
            this.websocketOnEvents();
            this.subscribeOnEvents();
          }
          console.log(responce);
        });
      }
    });
    modalClose.addEventListener('click', () => {
      this.modal.deleteModal();
    });
  }

  sendMessage() {
    const formInput = this.container.querySelector('.form__input').value;
    const payLoad = {
      type: 'send',
      message: { text: formInput, time: new Date() },
      name: this.user,
    };
    this.websocket.send(JSON.stringify(payLoad));
  }

  renderMessage(data) {

  }

  renderUser(name) {
    if (name === this.user) {
      name = 'Your';
    }
    const userList = this.container.querySelector('.chat__userlist');
    const user = document.createElement('div');
    user.classList.add('chat__user');
    user.textContent = name;
    userList.append(user);
  }
}
