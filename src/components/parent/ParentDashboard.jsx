import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

const ParentDashboard = () => {

  // fetch the details of the parents
  const { token } = useContext(AuthContext);
  const [parent, setParent] = useState(null);
  const [childrenData, setChildrenData] = useState([]);

  const authHeader = {
    headers : {
      Authorization : `Bearer ${token}`
    }
  };

  // by using useEffect, we fetch all the details for the parents statistics
  useEffect(()=>{
    axios.get("https://kindergartenapi.onrender.com/api/parentDashboard", authHeader)
    .then(res => {
      setParent(res.data.parent);
      setChildrenData(res.data.children)
    })
    .catch(err =>{
      console.log("Error fetching Dashboard Statistics", err)
    })
  }, [])

  // console.log("The details fetched for the parent are: ", parent)

  if(!parent) return <div className="text-center mt-5"><h1 className="text-success">Loading....</h1></div>
  
  return (
    <div className='container my-5'>
      {/* parents info */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h3 className="card-title"> Welcome, {parent.name}</h3>
          <p className="card-text"><strong>Email: </strong> {parent.email}</p>
           <p className="card-text"><strong>Phone:</strong> {parent.phone}</p>
          <p className="card-text"><strong>Address:</strong> {parent.address}</p>
        </div>
      </div>


       {/* Children Section */}
      <h4 className="mb-3">👦 Your Children</h4>
      <div className="row">
        {childrenData.map(child => (
          <div className="col-md-6 mb-4" key={child._id}>
            <div className="card h-100 shadow-sm">
              <div className="row g-0">
                <div className="col-4">
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="img-fluid rounded-start h-100 object-fit-cover"
                  />
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h5 className="card-title">{child.name}</h5>
                    <p className="card-text mb-1"><strong>Admission No:</strong> {child.admissionNumber}</p>
                    <p className="card-text mb-1"><strong>Gender:</strong> {child.gender}</p>
                    <p className="card-text"><strong>Classroom:</strong> {child.classroom?.name || 'Not Assigned'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
 
    </div>
  )
}

export default ParentDashboard