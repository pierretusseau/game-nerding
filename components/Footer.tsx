'use client'

import React from 'react'
// import Link from 'next/link'

function Footer() {
  return (
    <div className={`h-10 bg-neutral-900 flex justify-between items-center py-2 px-4 mt-auto`}>
      <div className={`group/header-left`}>
        &copy; GameNerding {new Date().getFullYear()}
      </div>
      <div className={`group/header-right`}></div>
    </div>
  )
}

export default Footer