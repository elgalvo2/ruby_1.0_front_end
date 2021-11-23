import initSession from './session_init'
export function viewers(getter){
    let session = JSON.parse(localStorage.getItem('session'));
    let technicians = JSON.parse(localStorage.getItem('technicians'));
    switch(getter){
        case 'getUser':
            return session.data.user_;
        case "getSessionState":
            const today = new Date().getTime();
            const diference = today - session.data.session_created_date;
            if(diference>14400000){
                return false
            }else{
                return true
            }
        case 'getTechnicians':
            return technicians.data

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
                console.log('view technicians after save',viewers('getTechnicians'))
                return true;
            }
        case 'removeTechnicians':
            let tech = {
                data:[]
            }
            localStorage.setItem('technicians',JSON.stringify(tech))
            return true;
        default:
            return {}
    };
};

