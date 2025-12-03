import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Classroom = () => {
  const { token } = useContext(AuthContext);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          'https://kindergartenapi.onrender.com/api/teachers/myClasses',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setClassrooms(data.classrooms || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, [token]);

  return (
    <div className="container my-2">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fw-bold">
            <Link to="/teacher-dashboard">Dashboard</Link>
          </li>
          <li className="breadcrumb-item active">My Classes</li>
        </ol>
      </nav>

      <h4 className="mb-4">My Classrooms</h4>

      {loading && <span className="text-info">Loading...</span>}

      <div className="row g-3">

        {/* If no classrooms */}
        {!loading && classrooms.length === 0 && (
          <div className="col-12">
            <div className="card text-center p-4" style={{ backgroundColor: '#f3f3f3' }}>
              <h5 className="mb-2">No Classrooms Available</h5>
              <p className="text-muted">You currently have 0 classrooms assigned.</p>
            </div>
          </div>
        )}

        {/* If classrooms exist */}
        {classrooms.map(cls => (
          <div key={cls._id} className="col-md-4">
            <div className="card h-100" style={{ backgroundColor: "rgb(208, 222, 215)" }}>
              <div className="card-body">
                <h5>{cls.name}</h5>
                <p className="mb-1">Grade: {cls.gradeLevel}</p>
                <p className="mb-1">Year: {cls.classYear}</p>
                <p>Students: {cls.students?.length || 0}</p>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Classroom;
