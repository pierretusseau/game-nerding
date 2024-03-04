'use client'

// import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import { useRouter } from 'next/navigation'
import useMatchStore, {
  startRound,
  setAnswerLoading,
  setAnswer,
  setRoundStarted,
  setRoundFinished,
  resetTimer
} from '@/store/useMatchStore'
import LoaderIntro from '@/components/Loaders/LoaderIntro'
import GuessBlock from '@/components/Blocks/GuessBlock'
import PlayerBlock from '@/components/Blocks/PlayerBlock'
import GameCard from '@/components/Atoms/GameCard'

export default function Match({ params }: { params: { id: string } }) {
  const { gamesLoading, companiesLoading, genresLoading } = useContext<TContext>(Context)
  const [matchNotFound, setMatchNotFound] = useState(false)
  const [remainingTime, setRemainingTime] = useState<number>()
  const timer = useMatchStore((state) => state.timer) || null
  const answer = useMatchStore((state) => state.answer) || null
  const roundStarted = useMatchStore((state) => state.roundStarted) || false
  const router = useRouter()

  const handleFirstRound = async () => {
    await fetch(`${window.location.origin}/api/match/${params.id}/next`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(({code, error, data}) => {
        if (code === 200) {
          startRound(data.hints_game, new Date(data.end_time).getTime())
          setRoundStarted()
        }
        if (error) {
          console.log(error)
        }
      })
      .catch(err => console.error(err))
  }

  // Start the match
  /*----------------------------------------------------*/
  useEffect(() => {
    if (gamesLoading || companiesLoading || genresLoading) return

    const requestingGameData = async () => {
      await fetch(`${window.location.origin}/api/match/${params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(res => res.json())
        .then(({code, error, data}) => {
          if (code === 200) {
            if (!data) {
              handleFirstRound()
            } else {
              startRound(data.hints_game, new Date(data.end_time).getTime())
              setRoundStarted()
            }
          }
          if (error) {
            if (error.code === 'PGRST116') {
              // Match not found
              setMatchNotFound(true)
            } else {
              throw new Error(error)
            }
          }
        })
        .catch(err => console.error(err))
    }

    requestingGameData()
  }, [gamesLoading, companiesLoading, genresLoading, router, params.id])
  
  // Start timer ticker
  /*----------------------------------------------------*/
  useEffect(() => {
    if (timer === null) return

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
    if (!remainingTime || remainingTime > 0) return

    resetTimer()
    setRoundFinished()
    setAnswerLoading(true)

    console.log('fetching answer')

    const requestingAnswer = async () => {
      await fetch(`${window.location.origin}/api/match/${params.id}/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(res => res.json())
        .then(({code, error, data}) => {
          console.log(code, error, data)
          if (code === 200) {
            setAnswer(data.game)
            setAnswerLoading(false)
          }
          if (error) {
            console.log(error)
            setAnswerLoading(false)
            throw new Error(error)
          }
        })
        .catch(err => {
          console.error(err)
          setAnswerLoading(false)
        })
    }

    requestingAnswer()
  }, [remainingTime])
  
  // Render
  if (gamesLoading || companiesLoading || genresLoading) {
    return <LoaderIntro />
  }

  if (matchNotFound) {
    return <div className="inline-flex flex-col gap-2 justify-center mt-2">
      <h2>Match not found</h2>
      <button className="btn" onClick={() => router.push('/')}>Return to home</button>
    </div>
  }

  return (
    <main className="flex flex-col justify-stretch items-center gap-4 p-4">
      {!roundStarted ? (
        <div>
          ...Loading round
        </div>
      ) : (
        <div
          className={[
            'group/blocks',
            'grid',
            'grid-cols-3',
            'grid-rows-3',
            'gap-4',
            'px-4',
            'h-full',
            'items-end',
          ].join(' ')}
          style={{
            maxHeight: 'calc(100vh - 200px)',
            gridTemplateRows: 'minmax(0, max-content) 300px minmax(0, max-content)',
            gridTemplateColumns: 'repeat(3, 300px)'
          }}
        >
          {remainingTime !== undefined && <PlayerBlock remainingTime={remainingTime} />}
          <GuessBlock matchID={params.id} remainingTime={remainingTime} />
          {answer !== null && <GameCard
            className="group/player-game btn row-start-3 row-span-1 col-start-2 col-span-1"
            game={answer}
          />}
        </div>
      )}
    </main>
  );
}
