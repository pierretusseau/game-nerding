import { create } from "zustand"
import { getRandomEntries } from '@/Utils/Utils'

const defaultValues = {
  timer: 30
}

const useGameStore = create(() => ({
  selectedGame: null as null | Game,
  gameToGuess: null as null | Game,
  gameToGuessGenres: [] as GameGenre[],
  timer: defaultValues.timer
}))

// Game to guess
export const selectRandomGame = (games: Game[]) => {
  if (games) {
    // Game
    const gameToGuess = games[Math.floor(Math.random() * games.length)]
    useGameStore.setState({ gameToGuess: gameToGuess })

    // Random genres if needed
    if (gameToGuess.genres.length > 3) {
      useGameStore.setState({ gameToGuessGenres: getRandomEntries(gameToGuess.genres) })
    } else {
      useGameStore.setState({ gameToGuessGenres: gameToGuess.genres })
    }
  }
}

// Player Selected Game
export const updateSelectedGame = (game: Game|null) => {
  useGameStore.setState({ selectedGame: game })
}
export const resetSelectedGame = () => {
  useGameStore.setState({ selectedGame: null })
}

// Opponent Selected Game

// Timer
export const decreaseTimer = () => {
  useGameStore.setState((state) => ({ timer: state.timer - 1 }))
}
export const resetTimer = () => {
  useGameStore.setState(() => ({ timer: defaultValues.timer }))
}

export default useGameStore