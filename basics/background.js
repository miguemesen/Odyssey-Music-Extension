const admin = "106632149271936062682";
let user;
chrome.identity.getProfileUserInfo( async function(info) { 
    email = info.email; 
    user = info.id;
})

chrome.omnibox.onInputChanged.addListener(async function (text, suggest){


    if (text === "ALL"){
        window.open('allSongs.html')

    }
    
    let xd = await fetch(`http://localhost:3000/song/${text}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
  .then(response => response.json())
  .then(json => json)

  //console.log(Object.keys(xd).length === 0)
    for (track in xd){
        suggest([{content: xd[track].Track_Name + " " + xd[track].Artist_Name, description: xd[track].Track_Name}])
    }
})

chrome.omnibox.onInputEntered.addListener(async function(text, disposition){

    if(admin === user.toString()){
        if (text.slice(0,10)==="deletesong"){
            deleteSong(text.slice(11,100))
            return
        }
    
        if (text.slice(0,10)==="deleteuser"){
            deleteUser(text.slice(11,100))
            return
        }
    }


    let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=AIzaSyDFuf10lVl7UUl-cQxv3PfON18Q1xZcoI8`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }})
        .then(response => response.json())
        .then(json => json)
        console.log(myResponse)

    let getSong = await fetch(`http://localhost:3000/song/${myResponse.items[0].id.videoId}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }})
        .then(response => response.json())
        .then(json => json)
    
    if (getSong.length === 0){
        addSong(
            myResponse.items[0].snippet.title,
            myResponse.items[0].snippet.title,
            myResponse.items[0].snippet.channelTitle,
            myResponse.items[0].id.videoId,
            "",
            ""
            )
    }
    //console.log("song exists in the database")
    await sendYoutubeLink(myResponse.items[0].id.videoId)
})

async function sendYoutubeLink(message, songExist){
    chrome.runtime.sendMessage({
        msg: message
    });
}

async function addSong(track_name,album_name,artist_name,song_id,song_status,song_img){
    //console.log("song doesn't exist in the database")

    await fetch(`http://localhost:3000/addSong`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "Track_Name": track_name,
            "Album_Name": album_name,
            "Artist_Name": artist_name,
            "Song_ID": song_id,
            "Song_Status": song_status,
            "Song_Img": song_img
        })
    })
}

async function deleteSong(song_id){
    console.log(song_id)
}

async function deleteUser(user_id){
    console.log(user_id)
    await fetch(`http://localhost:3000/users/${user_id}`, {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json"
        }
    })
}