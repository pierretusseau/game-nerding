import { create } from "zustand"

const defaultValues = {
  matchRules: null as null | MatchRules,
  matchID: null as null | number,
  matchStarted: false,
  matchFinished: false,
  playerSelectedGame: null as null | Game,
  gameToGuess: null as null | GameHints,
  answerLoading: false,
  answer: null as null | Game,
  gameToGuessGenres: [] as GameGenre[],
  currentRound: 0,
  roundStarted: false,
  roundFinished: false,
  timer: null as null | number,
}

const useMatchStore = create(() => ({
  ...defaultValues
}))

// Full reset
export const fullGameReset = () => {
  useMatchStore.setState(defaultValues)
}

// Match
export const setMatchRules = (rules: MatchRules = {
  timer: 30,
  numberOfRounds: 10
}) => {
  useMatchStore.setState({
    matchRules: rules
  })
}
export const finishMatch = () => {
  useMatchStore.setState({ matchFinished: true })
}

// Round
export const setMatch = (matchID: number) => {
  useMatchStore.setState({ matchID: matchID })
}
export const startRound = (hints: GameHints, roundEndingTime: number) => {
  const now = new Date().getTime()
  const timer = roundEndingTime - now
  
  useMatchStore.setState({
    gameToGuess: hints,
    timer: Math.floor(timer / 1000)
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
    roundFinished: defaultValues.roundFinished,
    timer: defaultValues.timer,
  })
}
export const setCurrentRound = (number: number) => {
  useMatchStore.setState({ currentRound: number })
}
export const setRoundStarted = (bool: boolean = true) => {
  useMatchStore.setState({ roundStarted: bool })
}
export const setRoundFinished = (bool: boolean = true) => {
  useMatchStore.setState({ roundFinished: bool })
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