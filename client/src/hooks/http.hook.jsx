import {useState,useCallback} from 'react';

export const useHttp = () =>{
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    
    const request = useCallback( async (
        url, 
        method="GET",
        body=null,
        headers={},
        ) => {
       setLoading(true);
        try {
            if(body){
                body=JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
       const response = await fetch(url,{method,body,headers});
       const data = response.json();

       if (!response.ok){
        throw new Error (data.message || 'Чтото пошло не так');
       }
       setLoading(false);
       return data;  
    } catch (e) {
      console.log(e.message);
      setLoading(false);
      setError(e.message);
      throw e; 
     }      
    },[]);
    const claerError = useCallback( ()=> { setError(null) },[])
    
    return {loading,request,error,claerError}
}