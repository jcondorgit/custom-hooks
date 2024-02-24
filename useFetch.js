import { useEffect, useState } from "react"

export const useFetch = ( url ) => {

    const [ state, setState ] = useState({
        data:'',
        isLoading:true,
        hasHerror:false,
        error:null,
    })

    const getFetch = async ()=>{

        const resp = await fetch(url);

        await new Promise( resolve => setTimeout(resolve, 1000));
        
        if (!resp.ok) {
            setState({
                data:null,
                isLoading: false,
                hasHerror: true,
                error:{
                    code: resp.status,
                    message: resp.statusText,
                },
            })            
            return;
        }

        const data = await resp.json()
        setState({
            data,
            isLoading: false,
            hasHerror: false,
            error:null
        })

    }

    useEffect(() => {
      getFetch()
    }, [url])
    
    return{
        data:state.data,
        isLoading:state.isLoading,
        hasHerror:state.hasHerror,
    }
}
