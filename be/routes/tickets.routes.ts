import { Router } from 'express';
import { anularTicket, crearTicket, marcarSalida, obtenerTickets } from '../controllers/tickets.controller';

const router = Router();

router.post('/', crearTicket);

router.post('/salida/:no', marcarSalida);

router.get('/:placa', obtenerTickets);

router.delete('/:no', anularTicket);

export default router;