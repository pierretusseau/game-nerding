import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useGameStore, { resetSelectedGame } from '@/store/useGameStore'
import usePlayerStore from '@/store/usePlayerStore'
import GameSearch from '@/components/Atoms/GameSearch'
import GameList from '@/components/Atoms/GameList'
import Hint from '@/components/Atoms/Hint'
import Debug from '@/components/Debug/Debug'

function PlayerBlock() {
  const { companies } = useContext<TContext>(Context)
  const selectedGame = useGameStore((state) => state.selectedGame)

  if (!companies) return null
  // Render
  return (
    <>
      <div className="group/player-header row-start-1 row-span-1 col-start-1 col-span-1 flex justify-between">
        <div>
          <h2>You</h2>
          <div>❤❤❤❤❤</div>
        </div>
        <div>
          Bonuses
        </div>
      </div>
      <div className={[
        "group/player-body",
        "w-[300px]",
        "bg-neutral-900",
        "p-4",
        "h-full",
        "min-h-[300px]",
        "row-start-2",
        "row-span-1",
        "col-start-1",
        "col-span-1",
        "relative",
     ].join(' ')}>
        {!selectedGame ? (
          <div className={`flex flex-col items-start gap-2 h-full`}>
            <GameSearch />
            <GameList />
          </div>
        ) : (
          <>
            {selectedGame.genres.map(genre => (<Hint key={`selected-game-genre-${genre}`} type="genre" content={genre?.toString()}></Hint>)
            )}
            {selectedGame.genres.length < 2 && (
              <Hint type="genre" />
            )}
            {selectedGame.genres.length < 3 && (
              <Hint type="genre" />
            )}
            <div>
              <Hint type="company">
                {companies.find(c => c.id === selectedGame.developer)?.name}
              </Hint>
              <Hint type="company">
                {companies.find(c => c.id === selectedGame.publisher)?.name}
              </Hint>
              <Hint type="year" content={selectedGame.release_year.toString()} />
            </div>
            <Debug condition={process.env.NEXT_PUBLIC_DEBUG}>
              <div className="absolute -bottom-2 translate-y-full">
                <div className="">
                  <p>You have selected :</p>
                  <p>{selectedGame.name}</p>
                </div>
                <button className="btn" onClick={() => {
                  resetSelectedGame()
                }}>Reset</button>
              </div>
            </Debug>
          </>
        )}
      </div>
    </>
  )
}

export default PlayerBlock