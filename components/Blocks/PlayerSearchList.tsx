import React from 'react'
import GameSearch from '@/components/Atoms/GameSearch'
import GameList from '@/components/Atoms/GameList'

function PlayerSearchList() {
  return (
    <div className={`flex flex-col items-start gap-2 h-full`}>
      <GameSearch />
      <GameList />
    </div>
  )
}

export default PlayerSearchList