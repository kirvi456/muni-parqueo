import React from 'react'
import { Stack, Typography } from '@mui/material'

import { useDate } from '../hooks/useDate';

export const DateShower = () => {

    const { getCurrentDate, getCurrentTime } = useDate();

    return (
        <Stack direction='row' justifyContent='center' spacing={4}>
            <Stack direction='row' spacing={2}>
                <Typography fontWeight='bold'>
                    Fecha:
                </Typography>
                <Typography>
                    { getCurrentDate() }
                </Typography>
            </Stack>
            <Stack direction='row' spacing={2}>
                <Typography fontWeight='bold'>
                    Hora:
                </Typography>
                <Typography>
                    { getCurrentTime() }
                </Typography>
            </Stack>
        </Stack>
    )
}
