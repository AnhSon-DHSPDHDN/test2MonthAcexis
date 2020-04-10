import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      password:''
    }
  }
  onLogin=(e)=>{
    e.preventDefault()
    let password=document.querySelector('.pass').value;
    if(password==='123'){
      localStorage.setItem('token','123');
      this.setState({
        password:'123'
      })
    }
    document.querySelector('.pass').value='';
  }
  render(){
    if(localStorage.getItem('token')){
      return <Redirect to="/dashboard"/>
    }
    return (
      <div>
        {/* 
        TODO: Your login page implementation
        */}
        <form>
          <input className="pass" data-test='login__pwd' type='password' />
          <button data-test='login__submit' type='submit' onClick={this.onLogin}>login</button>
        </form>
      </div>
    )
  }
}

export default Login