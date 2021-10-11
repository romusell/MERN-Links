import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {CreatePages} from './pages/CreatePages';
import {LinksPages} from './pages/LinksPages';
import {DetailPages} from './pages/DetailPages';
import {AuthPages} from './pages/AuthPages';

export const useRoutes =(isAuthenticated)=>{
if(isAuthenticated){
    return(
      <Switch>
        <Route path="/links" exact>
            <LinksPages />
        </Route>  
        <Route path="/create" exact >
            <CreatePages />
        </Route>
        <Route path="/detail/:id">
             <DetailPages />  
        </Route>
        <Redirect to="/create" />   
      </Switch>
    )
}
return(
     <Switch>
       <Route exact path="/">
          <AuthPages />
       </Route>   
       <Redirect to="/" /> 
     </Switch> 
)
}