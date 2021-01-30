const assert = require('assert');
const mySql = require("mysql2/promise");



const DB_HOST = process.env.DB_HOST || "127.0.0.1";
const DB_USER = process.env.DB_USER || "root";
const DB_DATABASE = process.env.DB_DATABASE || "MUSIC_DATABASE";
const DB_PASSWORD = process.env.DB_PASSWORD;
assert(
  DB_PASSWORD !== undefined,
  "Provide the database password in DB_PASSWORD"
);


class mysql_server {

    async initConnection() {
        return mySql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
          });
    }


    async get_users(){
        this.mySql_connection = await this.initConnection();
        const [users] = await  this.mySql_connection.execute('CALL MUSIC_DATABASE.get_users()');
        this.mySql_connection.end();
      
        return users; 
    }

    async get_user_id(id){

    }


    async user_verification(id){
      let users = await (this.get_users());
      users = users[0];
      
      if ( users.length === 0){
        return false;
      }

      for(let i=0; i<users.length; i++)
      {
        const user_id = users[i].id; 
        if(id == user_id) {
          return true;
        }
      }

      return false; 
    }

    async add_user(id, email){
      this.mySql_connection = await this.initConnection();
      await this.mySql_connection.query('CALL MUSIC_DATABASE.add_user(?,?)', [id, email]);
      this.mySql_connection.end();
    }

    async add_song(Track_Name, Album_Name, Artist_Name, Song_ID, Song_Status, Song_Img){
      console.log()
      this.mySql_connection = await this.initConnection();
      await this.mySql_connection.query('CALL MUSIC_DATABASE.add_song(?,?,?,?,?,?)', [Track_Name, Album_Name, Artist_Name, Song_ID, Song_Status, Song_Img]);
      this.mySql_connection.end();
    }


    async delete_user(id){

      this.mySql_connection = await this.initConnection();
      await this.mySql_connection.query('CALL MUSIC_DATABASE.delete_user(?)', id);
      this.mySql_connection.end();
    }

    async delete_song(song_id){

      this.mySql_connection = await this.initConnection();
      await this.mySql_connection.query('CALL MUSIC_DATABASE.delete_song(?)', song_id);
      this.mySql_connection.end();
    }

    async get_songs(){

      this.mySql_connection = await this.initConnection();
      const [songs] = await this.mySql_connection.execute("CALL MUSIC_DATABASE.get_songs()");
      this.mySql_connection.end();

      return songs;
    }

    async get_song(song_name){
      this.mySql_connection = await this.initConnection();
      const [song] = await this.mySql_connection.execute("CALL MUSIC_DATABASE.get_song(?)",[song_name]);
      this.mySql_connection.end();

      return song[0];
    }



    async get_prueba(song_name){
      try{
      this.mySql_connection = await this.initConnection();
      const [song] = await this.mySql_connection.execute("CALL MUSIC_DATABASE.get_song_reverse(?)",[song_name]);
      this.mySql_connection.end();

      return song[0];
      } catch(e){
        console.log(e)
      }
    }

}





module.exports.mysql_server = mysql_server;