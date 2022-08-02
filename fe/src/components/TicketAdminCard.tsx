import { Button, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import jsPDF from 'jspdf'
import React from 'react'
import { formatNumber, getFecha, getHora } from '../helpers/Formats'
import { Ticket } from '../Types/Ticket'
import { TicketPDF } from './TicketPDF'



type TicketAdminCardType = {
    ticket: Ticket;
    anular: (no : number) => void
}

export const TicketAdminCard : React.FC<TicketAdminCardType> = ({ticket, anular}) => {

    

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

    return (
        <Container 
            sx={{
                p: '12px', 
                backgroundColor: 'grey.300', 
                border: '1px solid', 
                mb: '1em', 
                borderRadius: '0.5em',
                borderColor: 'grey.500'
            }}
        >
            <Stack>
                

                <TicketPDF id='divImprimir' {...ticket} ></TicketPDF> 


                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Button 
                            variant='contained'
                            color='error' 
                            fullWidth
                            onClick={() => anular(ticket.no)}
                        >
                            ANULAR
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button 
                            variant='contained' 
                            fullWidth
                            onClick={generarPDF}
                        >
                            REIMPRIMIR
                        </Button>
                    </Grid>                    
                </Grid>

            </Stack>
        </Container>
    )
}
