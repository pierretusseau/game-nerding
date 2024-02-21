'use client'

// import Image from "next/image";
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Context, TContext } from '@/app/context-provider'
import LoaderIntro from '@/components/Loaders/LoaderIntro'
import GuessBlock from '@/components/Blocks/GuessBlock'

export default function Home() {
  const { gamesLoading, companiesLoading, genresLoading } = useContext<TContext>(Context)

  // Render
  if (gamesLoading || companiesLoading || genresLoading) {
    return <LoaderIntro />
  }
  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-4">
      <GuessBlock />
    </main>
  );
}
