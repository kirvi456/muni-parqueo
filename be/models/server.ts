import fs from 'fs'
import https from 'https'

import express, { Application } from 'express';
import cors from 'cors';

import dbConenction from '../db/mongo.config';


import ticketRoutes from '../routes/tickets.routes';


import { getTicketNo, initCounter } from '../helpers/couter';

class Server {
    
    private app: Application;
    private PORT : string;
    private paths = {
        tickets:           '/api/tickets'
    };

    constructor(){
        this.app = express();
        this.PORT = process.env.PORT || '3000';

        // Conectar con mi base de datos de mongo
        this.connectDB().then( async(ticketsCount) => {
            await initCounter();
            console.log('Tickets No:', getTicketNo());
        });

        // Establecer los middlewares globales
        this.middlewares();

        // Cargar las rutas
        this.routes();
    }

    async connectDB(){
        await dbConenction();
    }

    routes() {

        this.app.use(this.paths.tickets, ticketRoutes);
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del Body
        this.app.use( express.json() );

        
    }

    start() {
        this.app.listen(this.PORT, () => {
            console.log(`Servidor corriendo en puerto ${this.PORT}`)
        });
    }

    startHttps(){
        console.log(process.env.CERTIFICATE_KEY)
        // serve the API with signed certificate on 443 (SSL/HTTPS) port
        const httpsServer = https.createServer({
            key:  fs.readFileSync(process.env.CERTIFICATE_KEY || ''),
            cert: fs.readFileSync(process.env.CERTIFICATE || ''),
            //ca: fs.readFileSync(process.env.CERTIFICATE_CA || ''),
        }, this.app);

        httpsServer.listen(this.PORT, () => {
            console.log(`HTTPS Server corriendo en puerto ${this.PORT}`);
        });
    }

}

export default Server;
