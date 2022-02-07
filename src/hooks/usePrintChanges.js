import { useEffect } from "react"

export const usePrintChanges = (toPrint) =>{

    useEffect(()=>{
        const print =() =>{
            console.log(toPrint)
        }
        print()
    },[toPrint])
    

}
