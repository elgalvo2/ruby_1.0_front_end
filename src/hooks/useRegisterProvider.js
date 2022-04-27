import React, {useState, useEffect} from 'react'
import ProviderService from '../services/provider.service'


export function useRegisterProvider(data={}, setError, setDone, setMessage){
    const [send, setSend] = useState(false)
    const [sending, setSending] = useState(false)
    // const [error, setError] = useState(false)
    // const [done, setDone] = useState(false)
    // const [message, setMessage] = useState('');

    useEffect(() => {
        const sending = (dataToSend) => {
            if (send) {
                setSending(true)
                ProviderService.register(dataToSend)
                    .then((data) => {
                        console.log('data: ',data)
                        if (data.success) {                            
                            setDone(true);
                            setMessage('proveedor registrado correctamente')
                            setSending(false)
                              
                        } else {
                            setDone(true);
                            setError(true);
                            setMessage(data);
                            console.log(data)
                            setSending(false)
                        }
                    }).catch((err)=>{
                        setDone(true);
                        setError(true);
                        setMessage(err.error);
                        console.log(err)
                        setSending(false)
                    })
                    console.log('esto se ha enviado: ',dataToSend )
                    setSend(false)
            }
        }
        sending(data);
    },[send])
    return [setSend, sending]
}