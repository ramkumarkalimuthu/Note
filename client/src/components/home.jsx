import React from 'react'

const home = () => {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2>All Notes</h2>
        <p className="text-muted">
          Discover and explore notes shared by users.
        </p>
      </div>

      <div className="row">
        
          <div className="col-lg-4 col-md-6 mb-4" >
            <div className="card shadow-sm border-0 h-100">
              <img
                src="image"
                alt="title"
                className="card-img-top"
              />

              <div className="card-body">
                

                <p className="card-text text-muted">
                  Notes
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-secondary">
                    Author
                  </small>

                  <span className="badge bg-danger">
                    ❤️ Like
                  </span>
                </div>
              </div>

              <div className="card-footer bg-white border-0">
                <div className="d-flex justify-content-between align-items-center">
                  <small className="text-muted">
                    Data
                  </small>

                 
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
}

export default home