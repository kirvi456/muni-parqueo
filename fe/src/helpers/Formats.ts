export const formatNumber = (no : number) : string => {
    const stringNumber : string = no.toString();
    const lengthNumber : number = stringNumber.length;
    let result : string = 'No. ';

    for(let i = lengthNumber; i < 7; i++){
        result += '0';
    }

    return result + stringNumber;
}

export const addCerosNumber = ( n : number ) : string => {
    if( n < 10 ) return '0' + n;
    return '' + n;
}

export const getFecha = ( n : number ) : string => {
    const date = new Date(n);

    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();

    const diaStr = addCerosNumber(dia);
    const mesStr = addCerosNumber(mes);
    const anioStr = addCerosNumber(anio);

    return `${diaStr}/${mesStr}/${anioStr}` 
}

export const getHora = ( n : number ) : string => {
    const date = new Date(n);

    const horas = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();

    const horasStr = addCerosNumber(horas);
    const minutosStr = addCerosNumber(minutos);
    const segundosStr = addCerosNumber(segundos);

    return `${horasStr}:${minutosStr}:${segundosStr}` 
}