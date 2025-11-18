import { Link } from 'react-router-dom';
import "./css/AccessDenied.css";

const NotAuthorized = () => {

   



  return (
    <div className="access-denied-container d-flex flex-column align-items-center justify-content-center text-center">
      <div className="access-denied-card shadow-lg p-5 rounded">
        
        <h1 className="display-4 fw-bold text-danger">Access Denied</h1>
        <p className="lead text-muted mb-4">
          You don’t have permission to view this page.
        </p>
        <Link to={'/'}>
        <button className="btn btn-outline-danger btn-lg" >
          Go Home
        </button>
        </Link>
      </div>
      <footer className="mt-5 text-muted small">
        &copy; {new Date().getFullYear()} Your Website Name
      </footer>
    </div>
  )
}

export default NotAuthorized