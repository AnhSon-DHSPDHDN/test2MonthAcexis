import React, { Component } from 'react'

class Setting extends Component {
  render(){
    let search = this.props.location.search
    let params = new URLSearchParams(search)
    let foo = params.get('section');
    if(foo){
      return(
        <div>
          Setting page - Section: {foo}
        </div>
      )
    }
    return <div>
    {/* Setting page - Section: FooSection */}
    {/* Setting page */}
    Setting page
  </div>
  }
}

export default Setting