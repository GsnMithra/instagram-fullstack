const express = require ('express')
const cors = require ('cors')
const db = require ('./database/schema')

require ('./database/database')
const app = express ()
app.use (cors ())
app.use (express.json ())
app.use (express.urlencoded ({ extended: false }))

app.post ('/register', (req, res) => {
    
    async function createUser (body) {
        const {mailornum, fullname, username, password} = body
        let response = {
            exists: false,
            email: false
        }

        const user_search = await db.findOne ({ username: username })
        const email_search = await db.findOne ({ emailphone: mailornum })

        if (user_search || email_search) {
            response.email = (email_search) ? true : false
            response.exists = (user_search) ? true : false
        } else {
            const newUser = new db ({
                emailphone: mailornum,
                fullname: fullname,
                username: username,
                password: password
            })

            newUser.save ()
                .then ((savedUser) => {
                    console.log ('user saved')
                })
                .catch ((e) => {
                    console.error (e);
                })
        }

        res.send (response)
    }

    createUser (req.body)
})

app.post ('/login', (req, res) => {
    async function loginUser (body)  {
        const { username, password } = body
        let response = {
            exists: true,
            credentials: false
        }

        const user = await db.findOne ({ username: username })
        if (user != null) { 
            if (user.username == username)
                response.credentials = (user.password === password) ? true : false
            else 
                response.exists = false
        } else 
            response.exists = false
        
        res.send (response)
    }

    loginUser (req.body);
})

const PORT = 4000
app.listen (PORT, () => {
    console.log (`Server running on port: ${PORT}`)
})