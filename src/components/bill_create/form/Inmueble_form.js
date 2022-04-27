import React from 'react'
import styles from './inmueble_form.module.css'



export default function Inmueble_form({ properties = [{
    "inmueble": 'na',
    "circunscripcion": ['', ''],
    "localidad": "",
    "unidad_informacion": "",
    "centro_costos": "",
    "domicilio_inmu": "",
    "telefono_inmu": "",
    "jefe_conservacion": "",
    "director": "",
    "administrador": "",
}], property = {
    "inmueble": '',
    "circunscripcion": ['', ''],
    "localidad": "",
    "unidad_informacion": "",
    "centro_costos": "",
    "domicilio_inmu": "",
    "telefono_inmu": "",
    "jefe_conservacion": "",
    "director": "",
    "administrador": "",
} }) {
    return (
        <div className={styles.layout}>
            <div className={styles.inmueble}>
                <label>Seleccion un inmueble:</label>
                <div className={styles.propertyContainer}>

                    {properties.map((property) => (
                        <div className={styles.prop}>
                            <label>{property.inmueble}:</label>
                            <input type='checkbox'
                                name='property'
                                id={property.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.propertyDataContainer}>
                <div>
                    <p>Inmueble: <span>{property.inmueble}</span></p>
                    <p>Circunscripcion: <span>{property.circunscripcion[0] + " "}</span><span>{" " + property.circunscripcion[1]}</span></p>
                    <p>Localidad: <span>{property.localidad}</span></p>
                    <p>Unidad de informacion: <span>{property.unidad_informacion}</span></p>
                    <p>Centro de costos: <span>{property.centro_costos}</span></p>
                    <p>Domicilio: <span>{property.domicilio_inmu}</span></p>
                </div>
                <div>
                    <p>Telefono: <span>{property.telefono_inmu}</span></p>
                    <p>Jefe Conservacion: <span>{property.jefe_conservacion}</span></p>
                    <p>Director: <span>{property.director}</span></p>
                    <p>Administrador: <span>{property.administrador}</span></p>
                </div>
            </div>
        </div>

    )
}

