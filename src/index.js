import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';
// const swaggerDocument = require('../docs/swagger.json');
import swaggerDocument from '../docs/swagger.json'

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Documentation for book store application',
//       description: 'This is the backend project developed in express using mongodb'
//     },
//     server: {
//       api: `${process.env.SERVER}`
//     }
//   },
//   apis: ['./index.js`']
// }

// const specs = swaggerJSDoc(options);

import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';
import bookRoute from './routes/books.route';
import userRoute from './routes/user.route';
import { _definition } from '@hapi/joi/lib/base';

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(cors({ origin: 'http://localhost:8081' })); // React Native packager URL

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

database();

app.use(`/api/${api_version}`, bookRoute);
app.use(`/api/${api_version}`, userRoute);
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

export default app;
