import React from 'react'
import { Link } from 'react-router-dom';


const register = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Register</h3>

              <form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                  
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                  
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="tel"
                    name="contact"
                    className="form-control"
                    placeholder="9876543210"
                    
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    className="form-control"
                    accept="image/*"
                   
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                >
                  Register
                </button>
              </form>

            </div>
            <p className="text-center mt-3 mb-3">
  Already have an account?
  <Link to="/login" className="text-decoration-none ms-2 fw-bold">
    Login
  </Link>
</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default register