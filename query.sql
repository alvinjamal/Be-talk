CREATE TABLE users(
    id_user VARCHAR NOT NULL PRIMARY KEY, 
    fullname_user VARCHAR NOT NULL, 
    email TEXT NOT NULL,  
    password TEXT NOT NULL, 
    verif VARCHAR(1), 
    otp VARCHAR(6)
    );

    DROP TABLE users;

    