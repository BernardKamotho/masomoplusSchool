import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const TeacherDashboard = () => {
  const [teacherData, setTeacherData] = useState(null);
  const { token, user } = useContext(AuthContext);

  console.log("the teacher data are: ",teacherData)
  console.log("the details of the users are: ", user)

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        const res = await axios.get(`https://kindergartenapi.onrender.com/api/teacherDashboard/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('response to load teacher dashboard:',res.data)
        setTeacherData(res.data);
      } catch (err) {
        console.error('Failed to load teacher dashboard:', err);
      }
    };

    if (user?.id) {
      fetchTeacherData();
    }
  }, [user, token]);

  if (!teacherData) return <p className="text-center mt-5">Loading dashboard...</p>;

  const { totalAssignments, totalClasses, totalStudents } = teacherData;

  return (
    <div className="container my-4">
      <h2 className="text-success text-center mb-4">Dashboard Overview</h2>

      {/* Dashboard Stats */}
      <div className="row mb-4">
        <div className="col-md-4">
            <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
                <div className="icon-circle bg-warning text-white mb-3">
                <i className="bi bi-journal-bookmark fs-3"></i>
                </div>
                <h6 className="text-muted">Classes</h6>
                <h2 className="fw-bold text-dark">{totalClasses}</h2>
            </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
                <div className="icon-circle bg-success text-white mb-3">
                <i className="bi bi-people-fill fs-3"></i>
                </div>
                <h6 className="text-muted">Students</h6>
                <h2 className="fw-bold text-dark">{totalStudents}</h2>
            </div>
            </div>
        </div>

        <div className="col-md-4">
            <div className="card h-100 shadow-lg rounded-4 bg-light hover-card">
            <div className="card-body text-center">
                <div className="icon-circle bg-info text-white mb-3">
                <i className="bi bi-pencil-square fs-3"></i>
                </div>
                <h6 className="text-muted">Assignments</h6>
                <h2 className="fw-bold text-dark">{totalAssignments}</h2>
            </div>
            </div>
        </div>
        </div>


    </div>
  );
};

export default TeacherDashboard;