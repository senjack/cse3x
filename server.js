// 1. Import Dependencies
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require("cors");


// 2. Import Configurations
const {mongoUri, PORT} = require('./config');


// 3. Import Routes:
const studentRoutes = require('./routes/students')


// 4. Create a Database connection using the mongoose Library
mongoose
    .connect(mongoUri)
    .then(()=>{console.log('Database Connection was successful...');})
    .catch((err)=>{console.log(err);})


// 5. Create a Web server application instance using the Express library
const app = express();


// 6. Set middlewares for the application
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())


// 7. Set entry points for the REST routes created for the different Collections.
app.use('/api/students', studentRoutes);

// Prepare for Production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('views/dist'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'views', 'dist', 'index.html'))
    })
}


// 8. Configure the web server application to listen to requests.
app.listen(PORT, ()=>{console.log(`App listening at http://localhost:${PORT}`);});


// app.get(route, callback(request, response))
// app.listen(PORT, callback)

// Create a basic get route (Index)
// app.get('',(req, res)=>{
//     console.log(req.body);
//     res.send('Welcome to the Information Management System');
// });
