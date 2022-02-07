import React, { useEffect, useState } from 'react'
import PropertyService from '../services/properties.service'

export function useSendProperty(data = {}, setError, setDone, setMessage) {
    const [send, setSend] = useState(false)
    // const [sending, setSending] =useState
    // const [error, setError] = useState(false)
    // const [done, setDone] = useState(false)
    // const [message, setMessage] = useState('');

    useEffect(() => {
        const sending = (dataToSend) => {
            if (send) {
                PropertyService.register(dataToSend)
                    .then((data) => {
                        console.log('data: ',data)
                        if (data.success) {                            
                            setDone(true);
                            setMessage('Propiedad registrada correctamente')
                              
                        } else {
                            setDone(true);
                            setError(true);
                            setMessage(data);
                            console.log(data)
                        }
                    }).catch((err)=>{
                        setDone(true);
                        setError(true);
                        setMessage(err);
                        console.log(err)
                    })
                    console.log('esto se ha enviado: ',dataToSend )
                    setSend(false)
            }
        }
        sending(data);
    },[send])
    return [setSend, send]
}