import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Route, Switch} from 'react-router-dom'
import './style.scss'
import 'react-toastify/dist/ReactToastify.css'
import 'bulma'
import '@fortawesome/fontawesome-free/js/all.js'
import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'



import ArtistsIndex from './components/artists/Index'
import ArtistsShow from './components/artists/Show'
import ArtistsEdit from './components/artists/Edit'
import ArtistsNew from './components/artists/New'

import Register from './components/auth/Register'
import Login from './components/auth/Login'





class App extends React.Component{


  render(){
    return(
      <div>
        <HashRouter>
          <Navbar />

          <Switch>
            <SecureRoute path="/artists/:id/edit" component={ArtistsEdit} />
            <SecureRoute path="/artists/new" component={ArtistsNew} />
            <Route path="/artists/:id" component={ArtistsShow}/>
            <Route path="/artists" component={ArtistsIndex}/>


            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />

            <Route path="/" component={Home} />
            
          </Switch>

        </HashRouter>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
