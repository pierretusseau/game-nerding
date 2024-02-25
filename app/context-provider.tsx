'use client'

import { createContext, useEffect, useState } from 'react'
import supabase, { updateOnNewer } from "@/lib/supabase-browser"
import { PostgrestError } from '@supabase/supabase-js'

export type TContext = {
  // userLoading: boolean
  // user?: User
  // userData: UserData | null
  gamesLoading: boolean
  games?: Game[]
  getGames: () => Promise<{error: PostgrestError|null}>
  companiesLoading: boolean
  companies?: Company[]
  getCompanies: () => Promise<{error: PostgrestError|null}>
  genresLoading: boolean
  genres?: Genre[]
  getGenres: () => Promise<{error: PostgrestError|null}>
}
 
export const Context = createContext<TContext>({
  gamesLoading: false,
  games: undefined,
  getGames: () => new Promise(() => false),
  companiesLoading: false,
  companies: undefined,
  getCompanies: () => new Promise(() => false),
  genresLoading: false,
  genres: undefined,
  getGenres: () => new Promise(() => false),
})
 
export const ContextProvider = ({ children }: React.PropsWithChildren) => {
  // const [userLoading, setUserLoading] = useState<boolean>(true)
  // const [user, setUser] = useState<User>()
  // const [userData, setUserData] = useState<UserData|null>(null)
  const [gamesLoading, setGamesLoading] = useState<boolean>(true)
  const [games, setGames] = useState<Game[]>([])
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [genresLoading, setGenresLoading] = useState<boolean>(true)
  const [genres, setGenres] = useState<Genre[]>([])
  
  // const getUser = async () => {
    // const { data } = await supabase.auth.getUser()

  //   if (data && data.user) {
  //     const getUserData = await fetch(`${window.location.origin}/api/users/${data.user.id}`, {
  //       method: "GET",
  //     })
  //       .then(res => res.json())
  //       .then(({data: fetchData, error, body}) => {
  //         if (error) throw new Error(body.message)
  //         // console.log(fetchData)
  //         if (fetchData) setUserData(fetchData)
  //       })
  //       .catch((err) => console.log('Error on userData', err))
  //     setUser(data.user)
  //   }
  //   setUserLoading(false)
    
  //   return data.user
  // }

  const getGames = async () => {
    console.log('Requesting a new list of games')
    const { data, error } = await supabase
      .from('app_games')
      .select()

    if (data) {
      setGames(data)
      localStorage.setItem('gn-games', JSON.stringify(data))
    }
    return {error: error}
  }

  const getCompanies = async () => {
    const { data, error } = await supabase
      .from('companies')
      .select()

    if (data) {
      setCompanies(data)
      localStorage.setItem('gn-companies', JSON.stringify(data))
    }
    return {error: error}
  }

  const getGenres = async () => {
    const { data, error } = await supabase
      .from('genres')
      .select()

    if (data) {
      setGenres(data)
      localStorage.setItem('gn-genres', JSON.stringify(data))
    }
    return {error: error}
  }

  // Initial data loading
  useEffect(() => {
    const localGames = localStorage.getItem('gn-games')
    const localCompanies = localStorage.getItem('gn-companies')
    const localGenres = localStorage.getItem('gn-genres')
    const localLastUpdate = localStorage.getItem('gn-last-update')

    // Use Local Storage as cache to prevent too much request to database over time
    !localGames ? getGames() : setGames(JSON.parse(localGames))
    !localCompanies? getCompanies() : setCompanies(JSON.parse(localCompanies))
    !localGenres ? getGenres() : setGenres(JSON.parse(localGenres))

    // Handle update
    if (!localLastUpdate) {
      const now = new Date()
      localStorage.setItem('gn-last-update', JSON.stringify(now))
    } else {
      // Check if there's data to update
      console.log('Your last update was :', JSON.parse(localLastUpdate))
      updateOnNewer('app_games', 'created_at', getGames)
      updateOnNewer('app_games', 'edited_at', getGames)
      updateOnNewer('companies', 'created_at', getGames)
      updateOnNewer('companies', 'edited_at', getGames)
      updateOnNewer('genres', 'created_at', getGames)
      updateOnNewer('genres', 'edited_at', getGames)
    }
  }, [])

  // End loader when everything is ok
  useEffect(() => {
    if (games.length > 0) setGamesLoading(false)
    if (companies.length > 0) setCompaniesLoading(false)
    if (genres.length > 0) setGenresLoading(false)
  }, [games, companies, genres])
  

  // Debug informations
  if (process.env.NEXT_PUBLIC_DEBUG && !gamesLoading && !companiesLoading && !genresLoading) {
    console.log(games ? `${games.length} games loaded` : 'no games', companies ? `${companies.length} companies loaded` : 'no games', genres ? `${genres.length} genres loaded` : 'no games')
  }

  return (
    <Context.Provider
      value={{
        // loading,
        gamesLoading, games, getGames,
        companiesLoading, companies, getCompanies,
        genresLoading, genres, getGenres,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default ContextProvider