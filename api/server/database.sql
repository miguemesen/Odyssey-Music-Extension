CREATE DATABASE IF NOT EXISTS MUSIC_DATABASE;
USE MUSIC_DATABASE;

CREATE TABLE IF NOT EXISTS users(
    id LONG NOT NULL,
    email CHAR(128) NOT NULL
);



CREATE TABLE IF NOT EXISTS songs(
    Track_Name char(128) NOT NULL,
    Album_Name char(128),
    Artist_Name char(128) NOT NULL,
    Song_ID char(32),
    Song_Status char(32),
    Song_Img char(255)
);



CREATE PROCEDURE get_users()
    BEGIN
        SELECT  * FROM users;
    END;

CREATE PROCEDURE get_user(user_id LONG)
    BEGIN
        SELECT *
        FROM users
        WHERE id REGEXP user_id;
    end;

CREATE PROCEDURE add_user(new_id LONG, new_email char(64))
    BEGIN
        INSERT INTO users (id,email) VALUES (new_id,new_email);
    END;
CREATE PROCEDURE delete_user(id_ LONG)
    BEGIN
        DELETE FROM users WHERE id=id_;
    END;

CREATE PROCEDURE delete_song(song_id_ char(32))
    BEGIN
        DELETE FROM songs
        WHERE Song_ID regexp song_id_;
    end;




CREATE PROCEDURE get_songs()
    BEGIN
        SELECT * FROM songs;
    END;

CREATE PROCEDURE add_song(_track_name char(128), _album_name char(128), _artist_name char(128), _song_id char(32), _song_status char(32), _song_img char(255))
    BEGIN
        INSERT INTO songs (Track_Name, Album_Name, Artist_Name, Song_ID, Song_Status, Song_Img) VALUES (_track_name,_album_name,_artist_name,_song_id,_song_status,_song_img);
    end;


CREATE PROCEDURE get_song(song_stuff char(128))
    BEGIN
        SELECT *
        FROM songs
        WHERE Track_Name REGEXP song_stuff OR Artist_Name REGEXP song_stuff OR Album_Name REGEXP song_stuff OR Song_ID REGEXP song_stuff;
    END;



select * from songs
