import * as React from 'react';
import { Box, Paper, Typography, Tab, Tabs, Stack } from '@mui/material';
import { GenerarTab } from './components/GenerarTab';
import { SalidaTab } from './components/SalidaTab';
import { ReimpresionTab } from './components/ReimpresionTab';
import Escudo from './assets/escudo.png';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack minWidth='400px' width='100%'>
      <div style={{
              background: 'linear-gradient(90deg, rgba(48,129,0,1) 0%, rgba(255,255,255,1) 50%, rgba(255,250,10,1) 100%)',
              height: '18px',
              marginBottom: '24px'
        }}
      >
      </div> 

      <Stack direction='row' spacing={2} justifyContent='center' alignItems='center' marginBottom='24px'>
        <img 
          src={Escudo} 
          alt='escudo sjp' 
          style={{
            width: '150px',
          }}
        />
        
        <Stack>
          <Typography variant='h4' textAlign='center'>
            SISTEMA DE TICKETS DE PARQUEO
          </Typography>
          <Typography variant='h6' textAlign='center'>
            MUNICIPALIDAD SAN JOSE PINULA
          </Typography>
        </Stack>
      </Stack>

      <Paper elevation={10} sx={{ width: '700px', maxWidth: '95%', margin: '12px auto'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
            variant="fullWidth">
            <Tab label="Generar" {...a11yProps(0)} />
            <Tab label="Marcar Salida" {...a11yProps(1)} />
            <Tab label="Administrar" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <GenerarTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SalidaTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ReimpresionTab />
        </TabPanel>
      </Paper>

    </Stack>
  );
}