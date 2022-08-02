import React, { useState, useEffect } from 'react';

export const useDate = () => {
    const [fecha, setFecha] = useState<Date>(new Date());

    useEffect(() => {
        setTimeout(() => {setFecha(new Date())}, 1000);
    }, [fecha]);
    

    const getCurrentDate = () : string => {
        const dia = fecha.getDate();
        const mes = fecha.getMonth() + 1;
        const anio = fecha.getFullYear();

        return (dia < 10 ? '0' : '') + dia +'/' +
        (mes < 10 ? '0' : '') + mes +'/' +
        (anio < 10 ? '0' : '') + anio;
    }

    const getCurrentTime = () : string => {
        const horas = fecha.getHours();
        const minutos = fecha.getMinutes();
        const segundos = fecha.getSeconds();

        return (horas < 10 ? '0' : '') + horas +':' +
        (minutos < 10 ? '0' : '') + minutos +':' +
        (segundos < 10 ? '0' : '') + segundos;
    }

    return {
        fecha,
        getCurrentDate,
        getCurrentTime
    }
}