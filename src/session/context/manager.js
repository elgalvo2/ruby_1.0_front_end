
import setNeeds from './setNeeds'
import setProperties from './setProperties'
import setProviders from './setProviders'

export function viewers(getter){
    let session = JSON.parse(localStorage.getItem('session'));
    let technicians = JSON.parse(localStorage.getItem('technicians'));
    let providers = JSON.parse(localStorage.getItem('providers'))
    let properties = JSON.parse(localStorage.getItem('properties'))
    let needs = JSON.parse(localStorage.getItem('needs'))
    switch(getter){
        case 'getUser':
            return session.data.user_;
        case "getSessionState":
            const today = new Date().getTime();
            const diference = today - session.data.session_created_date;
            if(diference>14499000){
                return false
            }else{
                return true
            }
        case 'getTechnicians':
            return technicians.data
        case 'getProviders':
            return providers.data
        case 'getProperties':
            return properties.data
        case 'getNeeds':
            return needs.data
        default:
            return {};
    }
};

export function mutators(mutattor, mutter){
    switch(mutattor){
        case 'setUser':
            if(viewers('getUser')===mutter){
                return {}
            }else{
                localStorage.setItem('session',JSON.stringify(mutter));
                return true;
            }
        case 'removeUser':
            let pay = {
                    data:{
                        user_:{},
                        access_token:{},
                        session_created_date:0,
                    }
                    
                } 
                localStorage.setItem('session',JSON.stringify(pay))
            return true
        case 'setTechnicians':
            if(viewers('getTechnicians')===mutter){
                return{}
            }else{
                localStorage.setItem('technicians',JSON.stringify(mutter));
                return true;
            }
        case 'removeTechnicians':
            let tech = {
                data:[]
            }
            localStorage.setItem('technicians',JSON.stringify(tech))
            return true;
        case 'setNeeds':
            return setNeeds(mutter)
        case 'removeNeeds':
            let need = {
                data:[]
            }
            localStorage.setItem('needs',JSON.stringify(need))
            return true
        case 'setProviders':
            return setProviders(mutter)
        case 'removeProviders':
            let provider = {
                data:[]
            }
            localStorage.setItem('providers',JSON.stringify(provider))
            return true
        case 'setProperties':
            return setProperties(mutter)
        case 'removeProperties':
            let propert = {
                data:[]
            }
            localStorage.setItem('properties',JSON.stringify(propert))
            return true
        default:
            return {}
    };
};

