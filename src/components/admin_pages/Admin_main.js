import React, { useState, useEffect } from 'react';


import Admin_register_user from './Admin_register_user'
import Register_user_formV2 from './commons/Register_user_formV2';
import Register_area_form from './register_area_form/Register_area_form';
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
import { useManageUserForm } from '../../hooks/useManageUserForm';
import { useManageAreaForm } from '../../hooks/useManageAreaForm';


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

const areainitialValues = {
  name: '',
  program: '',
  inOperation: true,
  operator_id: '',
  technician_id: ''
}


export default function Admin_main({ setDone, setError, setMessage }) {
  
  
  const [propertyData, setPropertyData] = useState(propertyInitialProps)
  const [propertyOwner, setPropertyOwner] = useState([1, 0]);
  
  let [data] = useGetProperties();

  const [form,handleChange, error, handleMenu, passwordVisible, setPasswordVisible, handleClean, readyToSend, handleSend] = useManageUserForm();
  const [AreaForm, handleResetAreaForm, handleChangeAreaForm,handleMenusAreaForm, technicians, operators, readyToSendAreaForm, handleChek,handleSendAreaForm] = useManageAreaForm(areainitialValues,setError, setDone, setMessage);
  
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



  // useEffect(() => {

  //   const signup = () => {
  //     if (JSON.stringify(to_signup) === "{}") {
  //       return {};
  //     } else {
  //       AdminService.register(to_signup).then((data) => {
  //         if (data.data.success) {
  //           setMessage(data.data.message);
  //           setDone(true);

  //         } else {
  //           setMessage(data.data.message);
  //           setDone(true);
  //           setError(true);
  //         }
  //       }).catch((err) => {
  //         console.error(err)
  //         setMessage('Ocurrio un error inesperado', err);
  //         setDone(true);
  //         setError(true);
  //       })

  //     }

  //   }
  //   signup();
  // }, [to_signup])

  return (
    <>

      <App_bar
        Front={<Front_page />}
        window1={<Register_user_formV2 methods={{handleChange,handleMenu,setPasswordVisible, handleClean, handleSend}} props={form} visibility={passwordVisible} error={error} ready = {readyToSend}/>}
        window2={<Register_area_form methods={{handleResetAreaForm, handleChangeAreaForm, handleMenusAreaForm, handleChek, handleSendAreaForm}} props={AreaForm} operadores={operators} tecnicos={technicians} readyToSend={readyToSendAreaForm}/>}
        window3={<Config_modal props={{ propertyData, propertyOwner, send }} data={data.data} methods={{ handleToSetProperty, handleSelectOwner,setSend,handleResetForm }} />}
      >
      </App_bar>

    </>
  );

}