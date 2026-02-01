import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header'
import JobCard from './JobCard'

function App() {
  const [count, setCount] = useState(0)
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

  function addJob(e) {
    e.preventDefault()
    if (!title.trim() || !company.trim()) return
    const newJob = { id: Date.now(), title: title.trim(), company: company.trim(), status: 'Applied' }
    setJobs((s) => [newJob, ...s])
    setTitle('')
    setCompany('')
  }

  function removeJob(id) {
    setJobs((s) => s.filter((j) => j.id !== id))
  }

  function toggleJobStatus(id) {
    setJobs((s) => s.map((j) => (j.id === id ? { ...j, status: j.status === 'Applied' ? 'Interviewing' : 'Applied' } : j)))
  }

  function editJob(id, newTitle, newCompany) {
    setJobs((s) => s.map((j) => (j.id === id ? { ...j, title: newTitle, company: newCompany } : j)))
  }

  // compute simple counts for the header badges
  const total = jobs.length
  const interviewingCount = jobs.filter((j) => j.status === 'Interviewing').length
  const appliedCount = jobs.filter((j) => j.status === 'Applied').length

  return (
    <>
      <Header total={total} applied={appliedCount} interviewing={interviewingCount} />
      <main>
        <h3>Jobs</h3>

        <form className="job-form" onSubmit={addJob}>
          <input placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
          <button type="submit">Add Job</button>
        </form>

        <div className="jobs-list">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              company={job.company}
              status={job.status}
              onToggle={toggleJobStatus}
              onRemove={removeJob}
              onEdit={editJob}
            />
          ))}
        </div>
      </main>
      {/* Removed external Vite/React logos for a cleaner app UI */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
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
