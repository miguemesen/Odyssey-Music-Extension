const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const mysql_server = new (require('./mysql_server').mysql_server)();



app.get("/users", async (request, response)=>{


    const users = await mysql_server.get_users();
    response.status(200).send(users[0]);


})



/**
 * Consulta la lista de usuarios buscando alguno cuyo ID haga match con el parámetro.
 */
app.get('/users/:id', async (request, response)=>{


})




/**
 * Retorna true o false para indicar si un usuario existe o no en la base de datos.
 */

app.get('/users/exist/:id', async (request, response)=>{

    const id = request.params.id;
    const user_exist = await mysql_server.user_verification(id);
    response.status(200).json({user_exist});

})



/**
 * Registra un nuevo usuario en la base de datos. El detalle del cuerpo del request queda a criterio de los estudiantes.
 */
app.post('/users', async (request, response)=>{

    const id = request.body.id; 
    const email = request.body.email;
    await mysql_server.add_user(id, email);
    response.status(200).send('User added');
})


app.post('/addSong', async (request, response)=>{
    const track_name = request.body.Track_Name; 
    const album_name = request.body.Album_Name;
    const artist_name = request.body.Artist_Name;
    const song_id = request.body.Song_ID;
    const song_status = request.body.Song_Status;
    const song_img = request.body.Song_Img;
    console.log("esto es song img:")
    console.log(song_img)
    await mysql_server.add_song(track_name,album_name,artist_name,song_id,song_status,song_img);
    response.status(200).send('Song added');
})


/**
 * Elimina el usuario indicado por id de la base de datos. Requiere de un rol administrador.
 */
app.delete('/users/:id', async(request, response)=>{

    const id = request.params.id; 
    const user_exist = await mysql_server.user_verification(id);

    if(user_exist){
        await mysql_server.delete_user(id);
        response.status(200).send("User deleted");

    }

    response.status(404).send("User not found");

  
})




/**
 * Obtiene la lista de canciones
 */
app.get('/songs', async (request, response)=>{
    const songs = await mysql_server.get_songs();
    response.status(200).send(songs[0]);
})


app.get('/song/:name', async (request, response)=>{
    const song_name = request.params.name;
    const song = await mysql_server.get_song(song_name);
    response.status(200).send(song);
})

app.get('/song_reverse/:name', async (request, response)=>{
    const song_name = request.params.name;
    const song = await mysql_server.get_prueba(song_name);
    response.status(200).send(song);
})

/**
 * Elimina la cancion indicado por id de la base de datos. Requiere de un rol administrador.
 */
app.delete('/songs/:id', (request, response)=>{
  
})


/**
 * Busca las canciones según una consulta del usuario.
 */
app.get('/songs/search/:id', (request, response)=>{


})





app.listen(3000);

