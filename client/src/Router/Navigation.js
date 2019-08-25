import React from "react"
import {withRouter, NavLink } from "react-router-dom";
import "./Navigation.css"

export class NavigationComponet  extends React.Component { 
  
  
  render(){
    return (
      <div>
        <div className="logobox" >
          <img src="/usgslogo.png" alt="USGSlogo" className="NavLogo" />
          <img
            src="/westernlogoallwhite.png"
            alt="westernlogo"
            className="NavLogo"
          />
        </div>
        
        <nav className="Nav">
          <ul>
            <li>
              <NavLink activeClassName="activeRoute" exact to="/">
                Map
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeRoute" to="/about">
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export const Navigation = withRouter(props => <NavigationComponet {...props}/>);