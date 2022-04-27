import axios from 'axios'
import { mutators } from '../session/context/manager'
import authHeader from './auth-header';
import globalContextService from './globalContext.service';

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
    login(matricula, password) {

        return axios
            .post(API_URL + "account/login", { matricula, password })
            .then((response) => {
                if (response.data.success) {
                    mutators('setUser', response.data);
                    const {role} = response.data.data.user_;
                    const {context} = response.data
                    console.log('context',context)
                    if(role==='ADMIN' || role==='SUDO' || role==='AUO'){
                        globalContextService.adminContext(context)
                    }else if(role==='TECNICO'){
                        globalContextService.technicianContext(context)
                    }else if(role==='AUO'){
                        globalContextService.auoContext(context)
                    }else if(role==='OPERADOR'){
                        globalContextService.operatorContext(context)
                    }
                }

                return response.data;
            }).catch((err) => {
                return err
            });
    }

    logout() {

        mutators('removeUser', "");
        mutators('removeTechnicians', "")
        mutators('removeTasks', "")
        mutators('removeNeeds', "")
        mutators('removeProperties', "")
        mutators('removeOperators', "")
        mutators('removeAreas', "")
        return true
    }
}

export default new AuthService();