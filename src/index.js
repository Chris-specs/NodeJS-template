import app from './app'
import dbConnect from './db/database'

// CONNECT TO DATABASE
dbConnect()

// APP START
app.listen(4000, () => console.log('Server listening port 4000'))