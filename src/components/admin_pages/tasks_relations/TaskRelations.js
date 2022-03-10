import { Style } from '@material-ui/icons'
import React from 'react'
import styles from './taskRelation.module.css'
import AreaCard from '../area_card/Area_card'
import TechnicianCard from '../technician_card/TechnicianCard'


export default function TaskRelations({tecnicos=[],areas=[] , methods}) {

    const {getTaskRelationByArea,getTaskRelationByTechnician} = methods
    
    return (
        <div className={styles.layout}>

            <p>Areas y Tecnicos disponibles para relacionar</p>

            <div className={styles.section}>
                <p>Obtener relacion por tecnicos</p>
                <div className={styles.visor}>
                    {tecnicos.map((tecnico, index) => (
                        <TechnicianCard key={index} props={tecnico} methods={{getTaskRelationByTechnician}}/>
                    ))}
                </div>
            </div>
            <div className={styles.section}>
                <p>Obtener relacion por area</p>
                <div className={styles.visor}>
                    {areas.map((area, index) => (
                        <AreaCard key={index} props={area} methods={{getTaskRelationByArea}}/>
                    ))}
                </div>
            </div>
        </div>
    )
}