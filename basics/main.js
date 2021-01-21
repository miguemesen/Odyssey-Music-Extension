var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, mainImage, playBtn, nextBtn, preBtn, openBtn, closeBtn, volumeBtn, playing, timeBar, volumeBar, songName, movingBar, videoData, changingVolume;
var panel, playable;

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
panel = document.getElementById("panelItem");

playing = true;
movingBar = false;
changingVolume = false;
playable = false;


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0', 
        width: '0',
        autoplay: '0',
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

    videoInfo(songId).then(function(result){
        var status, imgUrl, name;
        status = result.playabilityStatus.status;
        imgUrl = result.videoDetails.thumbnail.thumbnails[2].url;
        name = result.videoDetails.title.replaceAll("+", " ");

        songName.innerHTML = name;
        mainImage.src = imgUrl;

        if (status === "UNPLAYABLE"){
            panel.style.height = `${mainImage.height}px`;
            panel.style.width = `${mainImage.width}px`;
            panel.style.visibility = "visible";
        }
        else{
            panel.style.visibility = "hidden";
        } 
    })
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
    //changeSong("W5d4SJv2d6M");
}

function onPlayerStateChange(event) {
    document.getElementById("time").max = player.getDuration();
    player.addEventListener("onStateChange", updateBar);
}

async function videoInfo(songId){
    parseYoutubeInfoStringToFormats = function(youtubeInfoString) {
        var element, formatStreamArray, youtubeInfoArray, _i, _len;
        youtubeInfoArray = youtubeInfoString.split('&');
  
        if (youtubeInfoArray[0] === 'status=fail') {
          return false;
        }
  
        var _i, _len, _results;
  
        for (_i = 0, _len = youtubeInfoArray.length; _i < _len; _i++) {
          element = youtubeInfoArray[_i];
          if (element.split('=')[0] === 'player_response') {
              //console.log(element);
              _results = element;
              break;
          }
        }
  
        formatStreamArray = decodeURIComponent(_results);
        formatStreamArray = formatStreamArray.replace("player_response=", "");
        var jsonObj = JSON.parse(formatStreamArray);
        console.log(jsonObj);
        return jsonObj;
      };

    var promise = new Promise(function(resolve){
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.open("GET", "http://www.youtube.com/get_video_info?video_id=" + songId, true);
        anHttpRequest.setRequestHeader('Access-Control-Allow-Origin','*');
        anHttpRequest.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        anHttpRequest.setRequestHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
        anHttpRequest.setRequestHeader('Content-type', 'text');
        anHttpRequest.onreadystatechange = function () {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                resolve(parseYoutubeInfoStringToFormats(anHttpRequest.responseText));  
        };
        anHttpRequest.send(null);
    });

    return promise;
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
        changeSong(request.msg)
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("dentro del main")
        console.log(request.usr)
    }
);
