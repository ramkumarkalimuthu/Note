import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
  <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Login</h3>

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
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                   
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

            </div>
            <p className="text-center mt-3 mb-3">
  Don't have an account?
  <Link to="/register" className="text-decoration-none ms-2 fw-bold">
    Register
  </Link>
</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login