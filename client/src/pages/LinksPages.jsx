import {useState,useContext,useCallback,useEffect} from 'react';
import { Preloader } from '../components/Preloader';
import {AuthContext} from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook'; 
import {LinksList} from '../components/LinksList'

export const LinksPages =()=>{
    const [links,setLinks] = useState([]);
    const {loading,request} = useHttp();
    const {token} = useContext(AuthContext);
    const fetchLincks = useCallback( async ()=>{
        try{
         const fechetd = await request('/api/link', "GET",null,{
            Authorization: `Bearer ${token}` 
         });
         setLinks(fechetd);
        }catch(e){}
    },[token,request]);
    useEffect(()=>{
      fetchLincks()
    },[fetchLincks]);
    if(loading){
        return <Preloader/>
    }
    return (
        <>
        {!loading && <LinksList links={links} />}
        </>
    );
}