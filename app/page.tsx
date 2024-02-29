'use client'

// import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Context, TContext } from '@/app/context-provider'
import useMatchStore, { setMatch } from '@/store/useMatchStore'
import LoaderIntro from '@/components/Loaders/LoaderIntro'

export default function Home() {
  const { userLoading, gamesLoading, companiesLoading, genresLoading, user, games } = useContext<TContext>(Context)
  const matchStarted = useMatchStore((state) => state.matchStarted)
  const router = useRouter()

  // Render
  if (userLoading || gamesLoading || companiesLoading || genresLoading) {
    return <LoaderIntro />
  }

  const handleMatchCreation = async (userObject: User) => {
    await fetch(`${window.location.origin}/api/match`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userObject
      })
    })
      .then(res => res.json())
      .then(({code, error, data}) => {
        console.log(code, data)
        if (code === 200) {
          setMatch(data.matchID)
          router.push(`/match/${data.matchID}`)
        }
        if (error) {
          console.log(error)
          throw new Error(error)
        }
      })
      .catch(err => console.error(err))
  }

  return (
    <main className="flex flex-col justify-stretch items-center gap-4 p-4">
      {!matchStarted && user && games && (
        <div>
          <button className="btn" onClick={() => handleMatchCreation(user)}>Create Match</button>
        </div>
      )}
    </main>
  );
}
