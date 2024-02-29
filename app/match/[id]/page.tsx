'use client'

// import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import { useRouter } from 'next/navigation'
import useMatchStore, { startGame } from '@/store/useMatchStore'
import LoaderIntro from '@/components/Loaders/LoaderIntro'
import GuessBlock from '@/components/Blocks/GuessBlock'
import PlayerBlock from '@/components/Blocks/PlayerBlock'

export default function Match({ params }: { params: { id: string } }) {
  const { gamesLoading, companiesLoading, genresLoading } = useContext<TContext>(Context)
  const matchStarted = useMatchStore((state) => state.matchStarted)
  const router = useRouter()

  // Start the match
  /*----------------------------------------------------*/
  useEffect(() => {
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
            startGame(data)
          }
          if (error) {
            console.log(error)
            if (error.code === 'PGRST116') {
              // Match not found
              router.push('/')
              throw new Error('Match not found, returning to home')
            }
            throw new Error(error)
          }
        })
        .catch(err => console.error(err))
    }

    requestingGameData()
  }, [router, params.id])
  
  // Render
  if (gamesLoading || companiesLoading || genresLoading) {
    return <LoaderIntro />
  }
  return (
    <main className="flex flex-col justify-stretch items-center gap-4 p-4">
      {!matchStarted ? (
        <div>
          ...Loading game
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
          <PlayerBlock />
          <GuessBlock matchID={params.id} />
        </div>
      )}
    </main>
  );
}
