import React, {useState} from 'react'
import styles from './main.module.css'
import Visor from './visor/Visor'
import Provider_card from './visor/provider_card/Provider_card'
import Add_provider_modal from './side_panel/add_provider_modal/Add_provider_modal'
import Edit_provider_modal from './visor/edit_provider_modal/Edit_provider_modal'
import Provider_info_modal from './visor/provider_info_modal/Provider_info_modal'
import Side_panel from './side_panel/Side_panel'



export default function Main(){

    const [openAddProvideer, setOpenAddProvider] = useState(false)
    const [editProvider, setEditProvider] = useState(false)
    const [showProviderInfo, setShowProviderInfo] = useState(false)

    const handleShowProviderInfo = (isShowing)=>{
        setShowProviderInfo(isShowing)
    }

    const handleEditProvider = (isEditing)=>{
        setEditProvider(isEditing)
    }

    const handleOpenAddModal = (isopen) =>{
        setOpenAddProvider(isopen)
    }

    const SidePanelmethods={
        handleOpenAddModal,
    }

    const VisorMethods={
        handleEditProvider,
        handleShowProviderInfo,
    }
    
    return(
        <>
        <div className={styles.layout}>
            <div className={styles.sidePanel}>
                <Side_panel methods={SidePanelmethods}/>
            </div>
            <div className={styles.visor}>
                <Visor methods={VisorMethods}/>
            </div>
        </div>
        <Add_provider_modal open={openAddProvideer} methods={SidePanelmethods}/>
        <Edit_provider_modal open={editProvider} methods={VisorMethods}/>
        <Provider_info_modal open={showProviderInfo} methods={VisorMethods}/>
        </>
    )
}