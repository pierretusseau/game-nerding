import React from 'react'

type DebugProps = {
  condition?: string | boolean
  children?: React.ReactNode
}

const classes = [
  // 'relative',
  // 'w-full',
  // 'flex',
  // 'justify-center'
] as string[]

function Debug({condition, children}: DebugProps) {
  const fullConditions = [
    condition,
    process.env.NEXT_PUBLIC_DEBUG === 'true'
  ]

  if (fullConditions.every(v => v === (true || 'true'))) {
    return (
      <div className={classes.join(' ')}>{children}</div>
    )
  } else {
    return null
  }
}

export default Debug