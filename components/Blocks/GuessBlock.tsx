import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useGameStore, { selectRandomGame } from '@/store/useGameStore'
// import { getRandomEntries } from '@/Utils/Utils'
import Hint from '@/components/Atoms/Hint'

function GuessBlock() {
  const { games, companies, genres } = useContext<TContext>(Context)
  const gameToGuess = useGameStore((state) => state.gameToGuess)
  const gameToGuessGenres = useGameStore((state) => state.gameToGuessGenres)

  useEffect(() => {
    if (games) selectRandomGame(games)
  }, [games])

  if (!companies) return
  return (
    <>
      <div className="group/guess-header row-start-1 row-span-1 col-start-2 col-span-1 flex flex-col items-center self-start">
          <h2>Choose the closest game !</h2>
          <div>30s Left</div>
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
    </>
  )
}

export default GuessBlock