import React, { useState } from 'react'

export default function JobCard({ id, title = 'Frontend Intern', company = 'Acme Co.', status = 'Applied', onToggle, onRemove, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editCompany, setEditCompany] = useState(company)

  function startEdit() {
    setEditTitle(title)
    setEditCompany(company)
    setEditing(true)
  }

  function saveEdit() {
    const t = editTitle.trim()
    const c = editCompany.trim()
    if (!t || !c) return
    onEdit && onEdit(id, t, c)
    setEditing(false)
  }

  function cancelEdit() {
    setEditing(false)
  }

  return (
    <div className="job-card">
      {editing ? (
        <div className="job-edit">
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <input value={editCompany} onChange={(e) => setEditCompany(e.target.value)} />
          <button className="job-save" onClick={saveEdit}>Save</button>
          <button className="job-cancel" onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <>
          <h2 className="job-title">{title}</h2>
          <p className="job-company">{company}</p>
          <div className="job-meta">
            <span className={`job-status ${status === 'Interviewing' ? 'interview' : 'applied'}`}>{status}</span>
            <button className="job-button" onClick={() => onToggle && onToggle(id)}>
              {status === 'Applied' ? 'Mark Interview' : 'Mark Applied'}
            </button>
            <button className="job-remove" onClick={() => onRemove && onRemove(id)}>Remove</button>
            <button className="job-edit-btn" onClick={startEdit}>Edit</button>
          </div>
        </>
      )}
    </div>
  )
}
