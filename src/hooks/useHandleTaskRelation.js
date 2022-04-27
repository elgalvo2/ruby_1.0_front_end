import {useState, useEffect} from 'react'
import {viewers} from '../session/context/manager'
import Relations_service from '../services/relations.service'
import adminService from '../services/admin.service'

export function useHandleTaskRelation(){
    const [areasCard,setAreasCard] = useState([])
    const [tecnicosCard, setTecnicosCard] = useState([])
    const [currentRequest, setCurrentRequetes] = useState(false)

    useEffect(()=>{
        const getContext =()=>{
            const areas = viewers('getAreas');
            const technicians = viewers('getTechnicians');
            const operators = viewers('getOperators');
            const tasks = viewers('getTasks')

            var ready_areas = areas.map((area)=>{
                const technician = technicians.find(function(tech){
                    return tech._id = area.technician_id
                })
                const operator = operators.find(function(opera){
                    return opera._id = area.operator_id
                })
                const task = tasks.filter(function(task){
                    return (task.done === false && task.area_id === area._id)
                })
                area.operator_name = operator.firstName + ' ' + operator.lastName
                area.technician_name = technician.firstName + ' ' + technician.lastName 
                area.orders = task

                return area
            })

            var ready_technicians = technicians.map((tech)=>{
                const are = areas.filter(function(area){
                    return (area.technician_id === tech._id)
                })
                tech.areas = are

    
                return tech
            })

            var filtered_tech = ready_technicians.filter(function(tech){
                return tech.areas.length>0
            })

            

            setAreasCard(ready_areas)
            setTecnicosCard(filtered_tech)

            
        }
        getContext()
    },[])


    const getTaskRelationByArea= (area_id) =>{
        
        if(getAreaTaskCantity(area_id)!==0 && !currentRequest){
            setCurrentRequetes(true)
            adminService.getTaskRelationByArea(area_id)
            .then((data)=>{
                
                    console.log(data)
                    setCurrentRequetes(false)
                
            }).catch((err)=>{
                console.log(err)
                setCurrentRequetes(false)
            })
        }else if(getAreaTaskCantity(area_id)===0){
            console.log('Esta area no tiene ordenes que imprimir')
        }else if(currentRequest){
            console.log('Hay una peticion pendiente de resolver. por favor espere')
        }
    }

    
    const getTaskRelationByTechnician= (technician_id) =>{

        if(getTechnicianTaskCantity(technician_id)!==0 && !currentRequest){
            setCurrentRequetes(true)
            adminService.getTaskRelationByTechnician(technician_id)
            .then((data)=>{
                
                    console.log(data)
                    setCurrentRequetes(false)
                
            }).catch((err)=>{
                console.log(err)
                setCurrentRequetes(false)
            })   
        }else if(getTechnicianTaskCantity(technician_id)==0){
            console.log('Este tecnico no tiene ordenes que imprimir')
        }else if(currentRequest){
            console.log('Hay una peticion pendiente de resolver')
        }

    }

    const getTechnicianTaskCantity = (technician_id) => { 
        var technician = tecnicosCard.filter(function(tec){
            return tec._id === technician_id
        })
        
        return technician[0].areas.map((area)=>area.orders.length).reduce((prev,curr)=>prev+curr,0)
        
    }

    getTechnicianTaskCantity("620c1e21a29ef6596c4404a7")

    const getAreaTaskCantity = (area_id='')=>{
        var area = areasCard.filter(function(are){
            return are._id === area_id
        })
        return area[0].orders.length
    }

    

    return [areasCard,tecnicosCard,getTaskRelationByArea,getTaskRelationByTechnician]
}   