import React from 'react'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import Escudo from '../assets/escudo.png'
import { Ticket } from '../Types/Ticket'
import { formatNumber, getFecha, getHora } from '../helpers/Formats'

export const TicketPDF : React.FC<Ticket & { id : string }> = ({ no, placa, fechaEntrada, id }) => {

  

  const dateInformation = ( fecha : number ) : React.ReactNode => {
    return (
      <Stack direction='row' spacing={2}>
        <Stack direction='row'>
          <Typography variant='caption' sx={{fontSize: '0.7em', fontWeight: 'bold'}}>Fecha:</Typography>
          <Typography variant='caption' sx={{fontSize: '0.7em'}}>{ getFecha(fecha) }</Typography>
        </Stack>
        <Stack direction='row'>
          <Typography variant='caption' sx={{fontSize: '0.7em', fontWeight: 'bold'}}>Hora:</Typography>
          <Typography variant='caption' sx={{fontSize: '0.7em'}}>{ getHora(fecha) }</Typography>
        </Stack>
      </Stack>
    )
  }

  return (
    <Box id='divImprimir' sx={{width: '300px', margin: 'auto', p: '4px 32px 12px 6px'}}>
      <Stack direction='row' sx={{justifyContent: 'center', alignItems: 'center'}}>
        <Stack sx={{padding: '12px 0 0 32px'}} alignItems='center'>
          <img src={Escudo} alt='escudo ticket' style={{width: '40px'}} />
          <Typography variant='caption' fontWeight='bold' textAlign='center'>{formatNumber(no)}</Typography>
        </Stack>
        <Stack sx={{flex: '1'}}>
          <Typography variant='h6' sx={{textAlign:'center', fontWeight: 'bold'}}>PARQUEO</Typography>
          <Typography variant='caption' sx={{textAlign:'center', fontWeight: 'bold', fontSize:'0.55em'}}>Municipalidad San José Pinula</Typography>
        </Stack>
      </Stack>
      <Stack alignItems='center'>
        <Typography variant='h6' sx={{fontSize:'2.7em', fontWeight: 'bold'}}>{ placa }</Typography>
        { dateInformation(fechaEntrada) }
      </Stack>

      <Divider></Divider>      
      <Stack>
          <Typography variant='caption' sx={{fontSize: '0.7em', fontWeight: 'bold', textAlign: 'center'}}>
            PRECIO Y HORARIOS
          </Typography>
          <Grid container sx={{mb:1}}>
            
            <Grid item xs={2}>
              <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'right', letterSpacing: '0'}}>
                Lunes:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                07:00 a.m. - 04:00 p.m.
              </Typography>
            </Grid>
            <Grid item xs={5}>
            <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                Q2.00 por Hora
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'right', letterSpacing: '0'}}>
                Martes:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                07:00 a.m. - 04:00 p.m.
              </Typography>
            </Grid>
            <Grid item xs={5}>
            <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                Q2.00 por Hora
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'right', letterSpacing: '0'}}>
                Miercoles:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                07:00 a.m. - 04:00 p.m.
              </Typography>
            </Grid>
            <Grid item xs={5}>
            <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                Q2.00 por Hora
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'right', letterSpacing: '0'}}>
                Jueves:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                07:00 a.m. - 04:00 p.m.
              </Typography>
            </Grid>
            <Grid item xs={5}>
            <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                Q2.00 por Hora
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'right', letterSpacing: '0'}}>
                Viernes:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                07:00 a.m. - 03:00 p.m.
              </Typography>
            </Grid>
            <Grid item xs={5}>
            <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                Q2.00 por Hora
              </Typography>
            </Grid>

            <Grid item xs={2}>
              <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'right', letterSpacing: '0'}}>
                Sábado:
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                07:00 a.m. - 12:00 p.m.
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0'}}>
                Q3.00 por Hora
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{fontSize:'0.4em', textAlign: 'center', letterSpacing: '0', mt:1}}>
                ***SE COBRARÁ LA HORA COMPLETA SI SE EXCEDE DE LOS 5 MINUTOS***
              </Typography>
            </Grid>

          </Grid>
      </Stack>

      <Divider></Divider>      
      <Stack>
          <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'justify', letterSpacing: '0'}}>
            1- ESTE ES UNICAMENTE UN TICKET DE PARQUEO, NO FUNCIONA COMO COMPROBANTE O FACTURA.
          </Typography>
          <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'justify', letterSpacing: '0'}}>
            2- ESTE PARQUEO NO SE HACE RESPONSABLE POR ROBO, AVERIA, INCENDIO, O CUALQUIER TIPO DE DAÑO CAUSADO
            A LA PROPIEDAD PRIVADA DEBIENDOSE CONSIDERAR COMO CASO FORTUITO
          </Typography>
          <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'justify', letterSpacing: '0'}}>
            3- PARA SALIR DEL PARQUEO SE DEBERÁ MOSTRAR ESTE TICKET
          </Typography>
          <Typography sx={{fontSize:'0.4em', fontWeight: '600', textAlign: 'justify', letterSpacing: '0'}}>
            4- SI USTED EXTRAVIA SU TICKET DEBE DEMOSTRAR FEHACIENTEMENTE QUE EL VEHICULO ES DE SU PROPIEDAD,
            Y DEBERÁ CANCELAR UNA CANTIDAD DE Q20.00
          </Typography>
      </Stack>
      <Divider></Divider>  

      <Typography variant='h6' sx={{fontSize:'2.7em', fontWeight: 'bold', textAlign: 'center'}}>{ getHora( fechaEntrada ) }</Typography>

    </Box>
  )
}