'use client'

import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import LoaderIntro from '@/components/Loaders/LoaderIntro'

console.log()

export default function Home() {
  const { gamesLoading, companiesLoading, genresLoading, games } = useContext<TContext>(Context)
  if (gamesLoading || companiesLoading || genresLoading) {
    return <LoaderIntro />
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      Test content
      {games?.map(game => {
        return <p key={game.checksum}>
          {game.name}
        </p>
      })}
    </main>
  );
}
