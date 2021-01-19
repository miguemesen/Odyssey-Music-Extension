var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, mainImage, playBtn, nextBtn, preBtn, openBtn, closeBtn, volumeBtn, playing, timeBar, volumeBar, songName, movingBar, videoData, changingVolume;

playBtn = document.getElementById("play");
preBtn = document.getElementById("pre");
nextBtn = document.getElementById("next");
timeBar = document.getElementById("time");
volumeBar = document.getElementById("volumeBar")
songName = document.getElementById("song-name");
openBtn = document.getElementById("open");
closeBtn = document.getElementById("closeBtn");
mainImage = document.getElementById("mainImage");
volumeBtn = document.getElementById("volume");



playing = true;
movingBar = false;
changingVolume = false;


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', 
        width: '0',
        autoplay: '0',
        videoId:"QuxQnR4uTG4",
        playerVars: { 'controls': 2 },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });
}

playBtn.onclick = function() {
    if(playing){
        player.pauseVideo(); 
        document.getElementById("play_img").src = "play.png";
    }
    else{
        player.playVideo();
        document.getElementById("play_img").src = "pause.png";
    }
    playing = !playing;
}

preBtn.onclick = function(){
    player.seekTo(0);
}

nextBtn.onclick = function(){
    changeSong("acEOASYioGY")
}

openBtn.onclick = function(){
    openNav();
}

closeBtn.onclick = function(){
    closeNav();
}

async function changeSong(songId){
    player.loadVideoById(songId);
    // Actualizar el nombre de la nueva canción.
    updateData(songId);
    console.log(player.getPlayerState());
}

timeBar.onchange = function(){
    player.seekTo(timeBar.value, true);
    movingBar = false;
}

timeBar.onmousedown = function(){
    movingBar = true;
}

volumeBtn.onmouseenter = function(){
    volumeBar.style.visibility = "visible";
}

volumeBar.onchange = function(){
    player.setVolume(volumeBar.value);
    volumeBar.style.visibility = "hidden";
}

function onPlayerReady(event) {
    changeSong("W5d4SJv2d6M");
}

function onPlayerStateChange(event) {
    document.getElementById("time").max = player.getDuration();
    player.addEventListener("onStateChange", updateBar);
}


async function isPlayable(songId){
    let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${songId}&key=AIzaSyB61Hqd0S1jfbqMuuFHMU8ojp3O8gEry9k`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
    }}).then(response => response.json()).then(json => json);
    console.log(myResponse);
}



async function updateData(songId){
    let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${songId}&key=AIzaSyB61Hqd0S1jfbqMuuFHMU8ojp3O8gEry9k`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
    }}).then(response => response.json()).then(json => json);
    songName.innerHTML = myResponse.items[0].snippet.title;
    mainImage.src = myResponse.items[0].snippet.thumbnails.high.url;
}

function updateBar () {
    if (!movingBar){
        if (YT.PlayerState.PLAYING) {
            timeBar.value = player.getCurrentTime();
            setTimeout(updateBar,1000);
        }
    }
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        //console.log("https://www.youtube.com/embed/"+request.msg)
        //document.getElementById("interfaz").src="https://www.youtube.com/embed/"+request.msg
        changeSong(request.msg)
    }
);
