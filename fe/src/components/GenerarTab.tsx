import React, { useLayoutEffect, useState, useEffect, useContext } from 'react'

import LoadingButton from '@mui/lab/LoadingButton';
import PrintIcon from '@mui/icons-material/Print';

import { Stack, TextField, Typography } from '@mui/material';

import { DateShower } from './DateShower';
import { TicketPDF } from './TicketPDF';
import { Ticket } from '../Types/Ticket';


import { URLContext } from '../context/URLContext';
import { generarPDF } from '../helpers/generarPDF';


export const GenerarTab = () => {

  const [ticket, setTicket] = useState<Ticket | undefined>();  
  const [inputValue, setInputValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);



  const URLBase = useContext(URLContext);

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
  }

  
  useEffect(() => {

    console.log('se agrego el evento')
    const funcionGenerar = (e : KeyboardEvent) => {
      if( e.key === '+' && inputValue === '' ){
        generarTicket()
      }
    }
    
    window.addEventListener('keydown', funcionGenerar, true);

    return () => {console.log('se removio', window.removeEventListener('keydown', funcionGenerar, true))}

  }, [])

  

  useLayoutEffect(()=>{
    if( ticket ) {
      generarPDF()
      setTimeout(() => setTicket( undefined ), 1000)
    }
  }, [ticket])

  const displayTicket = (
    no : number, 
    placa : string = 'S/P', 
    fechaEntrada : number = ( new Date() ).getTime()
  ) => {

    setTicket({
      no,
      placa,
      fechaEntrada,
      fechaSalida: 0,
      valor: 0
    })       

    setLoading( false );
    setInputValue( '' );

  }

  const generarTicket = () => {
    setError( '' );
    setTicket( undefined );
    setLoading( true );


    if(inputValue === '') return displayTicket( 0 )

    const controller = new AbortController()
    setTimeout(() => controller.abort(), 2000)
    
    fetch(`${ URLBase }api/tickets`, {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache', 
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', 
      referrerPolicy: 'no-referrer', 
      signal: controller.signal,
      body: JSON.stringify({placa: inputValue === '' ? 'S/P' : inputValue!.toUpperCase()})
    })
    .then(async (result) => {
      if(!result.ok){
        displayTicket(0)
        //throw new Error( (await result.json() ).msg)
      }
      return result.json()
    })
    .then(( result ) => {

      displayTicket(result.no, result.placa, result.fechaEntrada)

    })
    .catch( (error : Error) => {
      
      console.log( error )
      displayTicket( 0 )

    }) ;    
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
    e.preventDefault();
    generarTicket();
  } 

  return (
    <>
        <form onSubmit={ e => handleSubmit(e) } style={{width: '100%'}}>
          <Stack spacing={ 2 } alignItems='center'>

        
          <Typography color='primary' variant='h5' textAlign='center' fontWeight='bold'>
            IMPRIMIR TICKET
          </Typography>

          <TextField 
            fullWidth
            label="Número Placa" 
            variant="outlined" 
            inputProps={{sx: {textTransform: 'uppercase', fontWeight: 'bold'}}} 
            value={inputValue}
            onChange={  handleInputChange }
          />

          <DateShower />
          
          {ticket && <TicketPDF id='divImprimir' {...ticket} ></TicketPDF>}        

          

          {error !== '' && 
            <Typography 
              sx={{
                p: '8px 16px',
                backgroundColor: 'error.light',
                border: '1px solid',
                borderColor: 'error.dark',
                color: 'error.dark',
                fontWeight: 'bold',
                width: '100%',
                borderRadius: '8px'
              }}
              variant='caption'
              component='div'
            >{ error }</Typography>}

          
            <LoadingButton  
              type='submit' 
              fullWidth   
              loadingPosition="start"
              startIcon={<PrintIcon style={{fontSize: '1.6em'}} />}
              variant="contained" 
              loading={loading}
              sx={{fontWeight: 'bold', fontSize: '1.1em'}}
            >
                Generar Ticket
            </LoadingButton>
          </Stack>
        </form>

    </>
  )
}




