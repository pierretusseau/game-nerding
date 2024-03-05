'use client'

// import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import Link from 'next/link'
import LoaderIntro from '@/components/Loaders/LoaderIntro'
import MatchRules from '@/components/Blocks/MatchRules'

export default function Home() {
  const { userLoading, gamesLoading, companiesLoading, genresLoading, user, games } = useContext<TContext>(Context)
  const [matchHistory, setMatchHistory] = useState<Match[]|undefined>()
  const [matchCreating, setMatchCreating] = useState<boolean>(false)

  const handleMatchHistory = useCallback(async (player: string) => {
    await fetch(`${window.location.origin}/api/match/history/${player}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(({code, error, data}) => {
        if (code === 200) {
          setMatchHistory(data)
        }
        if (error) {
          console.log(error)
          throw new Error(error)
        }
      })
      .catch(err => console.error(err))
  }, [])

  const handleMatchDeletion = async (matchID: string) => {
    await fetch(`${window.location.origin}/api/match/${matchID}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(({code, error}) => {
        if (code === 200) {
          console.log('Match deleted properly')
          if (matchHistory) setMatchHistory(matchHistory.filter(match => {
            return match.id !== matchID
          }))
        }
        if (error) {
          console.log(error)
          throw new Error(error)
        }
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    if (matchHistory !== undefined || user === undefined) return
    handleMatchHistory(user.name)
  }, [user, handleMatchHistory, matchHistory])

  // Render
  if (userLoading || gamesLoading || companiesLoading || genresLoading) {
    return <LoaderIntro />
  }

  return (
    <main className="flex flex-col justify-stretch items-center gap-4 p-4">
      {user && games && (
        <>
          {!matchCreating ? (
            <div>
              <button className="btn" onClick={() => setMatchCreating(true)}>Create Match</button>
            </div>
          ) : <MatchRules />}
        </>
      )}
      {matchHistory?.map(match => {
        return <div key={`match-history-match-${match.id}`} className="flex gap-2 items-center">
          <Link href={`/match/${match.id}`}>{match.id}</Link>
          <button className="btn" onClick={() => handleMatchDeletion(match.id)}>Delelete</button>
        </div>
      })}
    </main>
  );
}
