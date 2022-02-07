import React, {useState} from 'react'
import styles from './main.module.css'
import Visor from './visor/Visor'
import Provider_card from './visor/provider_card/Provider_card'
import Add_provider_modal from './side_panel/add_provider_modal/Add_provider_modal'
import Edit_provider_modal from './visor/edit_provider_modal/Edit_provider_modal'
import Provider_info_modal from './visor/provider_info_modal/Provider_info_modal'
import Side_panel from './side_panel/Side_panel'
import Add_provider_form from './side_panel/add_provider_modal/add_provider_form/Add_provider_form'

import { useForm } from '../../hooks/useForm'
import { usePrintChanges } from '../../hooks/usePrintChanges'
import { useRegisterProvider } from '../../hooks/useRegisterProvider'
import { setMessage } from '../../actions/message'
import { useGetProviders } from '../../hooks/useGetProviders'

const providerInfoinitialProps = { 
    provider_no: 0,
    razon_social: '',
    rep_legal: '',
    rfc: '',
    domicilio: '',
    telefono: 0,
    email: '',
    giro: '',
}


export default function Main({methods}){

    const [openAddProvideer, setOpenAddProvider] = useState(false)
    const [editProvider, setEditProvider] = useState(false)
    const [showProviderInfo, setShowProviderInfo] = useState(false)
    

    // register provider drivers
    const [formValues, handleChangeForm, handleReset] = useForm(providerInfoinitialProps)


    const [setSend, sending]=useRegisterProvider(formValues, methods.setError, methods.setDone, methods.setMessage)
    const [providers] = useGetProviders(methods.setError, methods.setDone, methods.setMessage)
    

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
        handleChangeForm,
        setSend,
        handleReset,
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
                <Side_panel methods={SidePanelmethods} />
            </div>
            <div className={styles.visor}>
                <Visor providers={providers} methods={VisorMethods}/>
            </div>
        </div>
        <Add_provider_modal open={openAddProvideer} methods={SidePanelmethods} props={formValues} disableSend = {sending} form={<Add_provider_form props={formValues} methods={SidePanelmethods} />}/>
        <Edit_provider_modal open={editProvider} methods={VisorMethods}/>
        <Provider_info_modal open={showProviderInfo} methods={VisorMethods} />
        </>
    )
}