import Express from 'express';
import Mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as path from 'path';
import cors from 'cors';
import ErrorHandler from '../helper/errorHandler';
import swaggerUi from 'swagger-ui-express'
import { IpFilter } from 'express-ipfilter';
import swaggerDocument from '../common/swagger.json'

const app = new Express();
const root = path.normalize(`${__dirname}/../..`);

class ExpressServer {
    constructor() {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true,
        }));
        app.use(Express.static(`${root}/public/dist`));
        app.use(Express.static(`${root}/public`))
       
         app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.use(IpFilter(['::1', '::ffff:127.0.0.1', '127.0.0.1'], {mode: 'allow'}));

        app.use(cors({
            allowedHeaders: ['token', 'Content-Type'],
            exposedHeaders: ['token'],
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
        }));
        
         
    }
    router(routes) {
        routes(app);
        return this;
    }

    unhandledRequest() {
        const errorHandler = new ErrorHandler({
            shouldLog: true,
        });
        app.use(errorHandler.unhandledRequest());

        return this;
    }

    configureDb(dbUrl) {
        return new Promise((resolve, reject) => {
            Mongoose.connect(dbUrl, err => {
                if (err) {
                    console.log(`Error in mongodb connection ${err.message}`);
                    return reject(err);
                }
               //Mongoose.set('debug',true);
                console.log('Mongodb connection established');
                return resolve(this);
            });
        });
    }

    listen(port) {
        http.createServer(app).listen(port, () => {
            console.log(`magic-mind assignment  is running on  ${port}`);
        });
        return app;
    }
}

export default ExpressServer;

