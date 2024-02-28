'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Context, TContext } from '@/app/context-provider'
import useMatchStore, { resetPlayerSelectedGame, resetTimer, endTimer } from '@/store/useMatchStore'
import { resetSearch } from '@/store/usePlayerStore'
import Debug from '@/components/Debug/Debug'

function Header() {
  const { user, games } = useContext<TContext>(Context)
  const gameToGuess = useMatchStore((state) => state.gameToGuess)

  return (
    <div className={`h-16 bg-neutral-900 flex justify-between items-center py-2 px-4`}>
      <div className={`group/header-left`}>
        <Link href={`/`}>GameNerding</Link>
      </div>
      <div className={`group/header-right flex gap-2 items-center`}>
        <div className={`group/debug-btns flex gap-2 items-center`}>
          {/* Game name */}
          {gameToGuess && <Debug condition={process.env.NEXT_PUBLIC_DEBUG}>
            <div className="btn opacity-0 hover:opacity-100">
              {/* <span>{gameToGuess?.name}</span> */}
              <div tabIndex={0} role="button" className="btn btn-circle btn-ghost btn-xs text-info" onClick={() => console.log('The game is :', gameToGuess)}>
                <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>
          </Debug>}
          {/* Refresh button */}
          <Debug condition={process.env.NEXT_PUBLIC_DEBUG}>
            <button className={`btn btn-default`} onClick={() => {
              // if (games) selectRandomGame(games)
              resetPlayerSelectedGame()
              resetSearch()
              resetTimer()
            }}>Refresh</button>
          </Debug>
          {/* Add Timer button */}
          {/* <Debug condition={process.env.NEXT_PUBLIC_DEBUG}>
            <button className={`btn btn-default`} onClick={() => {
              addTime()
            }}>+30s</button>
          </Debug> */}
          {/* End Timer button */}
          <Debug condition={process.env.NEXT_PUBLIC_DEBUG}>
            <button className={`btn btn-default`} onClick={() => {
              endTimer()
            }}>End Timer</button>
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