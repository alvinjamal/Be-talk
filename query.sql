-- Active: 1673703055127@@127.0.0.1@2311@socket
CREATE TABLE users(
    id_user VARCHAR NOT NULL PRIMARY KEY, 
    name_user VARCHAR NOT NULL, 
    email TEXT NOT NULL,  
    password TEXT NOT NULL, 
    photo VARCHAR,
    username VARCHAR,
    bio VARCHAR,
    phone VARCHAR,
    verif VARCHAR(1), 
    otp VARCHAR(6)
    );

    CREATE TABLE chat(
        id_chat INT,
        receiver_id VARCHAR,
        sender_id VARCHAR,
        message VARCHAR,
        created_at TIMESTAMP
    );

    DROP TABLE users;
    DROP TABLE chat; 



    