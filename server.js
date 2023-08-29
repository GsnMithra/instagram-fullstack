const express = require ('express')
const cors = require ('cors')
const db = require ('./database/schema')

require ('./database/database')
const app = express ()
app.use (cors ())
app.use (express.json ());
app.use (express.urlencoded ({ extended: false }));

app.post ('/register', (req, res) => {
    console.log ('hello')
})

app.post ('/login', (req, res) => {
    async function loginUser (body)  {
        const { username, password } = body
        const user = await db.findOne ({ username: username })
        let response = {
            exists: true,
            credentials: false
        }

        if (user != null) {
            response.credentials = (user.password === password) ? true : false;
        } else 
            response.exists = false
        
        res.send (response)
    }

    loginUser (req.body);
})

const PORT = 4000
app.listen (PORT, () => {
    console.log (`Server running on port: ${PORT}`);
})