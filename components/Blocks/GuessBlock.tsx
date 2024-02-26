import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useGameStore, { selectRandomGame, decreaseTimer } from '@/store/useGameStore'
// import { getRandomEntries } from '@/Utils/Utils'
import Hint from '@/components/Atoms/Hint'
import GameCard from '@/components/Atoms/GameCard'

function GuessBlock() {
  const { games, companies, genres } = useContext<TContext>(Context)
  const gameToGuess = useGameStore((state) => state.gameToGuess)
  const gameToGuessGenres = useGameStore((state) => state.gameToGuessGenres)
  const timer = useGameStore((state) => state.timer)

  useEffect(() => {
    const timerInterval = setInterval(() => decreaseTimer(), 1000)

    if (timer === 0) clearInterval(timerInterval)
  
    return () => {
      clearInterval(timerInterval)
    }
  }, [timer])
  

  useEffect(() => {
    if (games) selectRandomGame(games)
  }, [games])

  if (!companies) return
  return (
    <>
      <div className="group/guess-header row-start-1 row-span-1 col-start-2 col-span-1 flex flex-col items-center self-start">
          {timer > 0 ? (
            <>
              <h2>Choose the closest game !</h2>
              <div>{timer}s Left</div>
            </>
          ) : (
            <p>Time over</p>
          )}
      </div>
      <div className={[
        'group/guess-body',
        'w-[300px]',
        'bg-neutral-900',
        'p-4',
        'row-start-2',
        'row-span-1',
        'col-start-2',
        'col-span-1',
        'self-start'
     ].join(' ')}>
        {genres && gameToGuess && gameToGuessGenres && (
          <div>
            <Hint type="genre">
              {genres.find(g => g.name === gameToGuessGenres[0])?.name || ''}
            </Hint>
            <Hint type="genre">
              {genres.find(g => g.name === gameToGuessGenres[1])?.name || ''}
            </Hint>
            <Hint type="genre">
              {genres.find(g => g.name === gameToGuessGenres[2])?.name || ''}
            </Hint>
            <Hint type="company">
              {companies.find(c => c.id === gameToGuess.developer)?.name || ''}
            </Hint>
            <Hint type="company">
              {companies.find(c => c.id === gameToGuess.publisher)?.name || ''}
            </Hint>
            <Hint type="year" content={gameToGuess.release_year.toString()} />
          </div>
        )}
      </div>
      
      {gameToGuess && timer === 0 && <GameCard
        className="group/player-game btn row-start-3 row-span-1 col-start-2 col-span-1"
        game={gameToGuess}
      />}
    </>
  )
}

export default GuessBlock