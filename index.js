
const express = require('express')
const app = express()
const PORT = 3000;

app.get('/reset', ()=>{})
app.get('/balance', ()=>{})
app.post('/event', ()=>{})

app.listen(PORT)

console.log("Server running in port: ", PORT)