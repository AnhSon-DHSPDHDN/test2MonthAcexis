import React from 'react'
import { Redirect } from 'react-router-dom'

const Dashboard = () => {
  let isLogged = localStorage.getItem('token');
  if( isLogged === null){
    return <Redirect to="/login"/>
  }
  return (
    <div>
      <p data-test='db__welcome'>
        Welcome to dashboard page
      </p>
    </div>
  )
}

export default Dashboard