import axios from 'axios';
import authHeader from './auth-header';
import { mutators, viewers } from '../session/context/manager'



const API_URL = process.env.REACT_APP_API_URL;



class AreaService {
    registerArea(data) {
        
        return axios.post(API_URL + 'areas/setArea', data, { headers: authHeader() })
            .then((data) => {
                if (data.data.success) {
                    const {_id,inOperation,name, operator_id, program,technician_id} = data.data.data
                    const areas = viewers('getAreas')
                    const update_context = {data:[...areas,
                        {_id,
                        inOperation,
                        name,
                        operator_id,
                        program,    
                        technician_id
                        }
                    ]}


                    mutators('setAreas', update_context)
                    return data.data
                } else {
                    return data.data
                }

            }).catch((err) => {
                return err.message
            })
    }
    removeArea(id) {
        return axios.delete(API_URL + `areas/deleteArea/${id}`, { headers: authHeader() })
            .then((data) => {
                if (data.data.success) {
                    const areas = viewers('getAreas')
                    const filteredAreas = areas.filter(function (area) {
                        return area._id !== id
                    })
                    mutators('setAreas', filteredAreas)
                    return data.data
                }
                return data.data
            }).catch((err) => {
                return err.message
            })
    }
    getAreas() {
        return axios.get(API_URL + 'areas/all', { headers: authHeader() })
        .then((data)=>{
            if(data.data.success){
                mutators('setAreas',data.data)
                return data.data
            }
            return data.data

        }).catch((err)=>{
            return err.message
        })
    }

}



export default new AreaService();
