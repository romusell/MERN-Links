import React,{useEffect, useState,useContext} from "react";
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPages = () => {
    const auth = useContext(AuthContext)
    const message = useMessage();
    const {loading,request,error,claerError} = useHttp();
    const [form, setForm] = useState({
        email:'', password:'',
    })
    const handlerChange = (event) => {
      setForm({...form, [event.target.name]:event.target.value});
    }
    const handlerRegister = async()=>{
        try{
         const data = await request('/api/auth/register','POST',{...form});
        message(data.message);
        }catch(e){}
    }
    const handlerLogin = async ()=>{
        try{
            const data = await request('/api/auth/login',"POST",{...form});
            auth.login(data.token, data.userId);
        }catch(e){}
    }
    useEffect(()=>{
         message(error);
         claerError();
    },[error,message,claerError]);
    useEffect(()=>{
      window.M.updateTextFields();
    },[])
    return (
        <div className="row">
          <div className="col s6 offset-s3">
              <h1>Сократи Ссылку</h1>
            <div className="card blue darken-1">
                <div className="card-content white-text">
                <span className="card-title">Авторизация</span>
                 <div>
                   <div className="input-field">
                    <input 
                        placeholder="Введите Email" 
                        id="email" 
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handlerChange}
                        className="yellow-input"/>
                    <label htmlFor="email">Email</label>
                   </div>
                   <div className="input-field">
                    <input 
                        placeholder="Введите Пароль" 
                        id="password" 
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handlerChange}
                        className="yellow-input"/>
                    <label htmlFor="password">Пароль</label>
                   </div>
                 </div>
                </div>
                <div className="card-action">
                 <button 
                  className="btn yellow darken-4" 
                  style={{marginRight:"10px"}}
                  disabled={loading}
                  onClick={handlerLogin}
                 >Войти
                 </button>
                 <button 
                  className="btn grey lighten-1 black-text"
                  onClick={handlerRegister}
                  disabled={loading}
                 >Регистрация
                 </button>
                </div>
            </div>
            </div> 
        </div>
    )
}