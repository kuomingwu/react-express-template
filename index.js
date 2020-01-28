require('dotenv').config()
import express from 'express'
import cors from 'cors'
import path from 'path';
import bodyParser  from 'body-parser';
import helmet from 'helmet';
import { serverPort , debugMode } from './serverConfig';
require('express-group-routes');
const session = require('express-session');
const app = express();
app.use(express.static('src'));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
if(process.env.DEBUG_MODE == 'true'){
	app.use(cors());
}else{
	
	app.use(helmet());
}
app.set('trust proxy', 1) // trust first proxy



app.group('/hello' , (router)=>{
	
	router.get('/world' , async(req , res , next)=>{
		
		res.send("helloworld !") ; 
		
	})
	
	
})

app.group('/' , (router)=>{
	
	router.get('*' , (req , res , next)=>{
		
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
		
	})
	
})

app.listen(process.env.SERVER_PORT, function () {
	console.log(`Example app listening on port ${process.env.SERVER_PORT}!`);
});