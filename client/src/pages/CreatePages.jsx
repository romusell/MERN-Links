import React,{useState,useEffect,useContext} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useHistory} from 'react-router-dom';
import  {AuthContext} from '../context/AuthContext'

export const CreatePages = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const {request} = useHttp();
    const [link,setLink] = useState('');
    
    const handlePress = async (event) => {
        if(event.key === 'Enter'){
         try{   
          const data = await request(
              '/api/link/generate',
               'POST',
               { from: link }, 
               {Authorization: `Bearer ${auth.token}`}
         );
          history.push(`/detail/${data.link._id}`);
         } catch(e){}
        }     
    }
    
   useEffect( () => {
     window.M.updateTextFields();
   },[])
    return (
        <div className="row">
          <div className="col s8 offset-s2" style={{paddingTop:'2rem'}}>
          <div className="input-field">
                    <input 
                        placeholder="Введите Ссылку" 
                        id="link" 
                        type="text"
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={handlePress}
                        />
                    <label htmlFor="link">Введите Ссылку</label>
                   </div>   
          </div>  
        </div>
    )
}