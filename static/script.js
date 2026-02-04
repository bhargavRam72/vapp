const heartsContainer = document.querySelector(".hearts");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");
const music = document.getElementById("music");
const musicToggle = document.getElementById("musicToggle");

// Floating hearts
setInterval(()=>{
  const heart = document.createElement("span");
  heart.innerText = ["❤️","💖","💕"][Math.floor(Math.random()*3)];
  heart.style.left = Math.random()*100 + "vw";
  heart.style.fontSize = Math.random()*30+20 + "px";
  heartsContainer.appendChild(heart);
  setTimeout(()=>heart.remove(),8000);
},400);

// Modal
function showModal(text){ modalText.innerText=text; modal.classList.remove("hidden"); }
closeModal.onclick = ()=> modal.classList.add("hidden");

// Send response to backend
function sendResponse(answer){
  console.log("Sending answer:", answer); // Debug log
  fetch("/api/save", {
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({answer: answer})
  })
  .then(res=>res.json())
  .then(data=>console.log("Response logged:",data))
  .catch(err=>console.error("Fetch error:",err));
}

// YES click
if(yesBtn) {
    yesBtn.onclick=()=>{
      showModal("Yay! You just made my heart skip a beat 💕\nCongrats! You’re officially my Valentine 😎💖");
      sendResponse("YES");
      burstHearts();
    }
}

// NO click
if(noBtn) {
    noBtn.onclick=()=>{
      showModal("Not today, maybe yes someday 🌸\nAlexa, play sad music 🎶🥲");
      sendResponse("NO");
      // Move the button away randomly
      const x = Math.random() * 200 - 100;
      const y = Math.random() * 200 - 100;
      noBtn.style.transform=`translate(${x}px,${y}px)`;
    }
}

// Extra hearts
function burstHearts(){
  for(let i=0;i<20;i++){
    const heart=document.createElement("span");
    heart.innerText="💖";
    heart.style.left="50vw";
    heart.style.animation="floatUp 2s ease-out";
    heartsContainer.appendChild(heart);
    setTimeout(()=>heart.remove(),2000);
  }
}

// Music toggle
if(musicToggle && music) {
    musicToggle.onclick=()=>{
      if(music.paused){ music.play(); musicToggle.innerText="🔊"; }
      else { music.pause(); musicToggle.innerText="🔇"; }
    }
}