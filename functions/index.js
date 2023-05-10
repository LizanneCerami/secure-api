import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { login, signup } from './src/users.js'
import { validToken, isAdmin } from './src/middelware.js'

const app = express()

app.use(cors({ origin: [
  'http://localhost',
  'https://bocacode.com'
] })) // allow only these websites or urls to talk to this API

// let's set up our unprotected routes

app.post('/login', login)
app.post('/signup', signup)

// now we set up protected routes

app.get('/secretinfo', validToken, (req, res) => res.send({message: " You're in! "}))
app.get('/supersecretinfo', validToken, isAdmin, (req, res) => res.send({message: " You're in here too! "}))



//... 

app.listen(3030, () => console.log('Listening on port 3030...')) // for testing

export const api = functions.https.onRequest(app) // for deploying