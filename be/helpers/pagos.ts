
const tarifaPorHora = {
    0: 3, //domingo
    1: 2, //luners
    2: 2, //martes
    3: 2, //miercoles
    4: 2, //jueves
    5: 2, //viernes
    6: 3, //sabado
}

type PagoType = {
    horas : number,
    minutos : number,
    segundos : number,
    costo : number
};

export const getPagos = (fechaIni : number, fechaFin : number) : PagoType => {

    const miliResult = Math.floor( (fechaFin - fechaIni) / 1000 );

    let currentValue = miliResult;

    const horas = Math.floor( currentValue / 3600 );
    currentValue = currentValue % 3600;

    const minutos = Math.floor( currentValue / 60 );
    currentValue = currentValue % 60;

    const segundos = currentValue;

    const diaDelaSemana = (new Date()).getDay();

    const tarifaHoy = tarifaPorHora[diaDelaSemana as 1]; 
    const costo =  tarifaHoy * horas + ( minutos > 5 ? tarifaHoy : 0 );


    return {
        horas,
        minutos,
        segundos,
        costo
    };
}