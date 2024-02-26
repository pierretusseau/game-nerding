import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import { updateSelectedGame } from '@/store/useGameStore'
import usePlayerStore  from '@/store/usePlayerStore'
import Tag from "@/components/Atoms/Tag"

type GameListProps = {
  // search: string
}

function GameList({}: GameListProps) {
  const { games, platforms } = useContext<TContext>(Context)
  const search = usePlayerStore((state) => state.search).toLowerCase()

  if (games && search.length > 0) {
    return (
      <div className="group/game-list w-full flex flex-col gap-2 overflow-y-auto" style={{
        flex: '1 1 auto'
      }}>
        {games.filter(game => {
          return game.name.toLowerCase().includes(search)
        }).map(game => {
            return <button
              key={`list-game-${game.id}`}
              className={`block bg-neutral-800 py-1 px-2 rounded`}
              onClick={() => updateSelectedGame(game)}
            >
              <div className="text-left mb-2 font-bold">{game.name}</div>
              <div className="flex flex-wrap gap-1">
                {game.platforms.map((platform) => {
                  return <Tag key={`game-${game.id}-platform-${platform}`}>{platforms?.find(p => p.id === platform).name}</Tag>
                })}
              </div>
            </button>
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