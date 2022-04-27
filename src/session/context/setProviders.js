import { viewers } from "./manager";

function setProviders(mutter){
    if(viewers('getProviders')===mutter){
        return {}
    }else{
        localStorage.setItem('providers',JSON.stringify(mutter))
        return true
    }
}

export default setProviders