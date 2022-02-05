
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

let providers ={
    data:[]
}

let properties = {
    data:[]
}

let needs = {
    data:[]
}

let options = {
    data:[]
}


export default function initSession(){
    if(!localStorage.getItem('session')){
        localStorage.setItem('session', JSON.stringify(pay));
    }  
    if(!localStorage.getItem('technicians')){
        localStorage.setItem('technicians',JSON.stringify(technicians));
    }
    if(!localStorage.getItem('providers')){
        localStorage.setItem('providers',JSON.stringify(providers));
    }
    if(!localStorage.getItem('properties')){
        localStorage.setItem('properties',JSON.stringify(properties));
    }
    if(!localStorage.getItem('needs')){
        localStorage.setItem('needs',JSON.stringify(needs));
    }

    console.log('technicias aviables', localStorage.getItem('technicians'));
    console.log('index session',localStorage.getItem('session'));
};

