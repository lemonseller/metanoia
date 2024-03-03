DROP DATABASE IF EXISTS users;

DROP DATABASE IF EXISTS response;
DROP DATABASE IF EXISTS questions;


CREATE DATABASE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE DATABASE IF NOT EXISTS questions(
    question_id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
);

CREATE DATABASE IF NOT EXISTS response(
    id INT NOT NULL,
    question_id INT NOT NULL,
    response VARCHAR(500) NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (question_id, id, date),
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (id) REFERENCES users(id)
);


