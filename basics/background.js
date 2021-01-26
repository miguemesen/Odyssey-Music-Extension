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

    let someResponse = await fetch(`http://localhost:3000/song/${text}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
        }
    })
  .then(response => response.json())
  .then(json => json)
  console.log(someResponse)

    let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=AIzaSyB61Hqd0S1jfbqMuuFHMU8ojp3O8gEry9k`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
    }})
      .then(response => response.json())
      .then(json => json)
  await sendYoutubeLink(myResponse.items[0].id.videoId,Object.keys(someResponse).length === 0)
})

async function sendYoutubeLink(message, otherMsg){
    chrome.runtime.sendMessage({
        msg: message,
        exist: otherMsg
    });
}

