import { Checkbox } from "@material-ui/core";
import React from "react";
import styles from './propiedades_modal.module.css'

export default function Propiedades_modal() {
    return (
        <div className={styles.layout}>
            <div>
                <label>Nombre de la propiedad:</label>
                <input
                    type='text'
                    name="inmueble"
                />
            </div>
            <div>
                <label>Direccion:</label>
                <input
                    type='text'
                    name="direccion"
                />
            </div>
            <div className={styles.localidadTel}>
                <div>
                    <label>Localidad:</label>
                    <input
                        type='text'
                        name="Localidad"
                    />
                </div>
                <div>
                    <label>Telefono:</label>
                    <input
                        type='number'
                        name="telefono"
                    />
                </div>
            </div>
            <div className={styles.checkBoxes}>
                <label>Propietario de la unidad:</label>

                <div className={styles.cont}>
                    <label>IMSS</label>
                    <Checkbox />
                </div>
                <div className={styles.cont}>
                    <label>SNTSS</label>
                    <Checkbox />
                </div>

            </div>
            <div className={styles.datosUnidad}>
                <div>
                    <label>Unidad de informacion:</label>
                    <input
                        type='text'
                        id='unidad_informacion'
                    />
                </div>
                <div>
                    <label>Centro de costos:</label>
                    <input
                        type='text'
                        id='centro_costos'
                    />
                </div>
                <div>
                    <label>Circunscripcion:</label>
                    <input

                        type='text'
                        id='circuscripcion'

                    />
                </div>
            </div>
            <div>
            <label>Director:</label>
                <input
                    type='text'
                    name="director"
                />
            </div>
            <div>
            <label>Administrador:</label>
                <input
                    type='text'
                    name="contador"
                />
            </div>
            <div>
            <label>Contador:</label>
                <input
                    type='text'
                    name="administrador"
                />
            </div>
            
            <div className={styles.button}>
                <button>Guardar</button>
            </div>
        </div>
    )
}