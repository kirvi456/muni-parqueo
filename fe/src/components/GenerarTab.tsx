import React, { useLayoutEffect, useState } from 'react'

import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import LoadingButton from '@mui/lab/LoadingButton';
import PrintIcon from '@mui/icons-material/Print';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { DateShower } from './DateShower';
import { TicketPDF } from './TicketPDF';
import { Ticket } from '../Types/Ticket';

import { jsPDF } from "jspdf";


export const GenerarTab = () => {

  const [ticket, setTicket] = useState<Ticket | undefined>();
  
  const [inputValue, setInputValue] = useState<string>('');

  const [error, setError] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
  }

  const generarPDF = () => {

    const doc = new jsPDF({
            orientation: 'p', // landscape
            unit: 'mm', // points, pixels won't work properly
            format: [72, 110], // set needed dimensions for any element
            compress: true
    });

    const pdfjs = document.querySelector<HTMLDivElement>('#divImprimir');

    // Convert HTML to PDF in JavaScript
    doc.html(pdfjs || 'Error Interno', {
        html2canvas:{
          width: 300,
          height: 300,
          scale: 0.24
        },
        x: 1,
        y: 1,
        callback: function(doc) {
            // doc.save("output.pdf");
            doc.autoPrint();
            window.open(doc.output('bloburl'), '_blank');
        },
    });
  }

  useLayoutEffect(()=>{
    if( ticket ) generarPDF()
  }, [ticket])

  const generarTicket = () => {
    setError( '' );
    setTicket( undefined );
    setLoading( true );

     // Opciones por defecto estan marcadas con un *
      fetch('http://localhost:8080/api/tickets', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({placa: inputValue!.toUpperCase()}) // body data type must match "Content-Type" header
      })
      .then(async (result) => {
        if(!result.ok){
          throw new Error( (await result.json() ).msg)
        }
        return result.json()
      })
      .then(( result ) => {
        setTicket({
          no: result.no,
          placa: result.placa,
          fechaEntrada: result.fechaEntrada,
          fechaSalida: 0,
          valor: 0
        })       

        setLoading( false );
        setInputValue( '' );
      })
      .catch( (error : Error) => {
        console.log(error);
        setError( error.message );

        setLoading( false );
      }) ;    
  }

  return (
    <>
      <Stack spacing={2} alignItems='center'>

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

        { ticket 
          ? (
            <Button
              variant='outlined'
              color='secondary'
              sx={{fontWeight: 'bold', fontSize: '1.1em'}}
              fullWidth
              onClick={() => { setTicket(undefined); setInputValue('')  } }
            >
              Aceptar
            </Button>            
          ) 
          : (
            <LoadingButton   
              fullWidth   
              loadingPosition="start"
              startIcon={<PrintIcon style={{fontSize: '1.6em'}} />}
              variant="contained" 
              loading={loading}
              sx={{fontWeight: 'bold', fontSize: '1.1em'}}
              onClick={generarTicket}
            >
                Generar Ticket
            </LoadingButton>
          )
        }


        

      </Stack>

    </>
  )
}

