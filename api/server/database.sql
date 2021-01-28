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

CREATE PROCEDURE add_user(new_id LONG, new_email char(64))
    BEGIN
        INSERT INTO users (id,email) VALUES (new_id,new_email);
    END;
CREATE PROCEDURE delete_user(id_ INTEGER)
    BEGIN
        DELETE FROM users WHERE id=id_;
    END;
CREATE PROCEDURE get_songs()
    BEGIN
        SELECT * FROM songs;
    END;

CREATE PROCEDURE add_song(_track_name char(128), _album_name char(128), _artist_name char(128), _song_id char(32), _song_status char(32), _song_img char(255))
    BEGIN
        INSERT INTO songs (Track_Name, Album_Name, Artist_Name, Song_ID, Song_Status, Song_Img) VALUES (_track_name,_album_name,_artist_name,_song_id,_song_status,_song_img);
    end;



CREATE PROCEDURE get_song_reverse(song_stuff char(128))
    BEGIN
        SELECT *
        FROM songs
        WHERE song_stuff REGEXP songs.Artist_Name OR song_stuff REGEXP songs.Track_Name OR song_stuff REGEXP songs.Album_Name;
    end;



CREATE PROCEDURE get_song(song_stuff char(128))
    BEGIN
        SELECT *
        FROM songs
        WHERE Track_Name REGEXP song_stuff OR Artist_Name REGEXP song_stuff OR Album_Name REGEXP song_stuff;
    END;

select * from songs