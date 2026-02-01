export default function Header({ total = 0, applied = 0, interviewing = 0, accepted = 0, rejected = 0 }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <h1>🚀 Intern Quest</h1>
        <div className="badges">
          <span className="badge total">📊 {total} Jobs</span>
          <span className="badge applied">✅ {applied} Applied</span>
          <span className="badge interview">🎤 {interviewing} Interviews</span>
          <span className="badge accepted">🎉 {accepted} Accepted</span>
          <span className="badge rejected">❌ {rejected} Rejected</span>
        </div>
      </div>
      <p className="subtitle">✨ Track your internship journey with style</p>
    </header>
  )
}
