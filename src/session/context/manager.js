import initSession from './session_init'
export function viewers(getter){
    switch(getter){
        case 'getUser':
           const session = JSON.parse(localStorage.getItem('session'));
            return session.data.user_
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
                console.log('entra aqui')
                localStorage.setItem('session',JSON.stringify(mutter));
                return true;
            }
        case 'removeUser':
            let pay = {
                    data:{
                        user_:{},
                        access_token:{}
                    }
                    
                } 
                localStorage.setItem('session',JSON.stringify(pay))
            return true
        default:
            return {}
    };
};

