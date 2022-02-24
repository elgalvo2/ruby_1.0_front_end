import { viewers } from "./manager";

function setTasks(mutter){
    if(viewers('getTasks')===mutter){
        return {}
    }else{
        localStorage.setItem('tasks',JSON.stringify(mutter))
        return true
    }
}

export default setTasks