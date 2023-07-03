import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// pages & components
import Home from './pages/Home'
import Weather from './pages/Weather'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import MuscleGroups from './pages/MuscleGroups'
import ExerciseDetails from './components/ExerciseDetails';
import FavoriteWorkouts from './components/FavoriteWorkouts';
import Favorites from './pages/Favorites';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            {/* <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            /> */}
            <Route 
              path="/weather" 
              element={user ? <Weather /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/weather" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/weather" />} 
            />
            <Route
              path="/" //muscle-groups
              element={user ? <MuscleGroups /> : <Navigate to="/login" />}
            />
            <Route
              path="/exercises/:exerciseName"
              element={user ? <ExerciseDetails /> : <Navigate to="/login" />}
            />
            <Route
              path="/favorites"
              element={user ? <Favorites /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
