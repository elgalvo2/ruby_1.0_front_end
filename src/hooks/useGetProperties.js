import React, { useEffect, useState } from "react";
import PropertyService from '../services/properties.service'

export function useGetProperties(getSignal) {
    
        const [data, setdata] = useState({})
        const [error, setError] = useState(false)
        const [done, setDone] = useState(false)
        const [message, setMessage] = useState('');

        useEffect(() => {
            const reciving = () => {

                PropertyService.getProperties()
                    .then((data) => {
                        console.log('data: ', data)
                        if (data.success) {
                            setdata(data)
                            setDone(true);
                            setMessage('Propiedades cargadas correctamente')
                        } else {
                            setDone(true);
                            setError(true);
                            setMessage(data);
                        }
                    }).catch((err) => {
                        setDone(true);
                        setError(true);
                        setMessage(err.message);
                    })
                console.log('esto se ha recibido: ', data)

            }
            reciving();
        }, [getSignal])
        return [data]
    
}

