import React, { Component } from 'react'
import {Link,Redirect} from 'react-router-dom'

class  Menu extends Component {
  constructor(props){
    super(props)
    this.state={
      pass:localStorage.getItem('token')
    }
  }
  onLogout=()=>{
    localStorage.removeItem('token');
    this.setState({
      pass:''
    })
  }
  render(){
    if(this.state.pass===''){
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <h3>Menu</h3>
        <ul id='menu'>
          <li>
            <Link to='/dashboard'>/dashboard</Link>
          </li>
          <li>
            <Link to='/setting'>/setting</Link>
          </li>
          <li><button data-test='logout__btn' onClick={this.onLogout}>Logout</button></li>
        </ul>
      </div>
    )
  }
}
export default Menu