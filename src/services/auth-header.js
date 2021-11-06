export default function authHeader(){
    const user = JSON.parse(localStorage.getItem("session"));

    

    if(user && user.data.access_token){

        return {'access_token': user.data.access_token};

    }else{
        return{};
    }
}