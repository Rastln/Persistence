const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

app.use(bodyParser.json())

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'pgdb',
  host: 'localhost',
  database: 'pgdb',
  password: '123',
  port: 5432,
})

let students = []

app.get('/students', (req, res) => {
  const search = req.query.search
  if (search) {
    console.log('GET /students?search=' + search)
    pool.query(`SELECT * FROM student WHERE LOWER(name) LIKE LOWER(${search})`, (err, res) => {
      if (err) {
        throw err
      }
      res.status(200).json(res.rows)
    })
  } else {
    console.log('GET /students')
    pool.query('SELECT * FROM student ORDER BY student_id ASC', (err, res) => {
      if (err) {
        throw err
      }
      res.status(200).json(res.rows)
    })
  }
})

app.get('/students/:studentId', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10)
  console.log('GET /students/' + studentId)
  pool.query(`SELECT * FROM student WHERE student_id = ${studentId}`, (err, res) => {
    if (err) {
      throw err
    }
    res.status(200).json(res.rows)
  })
})

app.get('/grades/:studentId', (req, res) => {
  const studentId = parseInt(req.params.studentId, 10)
  console.log('GET /grades/' + studentId)
  pool.query(`SELECT * FROM grade WHERE student_id = ${studentID}`, (err, res) => {
    if (err) {
      throw err
    }
    res.status(200).json(res.rows)
  })
})

app.post('/grades', (req, res) => {
  const studentId = parseInt(req.body.studentId, 10)
  const grade = parseInt(req.body.grade, 10)
  console.log('POST /grades {studentId:' + studentId + ', grade:' + grade + '}')
  if (!Number.isInteger(studentId) || !Number.isInteger(grade)) {
    res.status(400).send('studentId or grade not defined')
  } else {
    pool.query(`INSERT INTO grade (student_id, grade) VALUES(${studentId}, ${grade})`, (err, res) => {
      if (err) {
        throw err
      }
      res.send({success:true})
    })
  }
})

app.post('/register', (req, res) => {
  const name = req.body.name
  console.log('post /register {name:' + name + '}')
  if (!name) {
    res.status(404).send('name not defined')
  }
  pool.query(`INSERT INTO student (name) VALUES(${name}`, (err, res) => {
    if (err) {
      throw err
    }
    res.send({success:true})
  })
})