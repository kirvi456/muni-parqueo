import { Schema, model } from 'mongoose';

export interface Ticket {
    no: number;
    placa: string;
    fechaEntrada: number;
    fechaSalida: number;
    estado: boolean; 
    valor: number;
}

const TicketSchema = new Schema({
    no: {
        type: Number,
        required: true,
        unique: true
    },
    placa: {
        type: String,
        required: [true, 'La placa es obligatoria']
    },
    fechaEntrada: {
        type: Number,
        required: [true, 'Es necesario especificar la hora de entrada'],
    },
    fechaSalida: {
        type: Number,
        required: true,
        default: 0
    },
    estado: {
        type: Boolean,
        required: true,
        default: true
    },
    valor: {
        type: Number,
        required: true,
        default: 0
    }
})

TicketSchema.methods.toJSON = function() {
    const {__v, _id, estado, ...ticket} = this.toObject();
    return ticket;
}

export default model('Ticket', TicketSchema);