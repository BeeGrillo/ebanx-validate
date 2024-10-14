import express from 'express'; 'express'
import {runEvent, getBalance, resetAccounts} from './src/controller/accountController.js'

const app = express()
const PORT = 3000;

app.post('/reset', resetAccounts)
app.get('/balance', getBalance)
app.post('/event', runEvent)

app.listen(PORT)

console.log("Server running in port: ", PORT)