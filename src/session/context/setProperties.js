import { viewers } from "./manager";

function setProperties(mutter){
    if(viewers('getProperties')===mutter){
        return {}
    }else{
        localStorage.setItem('properties',JSON.stringify(mutter))
        return true
    }
}

export default setProperties