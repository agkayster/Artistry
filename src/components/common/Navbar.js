import React from 'react'
import { Link, withRouter } from 'react-router-dom'


import Auth from '../../lib/Auth'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false
      // isLoggedIn: false
    }

    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    // this.handleLogin = this.handleLogin.bind(this)
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  // handleLogin() {
  //   this.setState({
  //     isLoggedIn: true
  //   })
  // }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render(){
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <i className="fab fa-modx"></i>
            </Link>

            <a
              role="button"
              className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>

          </div>

          <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-start">
              <Link to="/artists" className="navbar-item">Browse</Link>
              {Auth.isAuthenticated() && <Link to="/artists/new" className="navbar-item">Add</Link>}
            </div>
            <div className="navbar-end">
              {!Auth.isAuthenticated() && <Link to="/register" className="navbar-item">Register</Link>}
              {!Auth.isAuthenticated() && <Link to="/login" className="navbar-item">Login</Link>}
              {Auth.isAuthenticated() && <a onClick={this.logout} className="navbar-item">Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
