import React from "react";
import styles from './config_modal.module.css'
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Propiedades_modal from "./Propiedades_modal/Propiedades_modal";


export default function Config_modal({ methods, props, data=[{inmueble:'prueba1'},{inmueble:'prueba2'}] }) {

    const formMethods = {
        setProperty: methods.handleToSetProperty,
        setOwner: methods.handleSelectOwner,
        setReset: methods.handleResetForm,
        setSend: methods.setSend,
    }

    

    
   

    const { propertyData, propertyOwner, send } = props;


    console.log('data',data)


    return (
        <>
            <div className={styles.layout}>
                <div className={styles.sideBar}>
                    <ul>
                       {data.map((property)=>(
                           <li>{property.inmueble}</li>
                           ))}
                    </ul>
                       
                
                </div>
                <div className={styles.content}>
                    <Propiedades_modal props={propertyData} ownerInfo={propertyOwner} methods={formMethods} disablesend= {send} />
                </div>
            </div>
        </>
    )
}