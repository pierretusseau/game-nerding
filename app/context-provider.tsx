'use client'

import { createContext, useEffect, useState } from 'react'
import supabase from "@/lib/supabase-browser"
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
  const [games, setGames] = useState<Game[]>()
  const [companiesLoading, setCompaniesLoading] = useState<boolean>(true)
  const [companies, setCompanies] = useState<Company[]>()
  const [genresLoading, setGenresLoading] = useState<boolean>(true)
  const [genres, setGenres] = useState<Genre[]>()
  
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
    const { data, error } = await supabase
      .from('app_games')
      .select()

    if (data) setGames(data)
    setGamesLoading(false)
    return {error: error}
  }

  const getCompanies = async () => {
    const { data, error } = await supabase
      .from('companies')
      .select()

    if (data) setCompanies(data)
    setCompaniesLoading(false)
    return {error: error}
  }

  const getGenres = async () => {
    const { data, error } = await supabase
      .from('genres')
      .select()

    if (data) setGenres(data)
    setGenresLoading(false)
    return {error: error}
  }

  useEffect(() => {
    // getUser()
    //   .then((res) => {if (res?.id) getPlayerSR(res.id)})
    getGames()
    getCompanies()
    getGenres()
  }, [])

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