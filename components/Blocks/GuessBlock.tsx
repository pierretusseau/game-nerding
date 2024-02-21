import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import Hint from '@/components/Atoms/Hint'
import { getRandomEntries } from '@/Utils/Utils'

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
    }
  }

  useEffect(() => {
    selectRandomGame(games)
  }, [games])

  if (!companies) return
  return (
    <>
      {/* Refresh button */}
      {process.env.NEXT_PUBLIC_DEBUG && (
        <button className={`btn btn-default`} onClick={() => selectRandomGame(games)}>Refresh</button>
      )}

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
              {companies.find(c => c.checksum === randomGame.developer)?.name || ''}
            </Hint>
            <Hint type="company">
              {companies.find(c => c.checksum === randomGame.publisher)?.name || ''}
            </Hint>
            <Hint type="year" content={randomGame.release_year.toString()} />
          </div>
        )}
      </div>

      {/* Game name */}
      {process.env.NEXT_PUBLIC_DEBUG && randomGame && (
        <div className="mt-auto opacity-0 hover:opacity-100">{randomGame.name}</div>
      )}
    </>
  )
}

export default GuessBlock