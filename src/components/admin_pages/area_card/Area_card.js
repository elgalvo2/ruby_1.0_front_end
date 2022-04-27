import React from 'react'
import { Card, CardContent, CardActions } from '@material-ui/core'
import styles from './area_card.module.css'

export default function AreaCard({ props = {
    _id:'',
    name: 'area prueba',
    program: 'especialidad',
    technician_name: 'nombre apellido',
    operator_name: 'nombre apellido',
    orders: [{
        _id:''
    },{
        _id:''
    }]

}, methods }) {
    return (
        

            <Card className={styles.card} onClick={()=>methods.getTaskRelationByArea(props._id)}>
                <CardContent className={styles.content}>
                    <div className={styles.layout}>
                        <div>
                            <p>Nombre: {props.name}</p>
                            <p>Programa: {props.program}</p>
                        </div>
                        <div>
                            <p>Operador: {props.operator_name}</p>
                            <p>Tecnico: {props.technician_name}</p>
                            <p>Catidad de ordenes: {props.orders.length}</p>
                        </div>
                    </div>
                </CardContent>
                <CardActions className={styles.actions}>

                </CardActions>
            </Card>
 
    )
}