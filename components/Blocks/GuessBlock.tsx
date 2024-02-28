import React, { useCallback, useMemo, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import useMatchStore, { setTimer, setAnswer } from '@/store/useMatchStore'
import Hints from '@/components/Blocks/Hints'
import GameCard from '@/components/Atoms/GameCard'

type GuessBlockProps = {
  matchID: string
}

function GuessBlock({ matchID }: GuessBlockProps) {
  const { companies, genres } = useContext<TContext>(Context)
  const gameToGuess = useMatchStore((state) => state.gameToGuess)
  const answer = useMatchStore((state) => state.answer)
  const timer = useMatchStore((state) => state.timer)
  const [remainingTime, setRemainingTime] = useState<number|undefined>()
  const [round, setRound] = useState<number>(0)

  // Start the round
  /*----------------------------------------------------*/
  useEffect(() => {
    console.log('matchID', matchID)
    const now = Math.floor(new Date().getTime() / 1000);
    const requestingTimer = async () => {
      await fetch(`${window.location.origin}/api/match/${matchID}/timer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(res => res.json())
        .then(({code, error, data}) => {
          if (code === 200) {
            setTimer(Math.floor(data.matchEndingTime / 1000) - now)
          }
          if (error) {
            console.log(error)
            throw new Error(error)
          }
        })
        .catch(err => console.error(err))
    }

    requestingTimer()
  }, [matchID])

  // Start timer ticker
  /*----------------------------------------------------*/
  useEffect(() => {
    if (timer === undefined) return

    setRemainingTime(timer)

    const timerTicker = setInterval(() => {
      // @ts-ignore
      setRemainingTime((time) => time - 1)
    }, 1000)

    if (timer === 0) clearInterval(timerTicker)

    return () => {
      clearInterval(timerTicker)
    }
  }, [timer])

  // Get the answer
  /*----------------------------------------------------*/
  useEffect(() => {
    console.log('remaining time', remainingTime)
    if (!remainingTime || remainingTime > 0) return
    setTimer(0)
    const requestingAnswer = async () => {
      await fetch(`${window.location.origin}/api/match/${matchID}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          round: round
        })
      })
        .then(res => res.json())
        .then(({code, error, data}) => {
          console.log('requestingAnswer', code, data)
          if (code === 200) {
            setAnswer(data.game)
          }
          if (error) {
            console.log(error)
            throw new Error(error)
          }
        })
        .catch(err => console.error(err))
    }

    requestingAnswer()

  }, [matchID, round, remainingTime])

  if (!companies) return
  return (
    <>
      <div className="group/guess-header row-start-1 row-span-1 col-start-2 col-span-1 flex flex-col items-center self-start">
          {(remainingTime && remainingTime > 0) ? (
            <>
              <h2>Choose the closest game !</h2>
              <div>{remainingTime}s Left</div>
            </>
          ) : null }
          {answer && (
            <p>Time over</p>
          )}
      </div>
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
        {genres && gameToGuess && <Hints game={gameToGuess} />}
      </div>
      
      {answer && remainingTime === 0 && <GameCard
        className="group/player-game btn row-start-3 row-span-1 col-start-2 col-span-1"
        game={answer}
      />}
    </>
  )
}

export default GuessBlock