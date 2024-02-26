import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useGameStore, { resetSelectedGame } from '@/store/useGameStore'
// import usePlayerStore from '@/store/usePlayerStore'
import GameSearch from '@/components/Atoms/GameSearch'
import GameList from '@/components/Atoms/GameList'
import Hint from '@/components/Atoms/Hint'
import GameCard from '@/components/Atoms/GameCard'
import Debug from '@/components/Debug/Debug'

function PlayerBlock() {
  const { companies } = useContext<TContext>(Context)
  const selectedGame = useGameStore((state) => state.selectedGame)
  const gameToGuess = useGameStore((state) => state.gameToGuess)
  const timer = useGameStore((state) => state.timer)

  if (!companies || !gameToGuess) return null
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
        {!selectedGame && timer > 0 ? (
          <div className={`flex flex-col items-start gap-2 h-full`}>
            <GameSearch />
            <GameList />
          </div>
        ) : selectedGame && timer > 0 ? (
          <div className="h-full flex flex-col justify-center items-center gap-2">
            <h3>You have selected</h3>
            <GameCard game={selectedGame} />
            <button className="btn btn-red" onClick={() => {
              resetSelectedGame()
            }}>Cancel</button>
          </div>
        ) : selectedGame && timer === 0 ? (
          <>
            {selectedGame.genres
                .filter((genre, index) => selectedGame.id === gameToGuess.id
                  ? gameToGuess.genres.some(g => g === genre)
                  : index > 2
                  ? false
                  : true
                )
                .map(genre => (
                <Hint
                  key={`selected-game-genre-${genre}`}
                  type="genre"
                  content={genre?.toString()}
                  valid={gameToGuess.genres.some((g: GameGenre) => {
                    return g === genre
                  })}
                />
              ))}
            {selectedGame.genres.length < 2 && (
              <Hint type="genre" />
            )}
            {selectedGame.genres.length < 3 && (
              <Hint type="genre" />
            )}
            <div>
              <Hint type="company" valid={gameToGuess.developer === selectedGame.developer}>
                {companies.find(c => c.id === selectedGame.developer)?.name}
              </Hint>
              <Hint type="company" valid={gameToGuess.publisher === selectedGame.publisher}>
                {companies.find(c => c.id === selectedGame.publisher)?.name}
              </Hint>
              <Hint type="year" content={selectedGame.release_year.toString()} valid={gameToGuess.release_year === selectedGame.release_year}/>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-center">
            Timer ended before you selected a game 😭
          </div>
        )}
      </div>
      {selectedGame && timer === 0 && <GameCard
        className="group/player-game btn row-start-3 row-span-1 col-start-1 col-span-1"
        game={selectedGame}
      />}
    </>
  )
}

export default PlayerBlock