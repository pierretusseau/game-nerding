'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Context, TContext } from '@/app/context-provider'
import useMatchStore, { fullGameReset } from '@/store/useMatchStore'
import { resetSearch } from '@/store/usePlayerStore'
import Debug from '@/components/Debug/Debug'

function Header() {
  const { user } = useContext<TContext>(Context)
  const router = useRouter()
  const pathname = usePathname()
  const matchID = useMatchStore((state) => state.matchID)
  console.log(matchID)

  const handleDeleteMatch = async () => {
    const matchToDelete = matchID || pathname.split('/match/')[1]
    await fetch(`${window.location.origin}/api/match/${matchToDelete}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(({code, error}) => {
        if (code === 200) {
          console.log('Match deleted properly')
          router.push(`/`)
          fullGameReset()
          resetSearch()
        }
        if (error) {
          console.log(error)
          throw new Error(error)
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <div className={`h-16 bg-neutral-900 flex justify-between items-center py-2 px-4`}>
      <div className={`group/header-left`}>
        <Link href={`/`}>GameNerding</Link>
      </div>
      <div className={`group/header-right flex gap-2 items-center`}>
        <div className={`group/debug-btns flex gap-2 items-center`}>
          <Debug condition={pathname.includes('/match')}>
            <button className="btn" onClick={() => handleDeleteMatch()}>Delete match</button>
          </Debug>
        </div>
        <div className="group/account flex gap-2 items-center">
          <button className="btn">Login</button>
          {user && <p>Hello {user.name}</p>}
        </div>
      </div>
    </div>
  )
}

export default Header