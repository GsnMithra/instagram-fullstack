const express = require ('express')
const cors = require ('cors')
const db = require ('./database/schema')
const bcrypt = require ('bcrypt')
const salt = require ('./creds')
const saltRounds = salt.SALT_ROUNDS

require ('./database/database')

const app = express ()
app.use (cors ())
app.use (express.json ())
app.use (express.urlencoded ({ extended: false }))

app.post ('/register', (req, res) => {
    async function createUser (body) {
        let { mailornum, fullname, username, password, dateofbirth } = body
        fullname = fullname.toLowerCase ().split (' ').map (word => word.charAt (0).toUpperCase () + word.slice (1)).join (' ')
        
        let response = {
            exists: false,
            email: false
        }

        const userSearch = await db.findOne ({ username: username })
        const emailSearch = await db.findOne ({ emailphone: mailornum })
        if (userSearch || emailSearch) {
            response.email = (emailSearch) ? true : false
            response.exists = (userSearch) ? true : false
        } else {
            bcrypt
                .hash (password, saltRounds)
                .then (hash => {
                    const newUser = new db ({
                        emailphone: mailornum,
                        fullname: fullname,
                        username: username,
                        dateofbirth: dateofbirth,
                        password: hash
                    })
        
                    newUser.save ()
                        .then ((savedUser) => {})
                        .catch ((e) => {
                            console.error (e);
                        })
                })
        }

        res.send (response)
    }

    createUser (req.body)
})

app.post ('/login', (req, res) => {
    async function loginUser (body) {
        const { username, password } = body
        let response = {
            exists: true,
            credentials: false
        }

        const user = await db.findOne ({ username: username })
        if (user) {
            bcrypt.compare (password, user.password, (err, result) => {
                if (err) {
                    console.error (err);
                } else {
                    response.credentials = result;
                    res.send (response);
                }
            });
        } else {
            response.exists = false
            res.send (response)
        }
    }

    loginUser (req.body);
})

const PORT = 4000
app.listen (PORT, () => {
    console.log (`Server running on port: ${PORT}`)
})