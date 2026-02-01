import React, { useState } from 'react'

export default function JobCard({ id, title = 'Frontend Intern', company = 'Acme Co.', status = 'Applied', notes = '', onToggle, onRemove, onEdit, onNotesChange }) {
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editCompany, setEditCompany] = useState(company)
  const [showNotes, setShowNotes] = useState(false)
  const [editNotes, setEditNotes] = useState(notes)

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
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Job title" />
          <input value={editCompany} onChange={(e) => setEditCompany(e.target.value)} placeholder="Company" />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="job-save" onClick={saveEdit}>💾 Save</button>
            <button className="job-cancel" onClick={cancelEdit}>❌ Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="job-title">💼 {title}</h2>
          <p className="job-company">🏢 {company}</p>
          {notes && <p className="job-notes">📝 {notes}</p>}
          <div className="job-meta">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <label style={{ fontWeight: '600', fontSize: '0.9rem' }}>Status:</label>
              <select 
                value={status} 
                onChange={(e) => onToggle && onToggle(id, e.target.value)}
                className="job-status-select"
              >
                <option value="Applied">✅ Applied</option>
                <option value="Interviewing">🎤 Interviewing</option>
                <option value="Accepted">🎉 Accepted</option>
                <option value="Rejected">❌ Rejected</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <button className="job-edit-btn" onClick={startEdit}>✏️ Edit</button>
              <button className="job-notes-btn" onClick={() => setShowNotes(!showNotes)}>📝 Notes</button>
              <button className="job-remove" onClick={() => onRemove && onRemove(id)}>🗑️ Remove</button>
            </div>
            {showNotes && (
              <div style={{ marginTop: '0.75rem', width: '100%' }}>
                <textarea 
                  value={editNotes}
                  onChange={(e) => {
                    setEditNotes(e.target.value)
                    onNotesChange && onNotesChange(id, e.target.value)
                  }}
                  placeholder="Add notes about this job (salary, interview feedback, etc.)"
                  className="job-notes-input"
                  rows="3"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
