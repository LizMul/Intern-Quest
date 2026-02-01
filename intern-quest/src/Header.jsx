import React from 'react'

export default function Header({ total = 0, applied = 0, interviewing = 0 }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <h1>🚀 Intern Quest</h1>
        <div className="badges">
          <span className="badge total">📊 {total} Jobs</span>
          <span className="badge applied">✅ {applied} Applied</span>
          <span className="badge interview">🎤 {interviewing} Interviews</span>
        </div>
      </div>
      <p className="subtitle">✨ Track your internship journey with style</p>
    </header>
  )
}
