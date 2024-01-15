import express from 'express';
import  ConnectDB from './config/db';
import bodyParser from 'body-parser'

// Mids
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })) // set maximum size to 50mb
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json());

//imports Routes
import users from './Routes/users/users.routes'

//Port 
const PORT = 5000;

//data connection
ConnectDB();


///middleware
app.use(morgan('dev'));


//Routes Middleware
app.use('/api/v1/users',users);


app.get('/',(req,res,next) => {
    res.status(200).json({
        'message': 'Running Node with Express and Typescript'
    });
});

app.listen(PORT, () => {
    console.log(
        `Server running on ${PORT}.`
    )
});