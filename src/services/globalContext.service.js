import ProviderService from "./provider.service";
import AdminService from "./admin.service";
import NeedService from "./need.service";
import PropertyService from "./properties.service";
import { mutators } from "../session/context/manager";
import axios from "axios";


class ContextService{

    adminContext(context){
        console.log(context)
        mutators('setTechnicians',{data:context.technicians})
        mutators('setNeeds',{data:context.needs})
        mutators('setProviders',{data:context.providers})
        mutators('setProperties',{data:context.properties})
        mutators('setOperators',{data:context.operators})
        mutators('setAreas',{data:context.areas})
        mutators('setTasks',{data:context.tasks})
    }

    technicianContext(context){
        mutators('setTasks',context.tasks)
        mutators('setAreas',context.areas)
        mutators('setOperators',context.operators)
    }

    auoContext(context){
        mutators('setTechnicians',context.technicians)
        mutators('setNeeds',context.needs)
        mutators('setProviders',context.providers)
        mutators('setProperties',context.properties)
        mutators('setOperators',context.operators)
        mutators('setAreas',context.areas)
        mutators('setTasks',context.tasks)
    }

    operatorContext(context){
        mutators('setTasks',{data:context.tasks})
        mutators('setTechnicians',{data:context.technicians})
        console.log('contex',context)
        mutators('setAreas',{data:context.areas})
    }

    
}

export default new ContextService();