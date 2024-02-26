'use client'

// import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import LoaderIntro from '@/components/Loaders/LoaderIntro'
import GuessBlock from '@/components/Blocks/GuessBlock'
import PlayerBlock from '@/components/Blocks/PlayerBlock'

export default function Home() {
  const { gamesLoading, companiesLoading, genresLoading } = useContext<TContext>(Context)

  // Render
  if (gamesLoading || companiesLoading || genresLoading) {
    return <LoaderIntro />
  }
  return (
    <main className="flex flex-col justify-stretch items-center gap-4 p-4">
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
        <GuessBlock />
      </div>
    </main>
  );
}
