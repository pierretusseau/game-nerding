'use client'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Context, TContext } from '@/app/context-provider'
import useGameStore, { selectRandomGame, resetSelectedGame, resetTimer } from '@/store/useGameStore'
import { resetSearch } from '@/store/usePlayerStore'
import Debug from '@/components/Debug/Debug'

function Header() {
  const { games } = useContext<TContext>(Context)
  const gameToGuess = useGameStore((state) => state.gameToGuess)
  // if (process.env.NEXT_PUBLIC_DEBUG) console.log(gameToGuess)
  return (
    <div className={`h-16 bg-neutral-900 flex justify-between items-center py-2 px-4`}>
      <div className={`group/header-left`}>
        <Link href={`/`}>GameNerding</Link>
      </div>
      <div className={`group/header-right flex gap-2`}>
        <div className={`group/debug-btns flex gap-2`}>
          {/* Game name */}
          <Debug condition={process.env.NEXT_PUBLIC_DEBUG}>
            <div className="btn opacity-0 hover:opacity-100">{gameToGuess?.name}</div>
          </Debug>
          {/* Refresh button */}
          <Debug condition={process.env.NEXT_PUBLIC_DEBUG}>
            <button className={`btn btn-default`} onClick={() => {
              if (games) selectRandomGame(games)
              resetSelectedGame()
              resetSearch()
              resetTimer()
            }}>Refresh</button>
          </Debug>
        </div>
        <div>
          <button className="btn">Login</button>
        </div>
      </div>
    </div>
  )
}

export default Header