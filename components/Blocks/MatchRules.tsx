import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Context, TContext } from '@/app/context-provider'

const defaultMatchRules = {
  timer: 30
}

function MatchRules() {
  const { user } = useContext<TContext>(Context)
  const [matchRules, setMatchRules] = useState<MatchRules>(defaultMatchRules)
  const [rulesTimer, setRulesTimer] = useState<number>(defaultMatchRules.timer)
  const router = useRouter()

  const handleRulesTimerChange = (timer: string) => {
    setRulesTimer(Number(timer))
  }

  const handleMatchCreation = async (userObject: User, matchRules: MatchRules) => {
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
  }

  useEffect(() => {
    setMatchRules({
      ...matchRules,
      timer: rulesTimer
    })
  }, [rulesTimer])
  

  return (
    <div>
      <div>Rules</div>
      <div>
        Timer: <input
        type="text"
        placeholder="Type here"
        className="input w-full max-w-xs"
        defaultValue={rulesTimer}
        onChange={(e) => handleRulesTimerChange(e.target.value)}/>
      </div>
      <button className="btn" onClick={() => handleMatchCreation(user, matchRules)}>Start Match</button>
    </div>
  )
}

export default MatchRules