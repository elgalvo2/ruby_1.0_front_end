import React, { useState } from 'react'
import styles from './modal_adjudicaciones_form.module.css'

import {Button } from '@material-ui/core'
import {Delete} from '@material-ui/icons'

export function Adjudicacion_form_setProvider({ props = {
    provider_no: 0,
    proposed_cost: 0,
    items: [{
        info: 'na',
        unit: 'na',
        pu: 0,
        cantity: 0,
    },{
        info: 'na',
        unit: 'na',
        pu: 0,
        cantity: 0,
    }],
    razon_social: '',
    rep_legal: '',
    rfc: '',
    domicilio: '',
    telefono: null,
    email: '',

} }) {

    const [art, setArt] = useState({
        info: 'na',
        unit: 'na',
        pu: 0,
        cantity: 0,
    })



    return (
        <>
            <div className={styles.layout}>
                <div className={styles.noProveedor}>
                <label>No de Proveedor:</label>
                        <input
                            type='number'
                            value={props.provider_no}
                        />
                </div>
                <div className={styles.tablaItem}>
                    <div>
                        <label>Unidad:</label>
                        <input
                            type='text'
                            value={art.unit}
                        />
                    </div>
                    <div>
                        <label>Descripcion:</label>
                        <input
                            type='text'
                            value={art.info}
                        />
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input
                            type='number'
                            value={art.cantity}
                        />
                    </div>
                    <div>
                        <label>P.U.:</label>
                        <input
                            type='number'
                            value={art.pu}
                        />
                    </div>
                    <Button className={styles.addButton}>+</Button>
                </div>
                <div className={styles.itemsVisor}>

                    <div className={styles.head}>
                        <p>Unidad</p>
                        <p>Descripcion</p>
                        <p>Cantidad</p>
                        <p>P.U.</p>
                        <div></div>
                    </div>
                    <div className={styles.cardsVisor}>
                        {props.items.map((item, index) => (
                            <div className={styles.itemCard} key={index}>
                                <p>{item.unit}</p>
                                <p>{item.info}</p>
                                <p>{item.cantity}</p>
                                <p>$ {item.pu}</p>
                                <Button className={styles.removeButton}>
                                    <Delete/>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.total}>
                    <label>Total presupestado: </label>
                    <input
                        type='text'
                        disabled={true}
                        value={' $ '+props.proposed_cost}
                    />
                </div>
            </div>

        </>
    )
}
//         <>
//             <div className={styles.setProviderForm}>
//                 <FormControl>
//                     <TextField
//                         margin='dense'
//                         value={props.provider_no}
//                         id='provider_no'
//                         name='provider_no'
//                         label='Numero de proveedor'
//                         type='number'
//                     />
//                     <div className={styles.Providerlayout}>
//                         <div className={styles.itemForm}>
//                             <div >
//                                 <TextField
//                                 className={styles.head}
//                                     margin='dense'
//                                     value={art.unit}
//                                     name='unit'
//                                     id='unit'
//                                     label='Unidad'
//                                     type='text'
//                                 />
//                             </div>
//                             <div className={styles.descripcion}>
//                                 <TextField
//                                     margin='dense'
//                                     value={art.info}
//                                     multiline
//                                     rows={3}
//                                     maxRows={3}
//                                     fullWidth
//                                     name='info'
//                                     id='info'
//                                     label='Descripcion'
//                                     type='text'
//                                 />
//                             </div>
//                         </div>
//                         <div className={styles.body}>

//                             <div className={styles.cantidad}>
//                                 <TextField
//                                     margin='dense'
//                                     value={art.cantity}
//                                     name='cantity'
//                                     id='cantity'
//                                     label='Cantidad'
//                                     type='text'
//                                 />
//                             </div>
//                             <div className={styles.precio_unitario}>
//                                 <TextField
//                                     margin='dense'
//                                     value={art.pu}
//                                     name='pu'
//                                     id='pu'
//                                     label='Precio unitario'
//                                     type='text'
//                                 />
//                             </div>
//                             <div>
//                                 <Button>Agregar</Button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className={styles.itemVisor}>

//                         <div className={styles.visor}>
//                             {props.items.map((item) => (
//                                 <div className={styles.item}>
//                                     <p>{item.unit}</p>
//                                     <p>{item.info}</p>
//                                     <p>{item.cantity}</p>
//                                     <p>{item.pu}</p>
//                                     <button>-</button>
//                                 </div>
//                             ))}
//                         </div>

//                         <TextField
//                             margin='dense'
//                             value={props.proposed_cost}
//                             id='proposed_cost'
//                             name='proposed_cost'
//                             label='Precio cotizado'
//                             type='number'
//                         />
//                     </div>

//                 </FormControl>
//             </div>
//         </>
//     )
// }

export function Adjudicacion_form_setAut({props={
    auth_no:'',
    approved_cost:0,
    proposed_cost:0,
}}) {
    return (
        <>
            <div className={styles.autLayout}>
                <div>
                    <label>No. de Autorizacion:</label>
                    <input
                    type='text'
                    value={props.auth_no}
                    />
                </div>
                <div>
                    <label>Costo presupuestado: $</label>
                    <input
                    type='number'
                    value={props.proposed_cost}
                    />
                </div>
                <div>
                    <label>Costo aprobado: $</label>
                    <input
                    type='number'
                    value={props.approved_cost}
                    />
                </div>
            </div>
        </>
    )
}

export function Adjudicacion_form_setFechas({props={
    order_no:'',
    start_date:'dd/mm/aaaa',
    finish_date:'dd/mm/aaaa',
}}) {
    return (
        <>
            <div className={styles.autLayout}>
                <div>
                    <label>No. de Orden o Servicio:</label>
                    <input
                    type='text'
                    value={props.order_no}
                    />
                </div>
                <div>
                    <label>Fecha de inicio</label>
                    <input
                    type='text'
                    value={props.start_date}
                    />
                </div>
                <div>
                    <label>Fecha de termino</label>
                    <input
                    type='text'
                    value={props.finish_date}
                    />
                </div>
            </div> 
        </>
    )
}

export function Adjudicacion_form_setRecibido({props={
    recived:false,
    notes:[],
}}) {
    return (
        <>
            <div className={styles.autLayout}>
                <div>
                    <label>Bienes o servicios recibidos? :</label>
                    <checkbox
                        check={true}
                    />
                </div>
                <div>
                    <label>Agregar nota:</label>
                    <input
                    type='text'
                    value={props.start_date}
                    />
                </div>
                <div>
                    <label>Fecha de termino</label>
                    <input
                    type='text'
                    value={props.finish_date}
                    />
                </div>
            </div>
        </>
    )
}


export function Adjudicacion_form_setFactura() {
    return (
        <>

        </>
    )
}

