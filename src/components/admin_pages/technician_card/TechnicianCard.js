import React from "react";
import {Card, CardContent, CardActions, Tooltip} from '@material-ui/core'
import styles from './technicianCard.module.css'


export default function TechnicianCard({props={
    _id:'',
    firstName:'Tecnico 1',
    lastName:'Tecnico 1',
    matricula:'10000001',
    areas:[{
        _id:'',
        name: 'area prueba1',
        orders:[{_di:''},{_di:''},{_di:''}]
    },{
        _id:'',
        name: 'area prueba2',
        orders:[{_di:''},{_di:''},{_di:''}]
    },{
        _id:'',
        name: 'area prueba3',
        orders:[{_di:''},{_di:''},{_di:''}]
    },{
        _id:'',
        name: 'area prueba4',
        orders:[{_di:''},{_di:''},{_di:''}]
    }]
}, methods}){
    return(
        <Card className={styles.card} onClick={()=>methods.getTaskRelationByTechnician(props._id)}>
                <CardContent className={styles.content}>
                    <div className={styles.layout}>
                        <div>
                            <p>Nombre: {props.firstName + ' ' +props.lastName}</p>
                            <p>Matricula: {props.matricula}</p>
                        </div>
                        
                        <div>
                            <Tooltip title={props.areas.map((area)=>' '+area.name).toString()}>
                            <p>Areas: {(props.areas.length>1)?props.areas[0].name+' + '+(props.areas.length-1)+' areas mas':props.areas[0].name}</p>
                            </Tooltip>
                            <p>Catidad de ordenes: {props.areas.map(area=>area.orders.length).reduce((prev,curr)=>prev+curr,0)}</p>
                        </div>
                    </div>
                </CardContent>
                <CardActions className={styles.actions}>

                </CardActions>
            </Card>
    )
}