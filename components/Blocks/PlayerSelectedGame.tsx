import React from 'react'
import useMatchStore, { resetPlayerSelectedGame } from '@/store/useMatchStore'
import GameCard from '@/components/Atoms/GameCard'

function PlayerSelectedGame() {
  const playerSelectedGame = useMatchStore((state) => state.playerSelectedGame)

  if (!playerSelectedGame) return

  return (
    <div className="h-full flex flex-col justify-center items-center gap-2">
      <h3>You have selected</h3>
      <GameCard game={playerSelectedGame} />
      <button className="btn btn-red" onClick={() => {
        resetPlayerSelectedGame()
      }}>Cancel</button>
    </div>
  )
}

export default PlayerSelectedGame