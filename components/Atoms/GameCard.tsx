import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import Tag from "@/components/Atoms/Tag"

type GameCardProps = {
  className?: string
  game: Game
  onClick?: (game: Game) => void
}

function GameCard({className, game, onClick }: GameCardProps) {
  const { platforms } = useContext<TContext>(Context)

  const gameCardClasses = [
    "block",
    "bg-gradient-to-r",
    "from-neutral-800",
    "py-1",
    "px-2",
    "rounded",
    "h-auto",
    "w-full",
    "self-start",
    !onClick ? 'pointer-events-none' : ''
  ]

  return (
    <button
      key={`list-game-${game.id}`}
      className={`${gameCardClasses.join(' ')} ${className || ''}`}
      onClick={onClick ? () => onClick(game) : undefined}
    >
      <div className="text-left mb-2 font-bold">{game.name}</div>
      <div className="flex flex-wrap gap-1">
        {game.platforms.map((platform) => {
          return <Tag key={`game-${game.id}-platform-${platform}`}>{platforms?.find(p => p.id === platform).name}</Tag>
        })}
      </div>
    </button>
  )
}

export default GameCard