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
        //console.log("song doesn't exist in the database")

        await fetch(`http://localhost:3000/addSong`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "Track_Name": myResponse.items[0].snippet.title,
                "Album_Name": "",
                "Artist_Name": myResponse.items[0].snippet.channelTitle,
                "Song_ID": myResponse.items[0].id.videoId,
                "Song_Status": "",
                "Song_Img": ""
            })
        })
    }
    //console.log("song exists in the database")
    await sendYoutubeLink(myResponse.items[0].id.videoId)
})

async function sendYoutubeLink(message, songExist){
    chrome.runtime.sendMessage({
        msg: message
    });
}

