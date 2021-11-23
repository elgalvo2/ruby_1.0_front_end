import React, {useEffect, useState} from 'react'
import Register_user_form from './commons/Register_user_form';


export default function Admin_register_user ({to_signup}){
    return(
        <Register_user_form to_signup={to_signup}></Register_user_form>
    )
}