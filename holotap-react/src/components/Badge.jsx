import React from 'react'
import './Badge.css'

export default function Badge({ label, icon, tier }) {
  return (
    <div className={`badge badge-${tier}`}>
      <img src={icon} alt={`${label} icon`} className="badge-icon" />
      <span className="badge-label">{label}</span>
    </div>
  )
}