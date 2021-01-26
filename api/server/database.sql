CREATE DATABASE IF NOT EXISTS MUSIC_DATABASE;
USE MUSIC_DATABASE;

CREATE TABLE IF NOT EXISTS users(
    id LONG NOT NULL,
    email CHAR(128) NOT NULL
);
CREATE TABLE IF NOT EXISTS songs(
    Track_Name char(128) NOT NULL,
    Album_Name char(128) NOT NULL,
    Artist_Name char(128) NOT NULL

);

CREATE PROCEDURE get_users()
    BEGIN
        SELECT  * FROM users;
    END;

CREATE PROCEDURE add_user(new_id INTEGER, new_email char(64))
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
CREATE PROCEDURE get_song(song_stuff char(128))
    BEGIN
        SELECT *
        FROM songs
        WHERE Track_Name REGEXP song_stuff OR Artist_Name REGEXP song_stuff OR Album_Name REGEXP song_stuff;
    END;

