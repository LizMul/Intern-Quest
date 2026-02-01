import React from 'react'

// Header now accepts counts to display dynamic badges.
export default function Header({ total = 0, applied = 0, interviewing = 0 }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <h1>Intern Quest</h1>
        <div className="badges">
          <span className="badge total">{total} Jobs</span>
          <span className="badge applied">{applied} Applied</span>
          <span className="badge interview">{interviewing} Interviews</span>
        </div>
      </div>
      <p className="subtitle">A friendly tracker to manage your internship applications</p>
    </header>
  )
}
