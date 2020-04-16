const express = require('express')
const ejs = require('ejs')
 const { db } = require('./models/todos')
 const methodOverride = require('method-override')
 const port = process.env.PORT||1992


const app = express()
const todoRoute = require('./routes/todos')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine","ejs");
app.use(express.static("public"))
app.use(methodOverride('_method'))
app.use('/todos',todoRoute)

db.sync().then(() => {
    app.listen(port)
}).catch((err) => {
    console.error(err)
})
