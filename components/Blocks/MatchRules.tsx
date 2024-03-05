import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Context, TContext } from '@/app/context-provider'

const defaultMatchRules = {
  timer: 30,
  numberOfRounds: 10
}

function MatchRules() {
  const { user } = useContext<TContext>(Context)
  const [matchRules, setMatchRules] = useState<MatchRules>(defaultMatchRules)
  const [rulesTimer, setRulesTimer] = useState<number>(defaultMatchRules.timer)
  const [rulesNumberOfRounds, setRulesNumberOfRounds] = useState<number>(defaultMatchRules.numberOfRounds)
  const router = useRouter()

  const handleRulesTimerChange = useCallback((timer: string) => {
    setRulesTimer(Number(timer))
  }, [])

  const handleRulesNumberOfRoundsChange = useCallback((timer: string) => {
    setRulesNumberOfRounds(Number(timer))
  }, [])

  const handleMatchCreation = useCallback(async (userObject: User, matchRules: MatchRules) => {
    await fetch(`${window.location.origin}/api/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userObject,
        rules: matchRules
      })
    })
      .then(res => res.json())
      .then(({code, error, data}) => {
        if (code === 200) {
          router.push(`/match/${data.matchID}`)
        }
        if (error) {
          console.log(error)
          throw new Error(error)
        }
      })
      .catch(err => console.error(err))
  }, [router])

  useEffect(() => {
    setMatchRules({
      timer: rulesTimer,
      numberOfRounds: rulesNumberOfRounds
    })
  }, [rulesTimer, rulesNumberOfRounds])

  return (
    <div>
      <div>Rules</div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Timer</span>
        </div>
        <input
          type="text"
          placeholder="30"
          className="input w-full max-w-xs"
          defaultValue={rulesTimer}
          onChange={(e) => handleRulesTimerChange(e.target.value)}
        />
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Number of rounds</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs"
          defaultValue={rulesNumberOfRounds}
          onChange={(e) => handleRulesNumberOfRoundsChange(e.target.value)}
        />
      </label>
      <button className="btn mt-4" onClick={() => handleMatchCreation(user, matchRules)}>Start Match</button>
    </div>
  )
}

export default MatchRules