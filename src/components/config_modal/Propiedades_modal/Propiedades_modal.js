import { Checkbox } from "@material-ui/core";
import React from "react";
import styles from './propiedades_modal.module.css'

export default function Propiedades_modal({ methods, props = {
    inmueble: '',
    direccion: '',
    localidad: '',
    director: '',
    propietario: '',
    unidad_informacion: '',
    centro_costos: '',
    circunscripcion: '',
    jefe_conservacion: '',
}, ownerInfo = [0, 0], disablesend }) {


    return (
        <div className={styles.layout}>
            <div>
                <label>Nombre de la propiedad:</label>
                <input
                    type='text'
                    name="inmueble"
                    value={props.inmueble}
                    onChange={(e)=>methods.setProperty(e)}
                />
            </div>
            <div>
                <label>Direccion:</label>
                <input
                    type='text'
                    name="direccion"
                    value={props.direccion}
                    onChange={(e)=>methods.setProperty(e)}
                />
            </div>
            <div className={styles.localidadTel}>
                <div>
                    <label>Localidad:</label>
                    <input
                        type='text'
                        name="localidad"
                        value={props.localidad}
                        onChange={(e)=>methods.setProperty(e)}
                    />
                </div>
                <div>
                    <label>Telefono:</label>
                    <input
                        type='number'
                        name="telefono"
                        value={props.telefono}
                        onChange={(e)=>methods.setProperty(e)}
                    />
                </div>
            </div>
            <div className={styles.checkBoxes}>
                <label>Propietario de la unidad:</label>

                <div className={styles.cont}>
                    <label>IMSS</label>
                    <Checkbox name="imss" checked={ownerInfo[0]} onChange={(e) => methods.setOwner(e)} />
                </div>
                <div className={styles.cont}>
                    <label>SNTSS</label>
                    <Checkbox name='sntss' checked={ownerInfo[1]} onChange={(e) => methods.setOwner(e)} />
                </div>

            </div>
            <div className={styles.datosUnidad}>
                <div>
                    <label>Unidad de informacion:</label>
                    <input
                        type='text'
                        name="unidad_informacion"
                        value={props.unidad_informacion}
                        onChange={(e)=>methods.setProperty(e)}
                        
                    />
                </div>
                <div>
                    <label>Centro de costos:</label>
                    <input
                        type='text'
                        name="centro_costos"
                        value={props.centro_costos}
                        onChange={(e)=>methods.setProperty(e)}
                    />
                </div>
                <div>
                    <label>Circunscripcion:</label>
                    <input

                        type='text'
                        name="circunscripcion"
                        value={props.circunscripcion}
                        onChange={(e)=>methods.setProperty(e)}

                    />
                </div>
            </div>
            <div>
                <label>Director:</label>
                <input
                    type='text'
                    name="director"
                    value={ props.director}
                    onChange={(e)=>methods.setProperty(e)}
                />
            </div>
            <div>
                <label>Administrador:</label>
                <input
                    type='text'
                    name="administrador"
                    value={ props.administrador}
                    onChange={(e)=>methods.setProperty(e)}
                />
            </div>
            <div>
                <label>Contador:</label>
                <input
                    type='text'
                    name="contador"
                    value={ props.contador}
                    onChange={(e)=>methods.setProperty(e)}
                />
            </div>
            <div>
                <label>Jefe de conservacion:</label>
                <input
                    type='text'
                    name="jefe_conservacion"
                    value={ props.jefe_conservacion}
                    onChange={(e)=>methods.setProperty(e)}
                />
            </div>

            <div className={styles.button}>
                <button onClick={()=>methods.setReset()}>Limpiar</button>
                <button onClick={()=>methods.setSend(true)} disabled={disablesend}>Guardar</button>
            </div>
        </div>
    )
}