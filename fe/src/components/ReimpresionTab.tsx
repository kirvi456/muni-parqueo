import { LoadingButton } from '@mui/lab';
import { Alert, Button, Snackbar, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search';
import { Ticket } from '../Types/Ticket';
import { TicketAdminCard } from './TicketAdminCard';
import { URLContext } from '../context/URLContext';

export const ReimpresionTab = () => {
  const [option, setOption] = useState<'todos' | 'ultimo'>('ultimo');
  const [inputValue, setInputValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);


  const URL = useContext(URLContext);

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setOption(newAlignment as 'ultimo');
  };


  const [open, setOpen] = useState<{
    open: boolean,
    severity: 'success' | 'warning' | 'error',
    msg: string
  }>({
    open: false,
    severity: 'success',
    msg: ''
  });

  const handleClose = () => {
    setOpen({...open, open: false});
  };


  const anularTicket = (no : number) => {
    fetch(`${URL}api/tickets/${no}`, {
      method: 'DELETE', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
    })
    .then(async (result) => {
      if(!result.ok){
          throw new Error( (await result.json() ).msg)
      }
      setTickets([]);
      setOpen({open:true, severity: 'success', msg: 'Ticket anulado'})
    })
    .catch( (error : Error) => {
      console.log(error);
      setOpen({open: true, severity: 'error', msg: error.message})
      setTickets( [] );
      setLoading( false );
    });   
  }   



  const buscarTickets = () => {
    
    if( !inputValue ){
      setOpen({open: true, severity: 'error', msg: '[ERROR]: Debe ingresar un número de placa'});      
      setTickets( [] );
      return;
    }

    setLoading( true );
    fetch(`${ URL }api/tickets/${inputValue.toUpperCase()}${'?limit=' + (option === 'ultimo' ? '1' : '10')}`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
    })
    .then(async (result) => {
      if(!result.ok){
        throw new Error( (await result.json() ).msg)
      }
      return result.json();
    })
    .then(( result ) => {

      if(result.length === 0) setOpen({open: true, severity: 'warning', msg: 'No se encontraron placas con ese número'});

      setTickets(result);       

      setLoading( false );
      setInputValue( '' );
    })
    .catch( (error : Error) => {
      console.log(error);
      setOpen({open: true, severity: 'error', msg: error.message})
      setTickets( [] );
      setLoading( false );
    }) ;   
  }

  return (
    <Stack spacing={2}>


      <Typography color='primary' variant='h5' textAlign='center' fontWeight='bold'>
        ADMINISTRACION DE TICKETS
      </Typography>
      
      <Stack justifyContent='flex-end' direction='row'>
        <ToggleButtonGroup
          color="primary"
          value={option}
          exclusive
          onChange={handleChange}
          size='small'
          >
          <ToggleButton value="ultimo">Ultimo</ToggleButton>
          <ToggleButton value="todos">Todos</ToggleButton>
        </ToggleButtonGroup>

      </Stack>

      <TextField 
        fullWidth
        label="Número Placa" 
        variant="outlined" 
        inputProps={{sx: {textTransform: 'uppercase', fontWeight: 'bold'}}} 
        value={ inputValue }
        onChange={  handleInputChange }
      />
      

      <Stack>
        {tickets.map(( ticket, index ) => {
          return (
            <TicketAdminCard 
            key={'ticket'+ index + ticket.no}
            ticket={ticket}
            anular={anularTicket}
            />
          )
        })}

      </Stack>

      <LoadingButton   
        fullWidth   
        loadingPosition="start"
        startIcon={<SearchIcon style={{fontSize: '1.6em'}} />}
        variant="contained" 
        loading={loading}
        sx={{fontWeight: 'bold', fontSize: '1.1em'}}
        onClick={buscarTickets}
      >
          BUSCAR TICKETS
      </LoadingButton>


      {
        tickets.length > 0 &&
        <Button
        onClick={ ()=> setTickets([]) }>
          Limpiar Busqueda
        </Button>
      
      }

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open.open}
        onClose={handleClose}
        key="snackbar"
        autoHideDuration={2000}
        sx={{width: '500px', maxWidth: '90vw'}}
      >
        <Alert onClose={handleClose} severity={open.severity} sx={{ width: '100%' }}>
          {open.msg}
        </Alert>
      </Snackbar>

    

    </Stack>
  )
}
