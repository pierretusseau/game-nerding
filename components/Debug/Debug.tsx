import React from 'react'

type DebugProps = {
  condition?: string | boolean
  option?: any
  children?: React.ReactNode
}

const classes = [
  'relative',
  'w-full',
  'flex',
  'justify-center'
]

function Debug({condition, option = null, children}: DebugProps) {
  if ((condition === true || condition === 'true') && option === null) {
    return (
      <div className={classes.join(' ')}>{children}</div>
    )
  } else if (option !== undefined && option) {
    return (
      <div className={classes.join(' ')}>{children}</div>
    )
  } else {
    return null
  }
}

export default Debug