import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import JobCard from './JobCard'

function App() {
  const [jobs, setJobs] = useState(() => {
    try {
      const saved = localStorage.getItem('jobs')
      return saved ? JSON.parse(saved) : [
        { id: 1, title: 'Frontend Intern', company: 'Acme Co.', status: 'Applied' },
        { id: 2, title: 'UI/UX Intern', company: 'Beta Ltd.', status: 'Interviewing' },
      ]
    } catch (e) {
      return [
        { id: 1, title: 'Frontend Intern', company: 'Acme Co.', status: 'Applied' },
        { id: 2, title: 'UI/UX Intern', company: 'Beta Ltd.', status: 'Interviewing' },
      ]
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('jobs', JSON.stringify(jobs))
    } catch (e) {
      // ignore write errors in simple example
    }
  }, [jobs])

  // Form state
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  function addJob(e) {
    e.preventDefault()
    if (!title.trim() || !company.trim()) return
    const newJob = { id: Date.now(), title: title.trim(), company: company.trim(), status: 'Applied', notes: '' }
    setJobs((s) => [newJob, ...s])
    setTitle('')
    setCompany('')
  }

  function removeJob(id) {
    setJobs((s) => s.filter((j) => j.id !== id))
  }

  function updateJobStatus(id, newStatus) {
    setJobs((s) => s.map((j) => (j.id === id ? { ...j, status: newStatus } : j)))
  }

  function editJob(id, newTitle, newCompany) {
    setJobs((s) => s.map((j) => (j.id === id ? { ...j, title: newTitle, company: newCompany } : j)))
  }

  function updateJobNotes(id, newNotes) {
    setJobs((s) => s.map((j) => (j.id === id ? { ...j, notes: newNotes } : j)))
  }

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase()
    return (
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.status.toLowerCase().includes(query)
    )
  })

  // compute simple counts for the header badges
  const total = jobs.length
  const interviewingCount = jobs.filter((j) => j.status === 'Interviewing').length
  const appliedCount = jobs.filter((j) => j.status === 'Applied').length
  const acceptedCount = jobs.filter((j) => j.status === 'Accepted').length
  const rejectedCount = jobs.filter((j) => j.status === 'Rejected').length

  const acceptanceRate = total > 0 ? Math.round((acceptedCount / total) * 100) : 0

  return (
    <>
      <Header total={total} applied={appliedCount} interviewing={interviewingCount} accepted={acceptedCount} rejected={rejectedCount} />
      <main>
        <div className="stats-section">
          <div className="stat-box">
            <div className="stat-number">✅ {acceptanceRate}%</div>
            <div className="stat-label">Success Rate</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">🎉 {acceptedCount}/{total}</div>
            <div className="stat-label">Accepted</div>
          </div>
        </div>
        <h3>📋 Your Applications</h3>

        <div className="search-bar-container">
          <input 
            type="text" 
            placeholder="🔍 Search by job title, company, or status..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        <form className="job-form" onSubmit={addJob}>
          <input placeholder="🧑‍💼 Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="🏢 Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <button type="submit">✨ Add Job</button>
        </form>

        <div className="jobs-list">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              status={job.status}
              notes={job.notes}
              onToggle={updateJobStatus}
              onRemove={removeJob}
              onEdit={editJob}
              onNotesChange={updateJobNotes}
            />
          ))}
        </div>
      </main>
      <footer className="app-footer">
        <div className="footer-name">Liza Multani</div>
        <div className="footer-guide">
          Quick guide: Use the form above to add a job. Click "Edit" to change title/company, "Mark Interview" to toggle status, and "Remove" to delete.
        </div>
      </footer>
    </>
  )
}

export default App
