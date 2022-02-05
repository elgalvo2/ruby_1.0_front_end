import React, { PureComponent } from 'react';
import styles from './Filter_visor.module.css'

import { Select, InputLabel, MenuItem, FormControl } from '@material-ui/core'


// export default function Filter_visor({ FilterBy = 'none', changeFilter, filterList = ['Proovedores', 'Unidad', 'Proovedores', 'Unidad', 'Proovedores', 'Unidad', 'Proovedores', 'Unidad'] }) {
//     return (
//         <>
//             {/* <div className={styles.box}>
//                 <span>Filtrar por:</span>
//                 <span>{FilterBy}</span>
//                 <button className={styles.triangle} onClick={changeFilter}>V</button>
//                 {(FilterBy) &&
//                     <button className={styles.close}>x</button>
//                 }
//             </div>
//             <div className={styles.filterList}>
//                 {filterList.map((item) => (
//                     <div className={styles.listElement}>{item}</div>
//                 ))}
//             </div> */}
//         </>

//     )
// }

export default function Filter_visor({ FilterBy = 'none',selectedOption='none', changeFilter, filterOptions = ['none', 'filter_option1', 'filter_option2'], filterField = ['',''] }) {
    return (
        
            <div className={styles.box}>
                <FormControl>
                    <InputLabel> Filtrar por:</InputLabel>
                    <Select
                        MenuProps={{
                            disableScrollLock:true,
                        }}
                        className={styles.filterOption}
                        value={FilterBy}
                        label='Filtrar por'

                    >
                        {filterOptions.map((option)=>(
                            <MenuItem value={option} >{option}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                    <Select
                        MenuProps={{
                            disableScrollLock:true,
                        }}
                        value={selectedOption}
                        label=''
                    >
                        {filterField.map((option)=>(
                            <MenuItem value={option} >{option}</MenuItem>
                        ))}
                    </Select>


            </div>
       
    )
}