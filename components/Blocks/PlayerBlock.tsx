import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useMatchStore, { resetPlayerSelectedGame } from '@/store/useMatchStore'
// import usePlayerStore from '@/store/usePlayerStore'
import GameSearch from '@/components/Atoms/GameSearch'
import GameList from '@/components/Atoms/GameList'
import Hint from '@/components/Atoms/Hint'
import GameCard from '@/components/Atoms/GameCard'
import Debug from '@/components/Debug/Debug'

function PlayerBlock() {
  const { companies, genres } = useContext<TContext>(Context)
  const playerSelectedGame = useMatchStore((state) => state.playerSelectedGame)
  const gameToGuess = useMatchStore((state) => state.gameToGuess)
  const timer = useMatchStore((state) => state.timer)
  const answer = useMatchStore((state) => state.answer)

  if (!companies || !gameToGuess || !genres) return null
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
        {!playerSelectedGame && timer ? (
          <div className={`flex flex-col items-start gap-2 h-full`}>
            <GameSearch />
            <GameList />
          </div>
        ) : playerSelectedGame && timer ? (
          <div className="h-full flex flex-col justify-center items-center gap-2">
            <h3>You have selected</h3>
            <GameCard game={playerSelectedGame} />
            <button className="btn btn-red" onClick={() => {
              resetPlayerSelectedGame()
            }}>Cancel</button>
          </div>
        ) : playerSelectedGame && !timer && answer ? (
          <>
            {/* {playerSelectedGame.genres
                .filter((genre, index) => playerSelectedGame.id === answer.id
                  ? [gameToGuess.genre1,gameToGuess.genre2,gameToGuess.genre3].some(g => g === genre)
                  : index > 2
                  ? false
                  : true
                )
                .map(genre => (
                <Hint
                  key={`selected-game-genre-${genre}`}
                  type="genre"
                  content={genres.find(g => g.id === genre)?.name}
                  valid={answer.genres.some((g: GameGenre) => {
                    return g === genre
                  })}
                />
              ))}
            {playerSelectedGame.genres.length < 2 && (
              <Hint type="genre" />
            )}
            {playerSelectedGame.genres.length < 3 && (
              <Hint type="genre" />
            )} */}
            <Hint type="genre" valid={gameToGuess.genre1 === playerSelectedGame.genres.find((g: any) => g === gameToGuess.genre1)}>
              {genres.find(genre => genre.id === playerSelectedGame.genres.find((g: any) => g === gameToGuess.genre1))?.name}
            </Hint>
            <Hint type="genre" valid={gameToGuess.genre2 === playerSelectedGame.genres.find((g: any) => g === gameToGuess.genre2)}>
             {genres.find(genre => genre.id === playerSelectedGame.genres.find((g: any) => g === gameToGuess.genre2))?.name}
            </Hint>
            <Hint type="genre" valid={gameToGuess.genre3 === playerSelectedGame.genres.find((g: any) => g === gameToGuess.genre3)}>
              {genres.find(genre => genre.id === playerSelectedGame.genres.find((g: any) => g === gameToGuess.genre3))?.name}
            </Hint>
            <div>
              <Hint type="company" valid={answer.developer === playerSelectedGame.developer}>
                {companies.find(c => c.id === playerSelectedGame.developer)?.name}
              </Hint>
              <Hint type="company" valid={answer.publisher === playerSelectedGame.publisher}>
                {companies.find(c => c.id === playerSelectedGame.publisher)?.name}
              </Hint>
              <Hint type="year" content={playerSelectedGame.release_year.toString()} valid={answer.release_year === playerSelectedGame.release_year}/>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full text-center">
            Timer ended before you selected a game 😭
          </div>
        )}
      </div>
      {playerSelectedGame && timer === 0 && <GameCard
        className="group/player-game btn row-start-3 row-span-1 col-start-1 col-span-1"
        game={playerSelectedGame}
      />}
    </>
  )
}

export default PlayerBlock