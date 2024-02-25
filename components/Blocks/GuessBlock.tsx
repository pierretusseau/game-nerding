import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import { getRandomEntries } from '@/Utils/Utils'
import Hint from '@/components/Atoms/Hint'
import Debug from '@/components/Debug/Debug'

type GameGenre = any

function GuessBlock() {
  const { games, companies } = useContext<TContext>(Context)
  const [randomGame, setRandomGame] = useState<Game|null|undefined>()
  const [randomGenres, setRandomGenres] = useState<GameGenre[]|null>()

  const selectRandomGame = (gamesArray: Game[] | undefined) => {
    if (gamesArray) {
      const selectedGame = gamesArray[Math.floor(Math.random() * gamesArray.length)]
      setRandomGame(selectedGame)
      setRandomGenres(getRandomEntries(selectedGame.genres, 3))
      console.log("answer is", selectedGame.name, selectedGame)
    }
  }

  useEffect(() => {
    selectRandomGame(games)
  }, [games])

  if (!companies) return
  return (
    <div>
      {/* Refresh button */}
      <Debug condition={process.env.NEXT_PUBLIC_DEBUG} option={randomGame}>
        <button className={`btn btn-default`} onClick={() => selectRandomGame(games)}>Refresh</button>
      </Debug>

      {/* Actual Game App Block */}
      <div className={`w-[300px] bg-neutral-900 p-4`}>
        <h2>Choose the closest game !</h2>
        <div>30s Left</div>
        {randomGame && randomGenres && (
          <div>
            <Hint type="genre" content={ randomGenres[0] } />
            <Hint type="genre" content={ randomGenres[1] } />
            <Hint type="genre" content={ randomGenres[2] } />
            <Hint type="company">
              {companies.find(c => c.id === randomGame.developer)?.name || ''}
            </Hint>
            <Hint type="company">
              {companies.find(c => c.id === randomGame.publisher)?.name || ''}
            </Hint>
            <Hint type="year" content={randomGame.release_year.toString()} />
          </div>
        )}
      </div>

      {/* Game name */}
      <Debug condition={process.env.NEXT_PUBLIC_DEBUG} option={randomGame}>
        <div className="group/test btn">
          <div className="opacity-0 group-hover/test:opacity-100 pointer-events-none">{randomGame?.name}</div>
        </div>
      </Debug>
    </div>
  )
}

export default GuessBlock