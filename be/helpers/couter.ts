import Ticket from '../models/ticket';

let ticketCounter = 0;

export const initCounter = async () => {
    await Ticket.find().countDocuments().then( counter => ticketCounter = counter);
}

export const getTicketNo = () : number => {
    try{
        return ticketCounter;
    } catch ( error ){
        console.log( error );
        return 0; 
    }
}

export const addCounterTickets = () => {
    ticketCounter += 1;
}