import React from 'react'
import { Link } from 'react-router-dom';

const dashboard = () => {
  return (
      <div className="container py-5">
      {/* Header */}
      <div className="mb-4">
        <h2>Dashboard</h2>
        <p className="text-muted">
          Welcome back! Here's an overview of your notes.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="row g-4">

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h1>total_notes</h1>
              <p className="text-muted mb-0">Total Notes</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h1>active_notes</h1>
              <p className="text-muted mb-0">Active Notes</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h1>inactive_notes</h1>
              <p className="text-muted mb-0">Inactive Notes</p>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <h1>total_likes</h1>
              <p className="text-muted mb-0">Total Likes</p>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Activity */}
      <div className="card border-0 shadow-sm mt-5">
        <div className="card-body">
          <h4 className="mb-4">Recent Activity</h4>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              📝 New note created: <strong>Learning React</strong>
            </li>

            <li className="list-group-item">
              ❤️ Your note received <strong>12 likes</strong>
            </li>

            <li className="list-group-item">
              🔒 Note <strong>"Node.js Basics"</strong> was disabled
            </li>

            <li className="list-group-item">
              ✅ Note <strong>"Bootstrap UI"</strong> was activated
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card border-0 shadow-sm mt-4">
        <div className="card-body">
          <h4 className="mb-3">Quick Actions</h4>

          <button className="btn btn-primary me-2">
            Create Note
          </button>

          <button className="btn btn-success me-2">
            View Notes
          </button>

          <Link to="/profile" className="btn btn-outline-secondary">
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default dashboard