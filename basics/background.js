chrome.identity.getProfileUserInfo( async function(info) { 
    email = info.email; 
    user = info.id;
    console.log(email)
    console.log(user)
    let idExist = await fetch(`http://localhost:3000/users/exist/${user}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
    }})
    .then(response => response.json())
    .then(json => json)

    if (idExist.user_exist === true){
        console.log("hola desde aqui xd")
        return;
    }

    await fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "id": user,
            "email": email
        })
    })
    
});



chrome.omnibox.onInputChanged.addListener(async function (text, suggest){
    let xd = await fetch(`http://localhost:3000/song/${text}`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json"
}})
  .then(response => response.json())
  .then(json => json)
    for (track in xd){
        suggest([{content: xd[track].Track_Name + " " + xd[track].Artist_Name, description: xd[track].Track_Name}])
    }
})

chrome.omnibox.onInputEntered.addListener(async function(text, disposition){
    let myResponse = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${text}&key=AIzaSyB61Hqd0S1jfbqMuuFHMU8ojp3O8gEry9k`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
    }})
      .then(response => response.json())
      .then(json => json)
      console.log(myResponse.items[0].id.videoId)
      sendYoutubeLink(myResponse.items[0].id.videoId)
})

function sendYoutubeLink(message){
    chrome.runtime.sendMessage({
        msg: message
    });
}