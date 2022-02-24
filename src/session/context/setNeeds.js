import { viewers } from "./manager";

function setNeeds(mutter){
    if(viewers('getNeeds')===mutter){
        return {}
    }else{
        localStorage.setItem('needs',JSON.stringify(mutter))
        return true
    }
}

export default setNeeds