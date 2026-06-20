import React from 'react'

const profile = () => {
  return (
     <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow border-0">
            <div className="card-body p-4">

              {/* Profile Header */}
              <div className="text-center">
                <img
                  src="profileImage"
                  alt="profileImage"
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                />
                <h3>username</h3>        

                 <button className="btn btn-primary me-2">
                  Edit Profile
                </button>
              </div>

             

              {/* User Details */}
              <div className="row mt-4">
                <div className="col-md-6 mb-3">
                  <strong>Email</strong>
                  <p>email</p>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Phone</strong>
                  <p>Phone</p>
                </div>
                <div className="col-md-6 mb-3">
                  <strong>Password</strong>
                  <p>Password</p>
                </div>            

            </div>
          </div>

          

        </div>
      </div>
    </div>
    </div>
  );
}

export default profile