CREATE DATABASE IF NOT EXISTS MUSIC_DATABASE;

USE MUSIC_DATABASE;
SET GLOBAL log_bin_trust_function_creators = 1;


CREATE TABLE IF NOT EXISTS users (

    id INTEGER NOT NULL
);


CREATE TABLE IF NOT EXISTS songs (

    id INTEGER NOT NULL,
    song_name char(32) NOT NULL,
    artist char(32) NOT NULL,
    album char(32)

);


CREATE FUNCTION add_user(new_id INTEGER)
    RETURNS BOOL
    BEGIN

        DECLARE ID INTEGER;
        SELECT id INTO ID FROM users WHERE id=new_id;

        IF (ID IS NULL)
            THEN INSERT INTO users (id) VALUES (new_id);

        END IF;

        RETURN 1;
    END;


CREATE PROCEDURE get_users()
    BEGIN
        SELECT  * FROM users;
    END;


CREATE PROCEDURE add_user(new_id INTEGER)
    BEGIN
        INSERT INTO users (id) VALUES (new_id);
    END;


CREATE PROCEDURE delete_user(id_ INTEGER)
    BEGIN

        DELETE FROM users WHERE id=id_;

    END;


CREATE PROCEDURE add_song(id_ INTEGER, song_name_ CHAR(32), artist_ CHAR(32), album_ CHAR(32))
    BEGIN

        INSERT INTO songs (id, song_name, artist, album) VALUES (id_, song_name_, artist_, album_);
    END;


CREATE PROCEDURE get_songs()
    BEGIN

        SELECT * FROM songs;

    END;

