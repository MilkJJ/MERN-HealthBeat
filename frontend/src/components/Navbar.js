
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h2>HealthBeat: Fitness & Wellness</h2>
        </Link>
        
          <nav>
        {user && (
            <div>
              <Link to="/">Workout</Link>
            </div>
          )}
        {user && (
            <div>
              <a class="nav-link" href="/weather">Weather</a>
            </div>
          )}
          {user && (
            <div>
              <a class="nav-link" href="/">Music</a>
            </div>
          )}
          {user && (
            <div>
              <a class="nav-link" href="/food">Recipe</a>
            </div>
          )}
          </nav>
          <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar