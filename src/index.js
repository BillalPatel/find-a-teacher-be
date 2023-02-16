const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/', router)

const PORT = 3001

const dummyStudentData = [{}]

const dummyTeacherData = [
  {
    id: 9,
    title: 'Mr',
    price: 20,
    gender: 'male',
    emailAddress: 'billalpatelbill.bp@gmail.com',
    firstName: 'Billal',
    lastName: 'Patel',
    yearOfBirth: 1980,
    city: 'Birmingham',
    blurb:
      'Hi there! My name is Male One and I am an experienced English teacher from Birmingham, UK',
    experience: 'University',
    availability: 'Immediately',
    qualifications: [''],
    image:
      'https://w7.pngwing.com/pngs/552/173/png-transparent-captain-america-iron-man-spider-man-cartoon-chibi-captain-america-captain-america-illustration-comics-avengers-heroes.png',
    rating: {
      overall: 5,
      punctuality: 4,
    },
    password: 'hi',
  },
  {
    id: 1,
    title: 'Mr',
    price: 20,
    gender: 'male',
    emailAddress: 'notbillalpatel.bp@gmail.com',
    firstName: 'Male',
    lastName: ' One',
    yearOfBirth: 1980,
    city: 'Birmingham',
    blurb:
      'Hi there! My name is Male One and I am an experienced English teacher from Birmingham, UK',
    experience: 'University',
    availability: 'Immediately',
    qualifications: [''],
    image:
      'https://w7.pngwing.com/pngs/552/173/png-transparent-captain-america-iron-man-spider-man-cartoon-chibi-captain-america-captain-america-illustration-comics-avengers-heroes.png',
    rating: {
      overall: 5,
      punctuality: 4,
    },
    password: '',
  },
  {
    id: 2,
    title: 'Mr',
    price: 15,
    gender: 'male',
    emailAddress: 'billalpatel.bp@gmail.comm',
    firstName: 'Male',
    lastName: 'Two',
    yearOfBirth: 1985,
    city: 'Edinburgh',
    blurb:
      'Hey! My name is Male Two and I am an experienced French teacher from Edinburgh, UK',
    experience: 'None',
    availability: 'Immediately',
    qualifications: ['Certificate One,'],
    image:
      'https://w7.pngwing.com/pngs/404/103/png-transparent-iron-man-chibi-superhero-marvel-comics-iron-ironman-chibi-illustration-comics-electronics-avengers.png',
    rating: {
      overall: 4,
      punctuality: 3,
    },
    password: 'hhh',
  },
  {
    id: 3,
    title: 'Ms',
    price: 10,
    gender: 'female',
    emailAddress: 'billalpatel.bp@gmail.com',
    firstName: 'Female',
    lastName: 'One',
    yearOfBirth: 1990,
    city: 'London',
    blurb:
      'Hello. My name is Female Two and I am a qualified Arabic teacher from London, UK',
    experience: 'College',
    availability: 'Immediately',
    qualifications: ['Certificate Two'],
    image:
      'https://w7.pngwing.com/pngs/213/481/png-transparent-black-widow-iron-man-clint-barton-chibi-marvel-comics-black-widow-comics-avengers-superhero.png',
    rating: {
      overall: 1,
      punctuality: 1,
    },
    password: 'hhh',
  },
  {
    id: 4,
    title: 'Ms',
    price: 10,
    gender: 'female',
    emailAddress: 'itisnotbillalpatel.bp@gmail.com',
    firstName: 'Female',
    lastName: 'One',
    yearOfBirth: 1990,
    city: 'London',
    blurb:
      'Hello. My name is Female Two and I am a qualified Arabic teacher from London, UK',
    experience: 'College',
    availability: 'Immediately',
    qualifications: ['Certificate Two'],
    image:
      'https://w7.pngwing.com/pngs/213/481/png-transparent-black-widow-iron-man-clint-barton-chibi-marvel-comics-black-widow-comics-avengers-superhero.png',
    rating: {
      overall: 1,
      punctuality: 1,
    },
    password: 'hello',
  },
]

const dummyMessages = [
  {
    message: 'Hi there, I want a teacher for my child.',
    sender: '',
    recipient: 'Billal',
    status: '',
    date: '',
  },
]

app.get('/teachers', (req, res) => {
  res.status(200).send(JSON.stringify(dummyTeacherData))
})

app.get('/teacher', (req, res) => {
  res.status(200).send(JSON.stringify(dummyTeacherData))
})

app.post('/new/teacher', (req, res) => {
  dummyTeacherData.push(req.body)
  console.log('teacher data', req.body)
  res.status(201).json({ message: 'New teacher added successfully.' })
})

app.post('/new/student', (req, res) => {
  dummyStudentData.push(req.body)
  res.status(201).json({ message: 'New student added successfully.' })
})

app.post('/login/teacher', (req, res) => {
  const { emailAddress, password } = req.body

  if (!emailAddress || !password) {
    return res.status(400).json('Email address or password was not sent.')
  }

  if (true === false) {
    return res
      .status(400)
      .send({ message: 'Credentials did not match a user.' })
  }

  const correctUsers = []

  dummyTeacherData.forEach((teacher) => {
    if (
      teacher.emailAddress === emailAddress &&
      teacher.password === password
    ) {
      correctUsers.push(teacher)
    } else if (
      teacher.emailAddress !== emailAddress ||
      teacher.password !== password
    ) {
      return
    }
  })

  if (correctUsers.length > 0) {
    return res.json({ message: 'Logged in successfully.' })
  } else {
    return res
      .status(400)
      .json({ message: 'Credentials did not match a user.' })
  }
})

app.post('/teacher/message', (req, res) => {
  // console.log('req body', req.body.message.length)

  if (!req.body.message || req.body.message.length < 10) {
    return res.status(200).json({ message: 'Message was not sent correctly.' })
  }

  dummyMessages.push(req.body)
  console.log('dummyMessages', dummyMessages)
  return res.status(200).json({ message: 'Message sent successfully.' })
})

app.get('/teacher/messages', (req, res) => {
  console.log('req', req.query.teacherFirstName)
  dummyMessages.forEach((message) => {
    console.log('message.recipient', message.recipient)
    if (message.recipient === req.query.teacherFirstName) {
      console.log('here')
    }
  })
  return res.status(200).json({ messageData: 'Success' })
})

app.listen(PORT, () => console.log('Listening on port', PORT))
