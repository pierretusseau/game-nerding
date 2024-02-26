import React from 'react'

function Tag({children}: {
  children: React.ReactNode
}) {
  return (
    <div className="badge badge-sm">{children}</div>
  )
}

export default Tag