const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const nodemailer = require("nodemailer")
const smtp_pool = require("nodemailer-smtp-pool") 
const body_parser = require("body-parser") 

app.listen(process.env.PORT || 3000, ()=>{console.log("http://localhost:"+3000)})

app.use(cors())
app.use(body_parser.json())


const personnes = [
    {
        name : "Alfred",
        email : "fna.dev.app@gmail.com"
    }
]
app.get("/", (req,res)=>{res.json({message:"Hallo fred", personnes})})
function Rint(max){
    return Math.floor(Math.random()* max)
}
const transporter = nodemailer.createTransport(smtp_pool({
    host : "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls:
    {
        rejectUnauthorized : false,
    },
    auth:
    {
        user: "alfredmushagalusa@outlook.com",
        pass : process.env.PASSWORT
    }
}))
console.log(process.env.PORT)
app.post("/mailer", (req, res)=>{
    let name = req.body.name
    let email = req.body.mail
    const option =
    {
        from : "alfredmushagalusa@outlook.com",
        to : email, 
        subject : "confirmation",
        text : "Votre code de confimation est "+ Rint(10) + "" + Rint(9) + "" + Rint(10) + "" + Rint(10) + "" + Rint(10) + "" + Rint(10)    
    }
    transporter.sendMail(option, (err, info)=>{
        if(err){console.log(err)}
        else{console.log("email envoyer"+ info.response)}
    })
    res.send("Bonjour "+name+" un code à 6 chiffres vous a été envoyer à "+ email )
 
})
