import React from 'react'

type HintProps = {
  type: string
  children?: React.ReactNode | undefined
  content?: string
}

const classes = [
  "bg-neutral-800",
  "my-1",
  "py-1",
  "px-6",
  "min-h-10",
  "flex",
  "items-center",
  "justify-center",
  "text-center"
]

function Hint({type, children, content}: HintProps) {
  if (!children && !content && type !== 'genre') return
  else if (children) {
    return <div className={`hint-${type} ${classes.join(' ')}`}>{children}</div>
  } else if (content) {
    return <div className={`hint-${type} ${classes.join(' ')}`}>{content}</div>
  } else {
    return <div className={`hint-${type} opacity-25 ${classes.join(' ')}`}></div>
  }
}

export default Hint