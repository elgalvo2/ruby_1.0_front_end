import React, {useState, useEffect} from 'react';


import Admin_register_user from './Admin_register_user'
import Front_page from './Front_page'
import App_bar from './commons/App_bar';
import Admin_task_program from './Admin_task_program'


import AdminService from '../../services/admin.service';


export default function Admin_main({setDone, setError, setMessage}){

  const [to_signup , setTo_signup] = useState({});
  const [created_program, setCreated_program] = useState({});
   
  useEffect(()=>{
    
    const signup = ()=>{
      if(JSON.stringify(to_signup)==="{}"){
        return {};
      }else{
        AdminService.register(to_signup).then((data)=>{
          if(data.data.success){
            setMessage(data.data.message);
            setDone(true);

          }else{
            setMessage(data.data.message);
            setDone(true);
            setError(true);
          }
        }).catch((err)=>{
          console.error(err)
          setMessage('Ocurrio un error inesperado',err);
            setDone(true);
            setError(true);
        })
    
      }
      
    }
    signup();
  },[to_signup])

  

  useEffect()


    return(
        <>

            <App_bar 
                Front={<Front_page/>} 
                window1={<Admin_register_user to_signup={setTo_signup}/>} 
                window2={<Admin_task_program/>}
                >
            </App_bar>

        </>
    );
   
}