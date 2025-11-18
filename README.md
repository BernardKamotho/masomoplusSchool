🏫 Masomo School Management System (React + Node + Express)
This project is a school management system built using React for the frontend and Node.js/Express for the backend. It features:

✅ Role-based login
🔒 Protected admin dashboard
📂 Separate views for Admin, Teachers, and Parents
📁 Project Structure Overview
alt text

🧱 Step 1: Initialize the Project
Create a new React project and install required dependencies:
npx create-react-app@latest masomo-school cd masomo-school

npm install axios react-router-dom bootstrap jwt-decode bootstrap-icons

🌐 Step 2: Create the Landing Page – HomeComponent
App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from './components/HomeComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
📄 File: src/components/HomeComponent.jsx Create a simple home/landing page visible to all users. alt text

import React from 'react';
import '../css/home.css'; // Optional: for extra styling
import { Link } from 'react-router-dom';

const HomeComponent = () => {
  return (
    <div className="homepage">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand"to={'/'} >Masomo School</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#cbc">CBC Curriculum</a></li>
              <li className="nav-item"><a className="nav-link" href="#why-masomo">Why Us</a></li>
              <li className="nav-item"><Link className="nav-link" to={"/login"}>Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero position-relative text-white">
        <img src="images/banner1.jpg" alt="Hero Banner" className="w-100 img-fluid" style={{ maxHeight: '500px', objectFit: 'cover' }} />
        <div className="hero-text position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-50 p-4 rounded">
          <h1>Empowering Minds Through Competence</h1>
          <p>Welcome to Masomo School – Nurturing Future Leaders in Kenya.</p>
          <a href="#cbc" className="btn btn-light">Learn More About CBC</a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-success">About Masomo School</h2>
          <p>
            Masomo School is a leading institution dedicated to providing quality education rooted in the Competency-Based Curriculum (CBC) as set by the Kenyan Ministry of Education.
            We focus on holistic development, creativity, and real-world skills for tomorrow’s leaders.
          </p>
        </div>
      </section>

      {/* CBC Section */}
      <section id="cbc" className="py-5">
        <div className="container">
          <h2 className="text-success">Understanding CBC in Kenya</h2>
          <p>
            The Competency-Based Curriculum (CBC) was introduced in Kenya to replace the 8-4-4 system. It focuses on nurturing learners' talents and abilities through practical,
            skill-oriented learning experiences. CBC emphasizes learner-centered teaching and aims at developing competencies that align with national development goals.
          </p>
          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">✔️ Focus on Skills & Talents</li>
            <li className="list-group-item">✔️ Learner-Centered Approach</li>
            <li className="list-group-item">✔️ Real-Life Problem Solving</li>
            <li className="list-group-item">✔️ Continuous Assessment</li>
          </ul>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-masomo" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-success text-center mb-4">Why Choose Masomo School?</h2>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Experienced Teachers</h3>
                  <p className="card-text">Our educators are trained in CBC and committed to student growth.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Modern Facilities</h3>
                  <p className="card-text">We provide state-of-the-art labs, libraries, and learning spaces.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title">Co-Curricular Activities</h3>
                  <p className="card-text">Students explore sports, arts, tech, and leadership beyond books.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5 text-center">
        <div className="container">
          <h2 className="text-success">Join Masomo School Today!</h2>
          <p>Enroll your child in a school that builds future-ready citizens.</p>
          <a href="/admissions" className="btn btn-success">Apply Now</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0">&copy; {new Date().getFullYear()} Masomo School. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomeComponent;
🧾 Step 3: Register Component – RegisterComponent
alt text

📄 File: src/components/RegisterComponent.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
  const url = 'http://localhost:3000/api/login/admin_reg';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading('Registering Admin Account...');

    try {
      const data = { name, email, password, secretKey };
      const res = await axios.post(url, data);

      console.log("registratio success:", res.data);

      setLoading('');
      setSuccess('Registration successful! Redirecting to login...');
      
      alert('Registration successful! You will be redirected to login.');
      navigate('/login');

    } catch (err) {
      setLoading('');
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <form onSubmit={handleSubmit} className="shadow card p-4 bg-light rounded">
        <h1 className="text-center text-success">Masomo School</h1>
        <h2 className="text-center mb-4 text-success">Register</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {success ? <div className="alert alert-success">{success}</div> : null}
        {loading ? <div className="alert alert-info">{loading}</div> : null}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          required
        />

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-success">Register</button>
        </div>

        <div className="text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-decoration-none">Login here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterComponent;
🧾 Step 4: Login Component – LoginComponent
alt text

📄 File: src/components/LoginComponent.jsx

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();
    //from context get the function to change the state of token and user   
  const {setToken,setUser}=useContext(AuthContext)

  const url = "http://localhost:3000/api/login/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading('Logging in...');

    try {
        const data = { email, password };
        const res = await axios.post(url, data);

        const { token, user } = res.data;

        // Store token and user info in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // console.log("Login success:", message);
        setToken(token)
        setUser(user)


        // Role-based redirection
        if (user.role === 'admin') {
        navigate('/admin-dashboard');
        } else if (user.role === 'teacher') {
        navigate('/teacher-dashboard');
        } else if (user.role === 'parent') {
        navigate('/parent-dashboard');
        } else {
        navigate('/'); 
        }

    } catch (error) {
        console.log(error)
      setLoading('');
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '500px' }}>
      <form onSubmit={handleSubmit} className="shadow card p-4 bg-light rounded">
        <h1 className="text-center text-success">Masomo School</h1>
        <h2 className="text-center mb-4 text-success">Login</h2>

        {error ? <div className="alert alert-danger">{error}</div> : null}
        {loading ? <div className="alert alert-info">{loading}</div> : null}

        <input
          type="email"
          className="form-control mb-3 mt-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="d-grid mb-3">
          <button type="submit" className="btn btn-success">Login</button>
        </div>

        <div className="text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-decoration-none">Register here</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;
🔐 Step 5: Why Context is Needed
Context is used because after login, the state needs to persist globally, and React alone doesn’t remember authentication unless it’s passed through context.

📄 Create Context File: src/context/AuthContext.jsx

import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate(); 

    // Initialize state from localStorage
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));

    // Logout function using a callback
    const logout = useCallback(() => {
        localStorage.clear();
        setToken('');
        setUser(null);
        navigate('/login'); 
    }, [navigate]);

    // Check if the token is expired
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();

                if (isExpired) {
                    logout();
                }
            } catch (error) {
                logout();
            }
        }
    }, [token, logout]);

    return (
        <AuthContext.Provider value={{ token, user, logout, setToken, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
🔐 Step 5: Protecting Routes with ProtectedRoute Component
To restrict access to certain routes based on the user’s role, we need to create a ProtectedRoute component. This component will check if the user is logged in and whether they have the required role to access a particular page. If not, they will be redirected to either the login page or a "Not Authorized" page.

**📄 File: src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // adjust path if needed

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Role not allowed
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
How It Works: Login Check: The component first checks if the user is logged in by looking at the user object from the AuthContext. If no user is found, the component redirects the user to the /login page.

Role-Based Check: If the user is logged in but their role doesn't match the allowedRoles array, they are redirected to a /not-authorized page.

Children Rendering: If the user is logged in and has the correct role, it renders the children components (the protected content).

🔐 Step 6: Protecting Routes implementation
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import NotFound from './components/NotFound';
import NotAuthorized from './components/NotAuthorized';
import RegisterComponent from './components/RegisterComponent';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import Teachers from './components/admin/Teachers';
import Parents from './components/admin/Parents';
import Classes from './components/admin/Classes';
import Student from './components/admin/Student';
import AdminDashboard from './components/admin/AdminDashboard';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <header className="App-header">
          </header>
        </div>
        <Routes>
            <Route path='/' element={<HomeComponent/>}/>

            {/* Admin Protected Routes */}
            <Route path='/admin-dashboard' 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminLayout/>
                  </ProtectedRoute>
                }>
                <Route path='' element={<AdminDashboard />} />
                <Route path='teachers' element={<Teachers />} />
                <Route path='parents' element={<Parents />} />
                <Route path='students' element={<Student />} />
                <Route path='classes' element={<Classes />} />
            </Route>
            
            <Route path='/login' element={<LoginComponent/>}/>
            <Route path='/register' element={<RegisterComponent/>}/>

            {/* defaults */}
            <Route path='/not-authorized' element={<NotAuthorized/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
🔐 Step 7: Admin Components which includes the sidebar, navbar and main area
the below image shows the dashboard alt text

🔐 Step 8: Sidebar
import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className="bg-dark text-white d-flex flex-column p-3" style={{ minHeight: '100vh', width: '250px' }}>
      <h4 className="text-center mb-4">
        <i className="bi bi-speedometer2 me-2"></i>Admin Panel
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin-dashboard"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-grid me-2"></i> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/students"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-person-lines-fill me-2"></i> Students
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/parents"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-people-fill me-2"></i> Parents
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/teachers"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-person-badge me-2"></i> Teachers
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin-dashboard/classes"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-secondary text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-journal-bookmark me-2"></i> Classes
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-danger text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </NavLink>
        </li>
      </ul>

      <hr />
      <div className="text-center small">
        <span className="text-light">© 2025 Masomo</span>
      </div>
    </div>
  );
};

export default SideBar;
🔐 Step 9: Navbar
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import 'bootstrap-icons/font/bootstrap-icons.css';

const DashboardNavbar = () => {
  // get the logged in user and the logout function using useContect hook from AuthContext
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 py-2 mb-3 rounded">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <span className="navbar-brand fw-bold text-success fs-4">
          <i className="bi bi-mortarboard-fill me-2"></i>
          Masomo School
        </span>

        <div className="d-flex align-items-center">
          <span className="me-3 text-muted">
            <i className="bi bi-person-circle me-1"></i>
            <strong>{user?.name}</strong> <small className="text-muted">({user?.role})</small>
          </span>

          <button className="btn btn-sm btn-outline-danger d-flex align-items-center" onClick={logout}>
            <i className="bi bi-box-arrow-right me-1"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
🔐 Step 10: Admin Layout
Outlet from router is used to show the child components dynamically

  import React from 'react';
  import { Outlet } from 'react-router-dom';
  import DashboardNavbar from '../DashboardNavbar';
  import SideBar from './SideBar';

  const AdminLayout = () => {
    return (
      <div className="d-flex">
        <SideBar />

        <div className="flex-grow-1">
          <DashboardNavbar /> 

          {/* Main area where the routed page content will be displayed */}
          <main className="p-4">
            {/* Outlet renders the matched child route’s element */}
            <Outlet />
          </main>
        </div>
      </div>
    );
  };

  export default AdminLayout;