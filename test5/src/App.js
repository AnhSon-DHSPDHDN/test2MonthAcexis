import React, {Suspense, lazy} from 'react'
import routes from './config/routes'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
const Menu = lazy(() => import('./components/Menu'));
const PageNotFound = lazy(() => import('./components/Pagenotfound'));

function App () {
  return (
    <div>
      {/* Bắt buộc phải sử dụng dynamic import dựa theo
          file routes config (khi thêm bớt component thì chỉ sửa file config)
          không cần sửa code tại đây
      */}
      { 
        <Router>
          <Suspense fallback = {<div>Loading...</div>}>
            <Menu/>
            <Switch>
              {
                routes.map((config, index) => {
                  return(
                    <Route key = {index} 
                           path = {config.path} 
                           exact = {config.exact} 
                           component = {config.component}
                    />
                  )
                })
              }
              <Redirect exact from = "/" to = "/login"/>
              <Route path = '/*' component = {PageNotFound}/>
            </Switch>
          </Suspense>
        </Router>
      }
    </div>
  )
}

export default App