import { create } from "zustand"

const usePlayerStore = create(() => ({
  player: null as null,
  search: ''
}))

// Selected Game
export const updateSearch = (search: string) => {
  usePlayerStore.setState({ search: search })
}
export const resetSearch = () => {
  usePlayerStore.setState({ search: '' })
}

export default usePlayerStore