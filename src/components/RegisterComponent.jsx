import React, { useState } from 'react'
import OurNavbar from './OurNavbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const RegisterComponent = () => {
    // Declare hooks to hold the values inserted by the user
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretkey, setSecretkey] = useState("");

    // console.log(name)
    // capture the states your application moves in.
    const [loading, setLoading] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");


    // below is the redirecting timer:
    const [countdown, setCountdown] = useState(6);


    // Declare the navigate hook such that if a person successfully registers, he can be redirected to login page
    const navigate = useNavigate();


    // specify the url/Api endpoint where the data with go through
    const url = "https://kindergartenapi-olyn.onrender.com/api/admin/register"

    // below is the function to handle the submit event in registering an admin
    const handleSubmit = async (e) =>{
      // prevent the site from reloading when the register button is clicked
      e.preventDefault()

      // Update the loading hook with a message
      setLoading("Admin registraion in progress. Please wait...")

      try{
        //create a form data object to hold all the values
        const data = {name, email, password, secretkey};

        const res = await axios.post(url, data)

        console.log("Registration success: ", res.data)

        // upadate the loading hook back to default
        setLoading("")

        // Update the success hook with a message
        setSuccess(res.data.message)

        // alert("Registration successful")
        

        // Delay navigation for 6 seconds
       let counter = 6;
        const interval = setInterval(() => {
          counter--;
          setCountdown(counter);
          if (counter === 0) {
            clearInterval(interval);
            navigate("/login");
          }
        }, 1000);
                

        //clear the hooks 
        setName("");
        setEmail("");
        setPassword("");
        setSecretkey("");
      }
      catch(err){
    setLoading("");

        // then update the error hook with the backend message
        // if (err.response) {
        //     // backend returned an error response
        //     setError(err.response.data.message);
        // } else {
        //     // network or other error
        //     setError("Something went wrong. Please try again.");
        //   }

    // or alternatively: 
    setError(err.response?.data?.message || "Something went wrong");

}

    }



  return (
    <div>
        <OurNavbar/>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <form onSubmit={handleSubmit} className="card shadow p-4 bg-light rounded">
            <h1 className='text-center text-success'>Masomo Plus School</h1>
            <h2 className='text-center text-success mb-4'>Admin Register</h2>

            {loading ? <div className='alert alert-info'> {loading}</div> : null}
            {error ? <div className='alert alert-danger'> {error}</div> : null}
            {success && (<div className="alert alert-success"><h6>{success} — Redirecting in {countdown}s...</h6></div>)}

            <input 
            type="text" 
            placeholder='Enter your name here...'
            className='form-control mb-3'
            required
            value={name}
            onChange={(e) =>{setName(e.target.value)}}
             />
             {/* {name} */}

            <input type="email"
            placeholder='Enter your Email Address here...'
            className='form-control mb-3'
            required
            value={email}
            onChange={(e) =>{setEmail(e.target.value)}} />
            {/* {email} */}

            <input type="password"
             placeholder='Enter your password here...'
            className='form-control mb-3'
            required
            value={password}
            onChange={(e) =>{setPassword(e.target.value)}}   />

            {/* {password} */}

             <input 
            type="password" 
            placeholder='Enter the Admin Secret here...'
            className='form-control mb-3'
            required
            value={secretkey}
            onChange={(e) =>{setSecretkey(e.target.value)}} 
             /> 
             {/* {secretKey}   */}
             <br />


             <div className="d-grid mb-3">
                <button type='submit' className="btn btn-outline-success">Register</button>
             </div>
             <div className="text-center">
              <p>Already have an Account? {' '}
                <Link to={"/login"} className='text-decoration-none'>Login</Link>
              </p>
             </div>
          </form>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
    </div>
  )
}

export default RegisterComponent