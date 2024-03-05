import React from 'react'
import useMatchStore from '@/store/useMatchStore'
import Hints from '@/components/Blocks/Hints'
import GuessBlockHeader from './GuessBlockHeader'

type GuessBlockProps = {
  matchID: string,
  remainingTime?: number
}

function GuessBlock({ matchID, remainingTime }: GuessBlockProps) {
  const gameToGuess = useMatchStore((state) => state.gameToGuess)

  return (
    <>
      <GuessBlockHeader matchID={matchID} remainingTime={remainingTime} />
      <div className={[
        'group/guess-body',
        'w-[300px]',
        'bg-neutral-900',
        'p-4',
        'row-start-2',
        'row-span-1',
        'col-start-2',
        'col-span-1',
        'self-start'
     ].join(' ')}>
        {gameToGuess && <Hints game={gameToGuess} />}
      </div>
    </>
  )
}

export default GuessBlock