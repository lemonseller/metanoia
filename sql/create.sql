DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS response CASCADE;
DROP TABLE IF EXISTS questions CASCADE;


CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS questions(
    question_id INT PRIMARY KEY,
    question VARCHAR(500) NOT NULL,
);

CREATE TABLE IF NOT EXISTS response(
    id INT NOT NULL,
    question_id INT NOT NULL,
    response VARCHAR(500) NOT NULL,
    date DATE NOT NULL,
    PRIMARY KEY (question_id, id, date),
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (id) REFERENCES users(id)
);


