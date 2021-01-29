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

//     console.log()
    

//     let someResponse = await fetch(`http://localhost:3000/song_reverse/${text}`, {
//         method: 'GET',
//         headers: {
//             "Content-type": "application/json"
//         }
//     })
//   .then(response => response.json())
//   .then(json => json)
//   console.log(Object.keys(someResponse).length === 0)

    let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=AIzaSyDFuf10lVl7UUl-cQxv3PfON18Q1xZcoI8`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
    }})
      .then(response => response.json())
      .then(json => json)
  await sendYoutubeLink(myResponse.items[0].id.videoId)
})

async function sendYoutubeLink(message){
    chrome.runtime.sendMessage({
        msg: message
    });
}

