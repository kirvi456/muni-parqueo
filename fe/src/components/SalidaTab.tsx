import React, { useContext, useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { Stack, Typography, TextField, Divider, Grid, Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import { PagoType, Ticket } from '../Types/Ticket';
import { getFecha, getHora } from '../helpers/Formats';
import { URLContext } from '../context/URLContext';




export const SalidaTab = () => {

  const [ticket, setTicket] = useState<Ticket | undefined>();
  const [totales, setTotales] = useState<PagoType | undefined>();

  const [error, setError] = useState<string>('');

  const [ticketNo, setTicketNo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);


  const URL = useContext(URLContext)

  const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    setTicketNo(e.target.value);      
    
  }

  const marcarSalida = () => {
    setError('');
    
    if(isNaN(parseInt(ticketNo))) {
      setError('[ERROR]: Se debe de ingresar un valor valido');
      return;
    }
    
    setLoading(true);
      fetch(`${ URL }api/tickets/salida/${ticketNo}`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
      }).then(async (result) => {
        if(!result.ok){
          throw new Error( (await result.json() ).msg)
        }
        return result.json()
      })
      .then(( result ) => {
        setTicket({...result.ticket})  
        setTotales({...result.totales}) 
        setTicketNo('');
        setLoading(false);
      })
      .catch( (error : Error) => {
        console.log(error);
        setError(error.message);
        setLoading( false );
      }) ;  
  }



  return (
    <>
      <Stack spacing={2}>

        <Typography color='primary' variant='h5' textAlign='center' fontWeight='bold'>
          MARCAR SALIDA
        </Typography>

        <TextField 
          type='number'
          label="Número de Ticket" 
          variant="outlined" 
          inputProps={{sx: {textTransform: 'uppercase', fontWeight: 'bold'}}} 
          value={ticketNo ?? ''}
          onChange={handleInputChange}
        />

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
          >{ error }</Typography>
        }

        { ticket &&
        <Stack sx={{
            p: '12px',
            margin: '12px',
            border: 'solid 1px',
            borderColor: 'grey.500',
            backgroundColor: 'grey.300',
            borderRadius: '4px',
          }}
          spacing={1}
        >
          <Typography 
            textAlign='center'
            fontWeight='bold'
            variant='h4'
          >{ticket.placa}</Typography>
          <Divider />
          <Grid container>
            <Grid item xs={5}>
              <Typography marginRight='12px' textAlign='right' fontWeight='bold'>Entrada:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Stack direction='row' spacing={1}>
                <Typography>{ getFecha( ticket.fechaEntrada ) }</Typography>
                <Typography>{ getHora( ticket.fechaEntrada ) }</Typography>
              </Stack>
            </Grid>

            <Grid item xs={5}>
              <Typography marginRight='12px' textAlign='right' fontWeight='bold'>Salida:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Stack direction='row' spacing={1}>
                <Typography>{ getFecha( ticket.fechaSalida ) }</Typography>
                <Typography>{ getHora( ticket.fechaSalida ) }</Typography>
              </Stack>
            </Grid>

            <Grid item xs={5}>
              <Typography marginRight='12px' textAlign='right' fontWeight='bold'>Tiempo:</Typography>
            </Grid>
            <Grid item xs={7}>
              <Stack direction='row' spacing={1}>
                <Typography>{totales?.horas ?? 0} horas</Typography>
                <Typography>{totales?.minutos ?? 0} minutos</Typography>
                <Typography>{totales?.segundos ?? 0} segundos</Typography>
              </Stack>
            </Grid>

            <Grid item xs={5} marginTop='12px'>
              <Typography marginRight='12px' textAlign='right' fontWeight='bold'>TOTAL:</Typography>
            </Grid>
            <Grid item xs={7} marginTop='12px'>
              <Stack direction='row' spacing={1}>
                <Typography fontWeight='bold'>{`Q ${totales?.costo}.00`}</Typography>
              </Stack>
            </Grid>

          </Grid>
        </Stack>
        }


        {
          ticket
          ? (
            <Button
              variant='outlined'
              color='secondary'
              sx={{fontWeight: 'bold', fontSize: '1.1em'}}
              fullWidth
              onClick={() => { setTicket(undefined); setTicketNo('')  } }
            >
              Aceptar
            </Button>   
          )
          : (
            <LoadingButton      
              loadingPosition="start"
              startIcon={<LogoutIcon style={{fontSize: '1.6em'}} />}
              variant="contained" 
              loading={loading}
              color="secondary"
              sx={{fontWeight: 'bold', fontSize: '1.1em'}}
              onClick={marcarSalida}
            >
                Marcar Salida
            </LoadingButton>
          )

        }
        


      </Stack>
    </>
  )
}
