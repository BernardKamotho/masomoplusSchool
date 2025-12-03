import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <div
        className="text-white d-flex flex-column p-3"
        style={{
          width: '250px',
          background: 'linear-gradient(135deg,rgb(12, 79, 46),rgb(54, 66, 159))',
        }}
      >      
      <h4 className="text-center mb-4">
        <i className="bi bi-speedometer2 me-2"></i>Teacher Panel
      </h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/teacher-dashboard"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link bg-success text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-grid me-2"></i> Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/teacher-dashboard/classroom"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-success text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-card-list me-2"></i> Classroom
          </NavLink>
        </li> 

                    

        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link bg-danger text-white fw-bold' : 'nav-link text-white'
            }
          >
            <i className="bi bi-box-arrow-right me-2"></i> Home
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