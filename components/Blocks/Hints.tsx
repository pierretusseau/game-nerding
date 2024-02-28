import React, { useCallback, useMemo, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import Hint from '@/components/Atoms/Hint'

type HintsProps = {
  game: GameHints
}

function Hints({ game }: HintsProps) {
  const { companies, genres } = useContext<TContext>(Context)
  
  if (!companies || !genres) return

  return (
    <div>
      <Hint type="genre">
        {genres.find(g => g.id === game.genre1)?.name || ''}
      </Hint>
      <Hint type="genre">
        {genres.find(g => g.id === game.genre2)?.name || ''}
      </Hint>
      <Hint type="genre">
        {genres.find(g => g.id === game.genre3)?.name || ''}
      </Hint>
      <Hint type="company">
        {companies.find(c => c.id === game.developer)?.name || ''}
      </Hint>
      <Hint type="company">
        {companies.find(c => c.id === game.publisher)?.name || ''}
      </Hint>
      <Hint type="year" content={game.release_year.toString()} />
    </div>
  )
}

export default Hints