
import React,{useState} from "react";
import styles from './side_panel.module.css'
import Search_btn from "../../adjudicaciones_page/buttons/Search_btn";
import Filter_visor from "../../adjudicaciones_page/filter_visor/Filter_visor";

export default function Side_panel({methods}){

    


    return(
        <div className={styles.layout}>
            <div className={styles.addButton}>
                <button 
                    className={styles.buton}
                    onClick={()=>methods.handleOpenAddModal(true)}
                    >
                        Agregar Proveedor
                </button>
            </div>
            <div className={styles.search}>
                <Search_btn/>
            </div>
            <div className={styles.filter}>
                <Filter_visor/>
            </div>
        </div>
    )
}