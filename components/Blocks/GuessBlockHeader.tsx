import React, { useCallback, useMemo, useContext, useEffect, useState } from 'react'
import useMatchStore, { setGameToGuess, setTimer, setAnswer, setAnswerLoading, newRound } from '@/store/useMatchStore'
import { resetSearch } from '@/store/usePlayerStore'

type GuessBlockHeaderProps = {
  matchID: string,
  remainingTime?: number,
}

function GuessBlockHeader({ matchID, remainingTime }: GuessBlockHeaderProps) {
  const answer = useMatchStore((state) => state.answer)

  // Trigger next round
  /*----------------------------------------------------*/
  const handleNextRound = () => {
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
            const now = Math.floor(new Date().getTime() / 1000)
            setGameToGuess(data.gameToGuess)
            setTimer(Math.floor(data.roundEndingTime / 1000) - now)
          }
          if (error) {
            console.log(error)
            throw new Error(error)
          }
        })
        .catch(err => console.error(err))
    }

    requestingTimer()
  }

  return (
    <div className="group/guess-header row-start-1 row-span-1 col-start-2 col-span-1 flex flex-col items-center self-start">
      {(remainingTime && remainingTime > 0) ? (
        <>
          <h2>Choose the closest game !</h2>
          <div>{remainingTime}s Left</div>
        </>
      ) : null }
      {answer && (
        <>
          <p>Time over</p>
          <button className="btn" onClick={() => handleNextRound()}>Next round</button>
        </>
      )}
    </div>
  )
}

export default GuessBlockHeader