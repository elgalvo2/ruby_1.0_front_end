
let pay = {
    data:{
        user_:{},
        access_token:{}
    }
    
} 



export default function initSession(){
    if(!localStorage.getItem('session')){
        localStorage.setItem('session', JSON.stringify(pay));
    }  

    console.log('index session',localStorage.getItem('session'))
};

