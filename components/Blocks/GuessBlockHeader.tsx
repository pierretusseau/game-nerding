import React, { useCallback } from 'react'
import Link from 'next/link'
import useMatchStore, { newRound, startRound, setRoundStarted, setCurrentRound, fullGameReset } from '@/store/useMatchStore'
import { resetSearch } from '@/store/usePlayerStore'
import { useRouter } from 'next/navigation'

type GuessBlockHeaderProps = {
  matchID: string,
  remainingTime?: number,
}

function GuessBlockHeader({ matchID, remainingTime }: GuessBlockHeaderProps) {
  const answer = useMatchStore((state) => state.answer)
  const currentRound = useMatchStore((state) => state.currentRound)
  const matchRules = useMatchStore((state) => state.matchRules)
  const matchFinished = useMatchStore((state) => state.matchFinished)
  const router = useRouter()

  // Trigger next round
  /*----------------------------------------------------*/
  const handleNextRound = useCallback(() => {
    newRound()
    resetSearch()

    const requestingTimer = async () => {
      await fetch(`${window.location.origin}/api/match/${matchID}/next`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      })
        .then(res => res.json())
        .then(({code, error, data}) => {
          if (code === 200) {
            startRound(data.hints_game, new Date(data.end_time).getTime())
            setCurrentRound(data.round_number + 1)
            setRoundStarted()
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

  return (
    <div className="group/guess-header row-start-1 row-span-1 col-start-2 col-span-1 flex flex-col items-center self-start">
      <p>Round {currentRound}/{matchRules?.numberOfRounds}</p>
      {(remainingTime && remainingTime > 0) ? (
        <>
          <h2>Choose the closest game !</h2>
          <div>{remainingTime}s Left</div>
        </>
      ) : null }
      {answer && (
        <>
          <p>Time over</p>
          {matchFinished && <p>Match is finished</p>}
          {!matchFinished
            ? <button className="btn" onClick={() => handleNextRound()}>Next round</button>
            : <button className="btn" onClick={() => {
              fullGameReset()
              router.push('/')
            }}>Back to home</button>
          }
        </>
      )}
    </div>
  )
}

export default GuessBlockHeader