import { Request, Response } from 'express';
import { getErrorMessage } from '../helpers/error-messages';
import Ticket from '../models/ticket';
import { addCounterTickets, getTicketNo } from '../helpers/couter';
import { getPagos } from '../helpers/pagos';

export const crearTicket = async(req : Request, res: Response) => {

  try {
    const { placa } = req.body;

    if( !placa ){
        return res.status( 400 ).json({
          msg: '[ERROR]: Es necesario el número de placa'
        })
    }

    const no = getTicketNo() + 1;

    const ticket = new Ticket({
      no,
      placa,
      fechaEntrada: (new Date()).getTime()
    });

    await ticket.save();

    addCounterTickets();

    res.json(ticket)
      

  } catch( error ){
    console.log( error );
    res.status( 500 ).json({
      msg: `[ERROR]: ${getErrorMessage(error)}`
    })
  }
}

export const marcarSalida = async(req : Request, res: Response) => {

  try {
    const { no } = req.params;

    if( !no ){
        return res.status( 400 ).json({
          msg: '[ERROR]: Es necesario el numero del ticket'
        })
    }

    if( !parseInt( no ) ){
      return res.status( 400 ).json({
        msg: '[ERROR]: No es un numero valido'
      })
    }

    const ticketAux = await Ticket.findOne({no});

    if( !ticketAux ){
      return res.status( 400 ).json({
        msg: '[ERROR]: El ticket no existe'
      })
    }

    if( !ticketAux.estado ){
      return res.status( 400 ).json({
        msg: '[ERROR]: El ticket fue anulado'
      })
    }
    
    const fechaEntrada = ticketAux.fechaEntrada;
    const fechaSalida = (new Date()).getTime();

    const totales = getPagos(fechaEntrada, fechaSalida);


    const ticket = await Ticket.findOneAndUpdate(
      { no }, 
      { fechaSalida , valor : totales.costo }, 
      { new: true }
    );



    res.json({ticket, totales});

  } catch( error ){
    console.log( error );
    res.status( 500 ).json({
      msg: `[ERROR]: ${getErrorMessage(error)}`
    })
  }
}


export const obtenerTickets = async(req : Request, res : Response) => {
  
  try {

    const { limit = 20 } = req.query;
    const { placa } = req.params;
    

    const tickets = await Ticket.find({ placa , estado : true }).sort({no: -1}).limit( Number(limit) );

    res.json(tickets);

  } catch ( error ){
    console.log( error );
    res.status( 500 ).json({
      msg: `[ERROR]: ${getErrorMessage(error)}`
    })
  }

}

export const anularTicket = async(req : Request, res : Response) => {
  try {
    const { no } = req.params;

    if( !no ){
        return res.status( 400 ).json({
          msg: '[ERROR]: Es necesario el numero del ticket'
        })
    }

    if( !parseInt( no ) ){
      return res.status( 400 ).json({
        msg: '[ERROR]: No es un numero valido'
      })
    }

    const ticketAux = await Ticket.findOne({no});

    if( !ticketAux ){
      return res.status( 400 ).json({
        msg: '[ERROR]: El ticket no existe'
      })
    }

    const ticket = await Ticket.findOneAndUpdate(
      { no }, 
      { estado: false }
    );

    res.json({ticket});

  } catch( error ){
    console.log( error );
    res.status( 500 ).json({
      msg: `[ERROR]: ${getErrorMessage(error)}`
    })
  }
}