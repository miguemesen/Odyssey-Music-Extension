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
    console.log(id);
    const user_exist = await mysql_server.user_verification(id);
    console.log(user_exist);
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
    console.log(song)
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

