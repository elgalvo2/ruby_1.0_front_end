import ProviderService from "./provider.service";
import AdminService from "./admin.service";
import NeedService from "./need.service";
import PropertyService from "./properties.service";
import { mutators } from "../session/context/manager";
import axios from "axios";


class ContextService{
    async setProviders(){
        const providers = await ProviderService.getProviders();
        return mutators('setProviders',providers);
    }
    async setProperties(){
        const properties = await PropertyService.getProperties();
        return mutators('setProperties',properties)
    }
    async setNeeds(){
        const needs = await NeedService.getNeeds();
        return mutators('setNeeds',needs)
    }
}

export default new ContextService();