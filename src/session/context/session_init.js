
let pay = {
    data:{
        user_:{},
        access_token:{},
        session_created_date:0,
    }
} 

let technicians = {
    data:[]
}



export default function initSession(){
    if(!localStorage.getItem('session')){
        localStorage.setItem('session', JSON.stringify(pay));
    }  
    if(!localStorage.getItem('technicians')){
        localStorage.setItem('technicians',JSON.stringify(technicians));
    }

    console.log('technicias aviables', localStorage.getItem('technicians'));
    console.log('index session',localStorage.getItem('session'));
};

