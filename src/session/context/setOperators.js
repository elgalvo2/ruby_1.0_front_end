import { viewers } from "./manager";

function setOperators(mutter){
    if(viewers('getOperators')===mutter){
        return {}
    }else{
        localStorage.setItem('operators',JSON.stringify(mutter))
        return true
    }
}

export default setOperators