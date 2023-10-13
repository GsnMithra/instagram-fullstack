const mongoose = require ('mongoose')
const creds = require ('../creds')

mongoose.connect (creds.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .once ('open', () => console.log ('Atlas connected!'))
    .on ('error', (e) => console.log (e))