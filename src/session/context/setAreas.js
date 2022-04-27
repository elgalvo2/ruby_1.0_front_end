import { viewers } from "./manager";

function setAreas(mutter){
    if(viewers('getAreas')===mutter){
        return {}
    }else{
        localStorage.setItem('areas',JSON.stringify(mutter))
        return true
    }
}

export default setAreas