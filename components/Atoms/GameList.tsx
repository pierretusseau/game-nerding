import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import { updatePlayerSelectedGame } from '@/store/useMatchStore'
import usePlayerStore  from '@/store/usePlayerStore'
import GameCard from "@/components/Atoms/GameCard"

type GameListProps = {
  // search: string
}

function GameList({}: GameListProps) {
  const { games } = useContext<TContext>(Context)
  const search = usePlayerStore((state) => state.search).toLowerCase()

  if (games && search.length > 0) {
    return (
      <div className="group/game-list w-full flex flex-col gap-2 overflow-y-auto" style={{
        flex: '1 1 auto'
      }}>
        {games.filter(game => {
          return game.name.toLowerCase().includes(search)
        }).map(game => {
            return <GameCard
              key={`list-game-${game.id}`}
              game={game}
              onClick={updatePlayerSelectedGame}
            />
          }
        )}
      </div>
    )
  } else if (!games && search.length > 0) {
    return <p>Loading...</p>
  } else {
    return null
  }
}

export default GameList