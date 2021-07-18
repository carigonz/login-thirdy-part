import bodyParser from 'body-parser';
import express from 'express';
import errorhandler from 'errorhandler';
import cors from 'cors';
import routes from './api';

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


app.use('/', routes);

app.use(errorhandler())

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

