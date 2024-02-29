import { create } from "zustand"

const defaultValues = {
  matchID: null as null | number,
  matchStarted: false,
  playerSelectedGame: null as null | Game,
  gameToGuess: null as null | GameHints,
  answerLoading: false,
  answer: null as null | Game,
  gameToGuessGenres: [] as GameGenre[],
  timer: undefined as undefined | number,
}

const useMatchStore = create(() => ({
  ...defaultValues
}))

// Full reset
export const fullGameReset = () => {
  useMatchStore.setState(defaultValues)
}

// Round
export const setMatch = (matchID: number) => {
  useMatchStore.setState({ matchID: matchID })
}
export const startGame = (hints: GameHints) => {
  useMatchStore.setState({
    gameToGuess: hints,
    matchStarted: true
  })
}
export const setGameToGuess = (hints: GameHints) => {
  useMatchStore.setState({
    gameToGuess: hints
  })
}
export const newRound = () => {
  useMatchStore.setState({
    playerSelectedGame: defaultValues.playerSelectedGame,
    gameToGuess: defaultValues.gameToGuess,
    answerLoading: defaultValues.answerLoading,
    answer: defaultValues.answer,
    timer: defaultValues.timer,
  })
}

// Player Selected Game
export const updatePlayerSelectedGame = (game: Game|null) => {
  useMatchStore.setState({ playerSelectedGame: game })
}
export const resetPlayerSelectedGame = () => {
  useMatchStore.setState({ playerSelectedGame: null })
}

// Opponent Selected Game

// Timer
export const setTimer = (time: number) => {
  useMatchStore.setState(() => ({ timer: time }))
}
export const resetTimer = () => {
  useMatchStore.setState(() => ({ timer: defaultValues.timer }))
}
export const endTimer = () => {
  useMatchStore.setState(() => ({ timer: 0 }))
}

// Answer
export const setAnswerLoading = (bool?: boolean) => {
  if (bool) {
    useMatchStore.setState(() => ({ answerLoading: bool }))
  } else {
    useMatchStore.setState((state) => ({ answerLoading: !state.answerLoading }))
  }
}
export const setAnswer = (answer: Game) => {
  useMatchStore.setState(() => ({ answer: answer }))
}
export const resetAnswer = () => {
  useMatchStore.setState(() => ({ answer: defaultValues.answer }))
}

export default useMatchStore