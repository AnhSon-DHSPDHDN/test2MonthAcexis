import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class  Menu extends Component {

  onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  render(){
    return (
      <div>
        <h3>Menu</h3>
        <ul id = 'menu'>
          <li>
            <Link to = '/dashboard'>/dashboard</Link>
          </li>
          <li>
            <Link to = '/setting'>/setting</Link>
          </li>
          <li>
            <button data-test='logout__btn' onClick={this.onLogout}>Logout</button>
          </li>
        </ul>
      </div>
    )
  }
}
export default Menu