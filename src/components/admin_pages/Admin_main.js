import React, { useState, useEffect } from 'react';


import Admin_register_user from './Admin_register_user'
import Front_page from './Front_page'
import App_bar from './commons/App_bar';
import Admin_task_program from './Admin_task_program'
import Main_register_provider from './register_provider/main_register_provider'
import Propiedades_modal from '../config_modal/Propiedades_modal/Propiedades_modal'
import Config_modal from '../config_modal/Config_modal';


import AdminService from '../../services/admin.service';
import PropertyService from '../../services/properties.service';
import { usePrintChanges } from '../../hooks/usePrintChanges';
import {useForm} from '../../hooks/useForm';
import { useSendProperty } from '../../hooks/useSendProperty';
import { useGetProperties } from '../../hooks/useGetProperties';
import { LeakAddTwoTone } from '@material-ui/icons';


const propertyInitialProps = {
  inmueble: '',
  direccion: '',
  administrador: '',
  director: '',
  contador: '',
  localidad: '',
  telefono: '',
  propietario: 'imss',
  unidad_informacion: '',
  centro_costos: '',
  circunscripcion: '',
  jefe_conservacion: '',

}


export default function Admin_main({ setDone, setError, setMessage }) {
  
  const [to_signup, setTo_signup] = useState({});
  const [created_program, setCreated_program] = useState({});
  const [propertyData, setPropertyData] = useState(propertyInitialProps)
  const [propertyOwner, setPropertyOwner] = useState([1, 0]);
  
  let [data] = useGetProperties();
  
  const handleSelectOwner = (event) => {
    
    
    if (event.target.name == 'imss') {
      setPropertyOwner([1, 0])

    }
    if (event.target.name == 'sntss') {
      setPropertyOwner([0, 1])
    }

    setPropertyData({
      ...propertyData,
      propietario: event.target.name
    })
    

  }

  
  const [setSend, send] = useSendProperty(propertyData, setError, setDone, setMessage)
  
 

  const handleResetForm = () =>{
    setPropertyData(propertyInitialProps)
  }

  usePrintChanges(propertyData)

 

  const handleToSetProperty = ({ target }) => {
    setPropertyData({
      ...propertyData,
      [target.name]: target.value
    })
  }



  useEffect(() => {

    const signup = () => {
      if (JSON.stringify(to_signup) === "{}") {
        return {};
      } else {
        AdminService.register(to_signup).then((data) => {
          if (data.data.success) {
            setMessage(data.data.message);
            setDone(true);

          } else {
            setMessage(data.data.message);
            setDone(true);
            setError(true);
          }
        }).catch((err) => {
          console.error(err)
          setMessage('Ocurrio un error inesperado', err);
          setDone(true);
          setError(true);
        })

      }

    }
    signup();
  }, [to_signup])

  return (
    <>

      <App_bar
        Front={<Front_page />}
        window1={<Admin_register_user to_signup={setTo_signup} />}
        window2={<Admin_task_program />}
        window3={<Config_modal props={{ propertyData, propertyOwner, data, send }} methods={{ handleToSetProperty, handleSelectOwner,setSend,handleResetForm }} />}
      >
      </App_bar>

    </>
  );

}