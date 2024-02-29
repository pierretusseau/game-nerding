import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useMatchStore from '@/store/useMatchStore'
import Hint from '@/components/Atoms/Hint'

function PlayerHints() {
  const { companies, genres } = useContext<TContext>(Context)
  const gameToGuess = useMatchStore((state) => state.gameToGuess)
  const playerSelectedGame = useMatchStore((state) => state.playerSelectedGame)
  const answer = useMatchStore((state) => state.answer)

  if (!genres || !companies || !gameToGuess || !playerSelectedGame || !answer) return

  return (
    <>
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
  )
}

export default PlayerHints