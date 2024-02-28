'use client'

import { createContext, useEffect, useState } from 'react'
import supabase, { updateOnNewer } from "@/lib/supabase-browser"
import { PostgrestError } from '@supabase/supabase-js'

export type TContext = {
  userLoading: boolean
  user?: User
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
  platformsLoading: boolean
  platforms?: Platform[]
  getPlatforms: () => Promise<{error: PostgrestError|null}>
}
 
export const Context = createContext<TContext>({
  userLoading: true,
  user: undefined,
  // userData: null,
  gamesLoading: true,
  games: undefined,
  getGames: () => new Promise(() => false),
  companiesLoading: true,
  companies: undefined,
  getCompanies: () => new Promise(() => false),
  genresLoading: true,
  genres: undefined,
  getGenres: () => new Promise(() => false),
  platformsLoading: true,
  platforms: undefined,
  getPlatforms: () => new Promise(() => false),
})
 
export const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [userLoading, setUserLoading] = useState<boolean>(true)
  const [user, setUser] = useState<User>()
  const [userData, setUserData] = useState<UserData|null>(null)
  const [gamesLoading, setGamesLoading] = useState<boolean>(true)
  const [games, setGames] = useState<Game[]>([])
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<Company[]>([])
  const [genresLoading, setGenresLoading] = useState<boolean>(true)
  const [genres, setGenres] = useState<Genre[]>([])
  const [platformsLoading, setPlatformsLoading] = useState<boolean>(true)
  const [platforms, setPlatforms] = useState<Platform[]>([])
  
  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    const localUser = localStorage.getItem('gn-user-data')

    if (data && data.user) {
      const getUserData = await fetch(`${window.location.origin}/api/user/${data.user.id}`, {
        method: "GET",
      })
        .then(res => res.json())
        .then(({data: fetchData, error, body}) => {
          if (error) throw new Error(body.message)
          if (fetchData) setUserData(fetchData)
        })
        .catch((err) => console.log('Error on userData', err))
      setUser(data.user)
      localStorage.setItem('gn-user-data', JSON.stringify(data))
    } else if (!localUser) {
      const newAnonUser = {
        id: null,
        name: `Player${Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000}`
      }
      // const getUserData = await fetch(`${window.location.origin}/api/user`, {
      //   method: "POST",
      // })
      //   .then(res => res.json())
      //   .then(({data: fetchData, error, body}) => {
      //     if (error) throw new Error(body.message)
      //     if (fetchData) setUserData(fetchData)
      //   })
      //   .catch((err) => console.log('Error on userData', err))
        setUser(newAnonUser)
        localStorage.setItem('gn-user-data', JSON.stringify({ user: newAnonUser}))
    } else {
      setUser(JSON.parse(localUser).user)
    }
    setUserLoading(false)
    
    // return data.user
  }

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

  const getPlatforms = async () => {
    const { data, error } = await supabase
      .from('platforms')
      .select()

    if (data) {
      setPlatforms(data)
      localStorage.setItem('gn-platform', JSON.stringify(data))
    }
    return {error: error}
  }

  // Initial data loading
  useEffect(() => {
    const localUser = localStorage.getItem('gn-user')
    const localGames = localStorage.getItem('gn-games')
    const localCompanies = localStorage.getItem('gn-companies')
    const localGenres = localStorage.getItem('gn-genres')
    const localPlatforms = localStorage.getItem('gn-platforms')
    const localLastUpdate = localStorage.getItem('gn-last-update')

    // Use Local Storage as cache to prevent too much request to database over time
    !localUser ? getUser() : setUser(JSON.parse(localUser).user)
    !localGames ? getGames() : setGames(JSON.parse(localGames))
    !localCompanies? getCompanies() : setCompanies(JSON.parse(localCompanies))
    !localGenres ? getGenres() : setGenres(JSON.parse(localGenres))
    !localPlatforms ? getPlatforms() : setPlatforms(JSON.parse(localPlatforms))

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
      updateOnNewer('platforms', 'created_at', getPlatforms)
      updateOnNewer('platforms', 'edited_at', getPlatforms)
    }
  }, [])

  // End loader when everything is ok
  useEffect(() => {
    if (user) setUserLoading(false)
    if (games.length > 0) setGamesLoading(false)
    if (companies.length > 0) setCompaniesLoading(false)
    if (genres.length > 0) setGenresLoading(false)
    if (platforms.length > 0) setPlatformsLoading(false)
  
    // Debug informations
    if (process.env.NEXT_PUBLIC_DEBUG && !userLoading && !gamesLoading && !companiesLoading && !genresLoading && !platformsLoading) {
      console.log('user', user)
      console.log([
        games ? `${games.length} games loaded` : 'no games',
        companies ? `${companies.length} companies loaded` : 'no companies',
        genres ? `${genres.length} genres loaded` : 'no genres',
        platforms ? `${platforms.length} platforms loaded` : 'no platforms',
      ])
    }
  }, [
    user, games, companies, genres, platforms,
    userLoading, gamesLoading, companiesLoading, genresLoading, platformsLoading
  ])

  return (
    <Context.Provider
      value={{
        // loading,
        userLoading, user, // userData,
        gamesLoading, games, getGames,
        companiesLoading, companies, getCompanies,
        genresLoading, genres, getGenres,
        platformsLoading, platforms, getPlatforms,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default ContextProvider