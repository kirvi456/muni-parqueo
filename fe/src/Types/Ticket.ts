export type Ticket = {
    no: number;
    placa: string;
    fechaEntrada: number;
    fechaSalida: number;
    estado?: boolean; 
    valor: number;
};

export type PagoType = {
    horas : number,
    minutos : number,
    segundos : number,
    costo : number
};