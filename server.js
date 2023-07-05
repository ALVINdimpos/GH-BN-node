import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/index.js';
import dbConnect from './utils/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || 'localhost';

const corOptions = {
  origin: ['*'],
}

// connect to db
dbConnect();

app.use(express.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corOptions));
app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
