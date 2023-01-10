// Scaledrone
const CHANNEL_ID = "qqxtR1YAPcD40c4W";
const drone = new ScaleDrone(CHANNEL_ID, {
 data: { // Will be sent out as clientData via events
   name: getName(),
   color: getRandomColor(),
   avatar: createAvatar()
 },
}); 


function getName() {
  let adjs = ["Rising", "Blue", "Black", "Red", "Yellow", "White", "Silver", "Crystal", "Green", "Purple", "Dark", "Bright", "Pink", "Mutable", "Stable", "Lead", "Hindering", "Sparkling", "Bursting", "Curious"];
    const nouns = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Saturn", "Jupiter", "Neptune", "Saturn", "Uranus", "Pluto", "Star", "Nebula", "Blackhole", "Pulsar", "Comet", "Meteorite", "Satellite", "Astronaut"];
  
    return (
     adjs[Math.floor(Math.random() * adjs.length)] +
     " " +
     nouns[Math.floor(Math.random() * nouns.length)] + ":"
    );
}


function createAvatar(avatar){

    const avatarPhoto = document.getElementById("avatar");
    const avatarPhotoBac = avatarPhoto.style.background;
    const avatarDiv = document.createElement("div");
    avatarDiv.id = "avatar-user";

    avatarDiv.style.background = avatarPhotoBac;
    return avatarDiv;
}


let members = [];  

drone.on('open', error => {
  if (error) {
    return console.error(error);
  }

  console.log('Successfully connected to Scaledrone');
  
  const room = drone.subscribe('observable-room');
  room.on('open', error => {
    if (error) {
      return console.error(error);
    }
    console.log('Successfully joined room');
  });

  room.on('members', m => {
      members = m;
        updateMembersDOM();
     });
  room.on('member_join', member => {
      members.push(member);
        updateMembersDOM();
  });
  room.on('member_leave', ({id}) => {
      const index = members.findIndex(member => member.id === id);
        members.splice(index, 1);
          updateMembersDOM();
     });    

  room.on('data', (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });

  var poruka = document.getElementById("poruka");
  poruka.addEventListener("keypress", (event) => {

    if(event.key === "Enter"){
      document.getElementById("gumb").click();  
      event.preventDefault();  
      document.getElementById("poruka").innerHTML = poruka.value;
      poruka.value = "";
    }

    if(poruka.value === null){
      return alert("Please write a message");
    }
  });
});

drone.on('close', event => {
  console.log('Connection was closed', event);
});

drone.on('error', error => {
  console.error(error);
});
  

function getRandomColor(){
    return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

const DOM = {
  membersCount: document.querySelector('.members-count'),
  membersList: document.querySelector('.members-list'),
  messages: document.querySelector('.messages'),
  input: document.querySelector('.message-form__input'),
  form: document.querySelector('.message-form'),
 };
  
 function createMemberElement(member) {
  const { name, color, avatar } = member.clientData;
  const el = document.createElement('div');
  el.appendChild(document.createTextNode(name));
  el.className = 'member';
  el.style.color = color;
  el.style.background = avatar;
  return el;
 }
  
 function updateMembersDOM() {
  DOM.membersCount.innerText = `Users in room: ${members.length}`;
  DOM.membersList.innerHTML = '';
  members.forEach(member =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
 }

 /* function createAvatarEle(avatar){
  const avatar = avatar.style.boxShadow;
  const avaEle = document.createElement("div");
  avaEle.appendChild(document.createAttribute(avatar));
  avaEle.className = "avaEle";
  avaEle.style.background = AVATAR;
  return fullEle;
 } */
  


 function createMessageElement(text, member, avatar) {
  const el = document.createElement('div');
  el.appendChild(createAvatar(avatar));
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = 'message';
  return el;
 }
  
 function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
 }

 DOM.form.addEventListener('submit', sendMessage);
 
function sendMessage() {
 const value = DOM.input.value;
 if (value === '') {
   return alert("No messages written.");
 }
 DOM.input.value = '';
 drone.publish({
   room: 'observable-room',
   message: value,
 });
}

// Avatar Upload
const UPLOAD_BUTTON = document.getElementById("upload-button");
const FILE_INPUT = document.querySelector("input[type=file]");
const AVATAR = document.getElementById("avatar");


UPLOAD_BUTTON.addEventListener("click", () => FILE_INPUT.click());

FILE_INPUT.addEventListener("change", event => {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = () => {
    AVATAR.setAttribute("aria-label", file.name);
    AVATAR.style.background = `url(${reader.result}) center center/cover`;
    AVATAR.style.boxShadow = "1px 1px 10px rgb(0, 253, 106)";
    AVATAR.style.transition = "box-shadow ease-out 3s"
  };
});











