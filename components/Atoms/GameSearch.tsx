import React, { useEffect, useState } from 'react'
import usePlayerStore, { updateSearch } from '@/store/usePlayerStore'

type GameListProps = {
  // 
}

function GameList({}: GameListProps) {
  const search = usePlayerStore((state) => state.search)

  return (
    <label className="input input-bordered flex items-center gap-2 h-10 w-full" style={{
      flex: '0 0 auto'
    }}>
      <input
        type="text"
        className="grow"
        placeholder="Choose a game"
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
      />
    </label>
  )
}

export default GameList