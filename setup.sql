
BEGIN WORK;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS grade;

CREATE TABLE student (
  student_id SMALLSERIAL,
  name VARCHAR(30),
  PRIMARY KEY (student_id)
);

CREATE TABLE grade (
  grade_id SMALLSERIAL,
  student_id SMALLINT,
  grade SMALLINT,
  PRIMARY KEY (grade_id),
  FOREIGN KEY (student_id) REFERENCES student (student_id)
);

INSERT INTO student (name) VALUES ('Brandon');
INSERT INTO student (name) VALUES ('Jeff');
INSERT INTO student (name) VALUES ('Chris');
INSERT INTO student (name) VALUES ('Kana');

INSERT INTO grade (student_id, grade) VALUES (1, 95);
INSERT INTO grade (student_id, grade) VALUES (1, 87);
INSERT INTO grade (student_id, grade) VALUES (2, 83);
INSERT INTO grade (student_id, grade) VALUES (2, 93);
INSERT INTO grade (student_id, grade) VALUES (2, 107);
INSERT INTO grade (student_id, grade) VALUES (3, 67);
COMMIT WORK;