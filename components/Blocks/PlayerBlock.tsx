import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useMatchStore, { resetPlayerSelectedGame } from '@/store/useMatchStore'
import GameCard from '@/components/Atoms/GameCard'
import PlayerHeader from '@/components/Blocks/PlayerHeader'
import PlayerSearchList from '@/components/Blocks/PlayerSearchList'
import PlayerSelectedGame from '@/components/Blocks/PlayerSelectedGame'
import PlayerHints from '@/components/Blocks/PlayerHints'

function PlayerBlock() {
  const { companies, genres } = useContext<TContext>(Context)
  const playerSelectedGame = useMatchStore((state) => state.playerSelectedGame)
  const gameToGuess = useMatchStore((state) => state.gameToGuess)
  const timer = useMatchStore((state) => state.timer)
  const answer = useMatchStore((state) => state.answer)
  const answerLoading = useMatchStore((state) => state.answerLoading)

  if (!companies || !gameToGuess || !genres) return null

  return (
    <>
      <PlayerHeader />
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
        {timer === undefined ? (
          <>Game loading</>
        ) : !playerSelectedGame && timer !== undefined && timer > 0 ? (
          <PlayerSearchList />
        ) : playerSelectedGame && timer !== undefined && timer > 0 ? (
          <PlayerSelectedGame />
        ) : playerSelectedGame !== null && !answerLoading && timer === 0 && answer !== null ? (
          <PlayerHints />
        ) : playerSelectedGame === null && timer === 0 && answer !== null ? (
          <div className="flex justify-center items-center h-full text-center">
            Timer ended before you selected a game 😭
          </div>
        ) : (
          <p>Loading...</p>
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