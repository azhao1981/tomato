import { defineStore } from 'pinia'

interface UIState {
  showTimerCircle: boolean
  showModeSelector: boolean
  showSettingsPanel: boolean
  showStatisticsCards: boolean
  showTaskList: boolean
}

const STORAGE_KEY = 'tomato-ui-state'

const getDefaultState = (): UIState => ({
  showTimerCircle: true,
  showModeSelector: true,
  showSettingsPanel: false,
  showStatisticsCards: true,
  showTaskList: true
})

const loadStateFromStorage = (): UIState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...getDefaultState(), ...JSON.parse(stored) }
    }
  } catch (error) {
    console.warn('Failed to load UI state from localStorage:', error)
  }
  return getDefaultState()
}

const saveStateToStorage = (state: UIState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to save UI state to localStorage:', error)
  }
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => loadStateFromStorage(),
  getters: {
    visibleComponents: (state) => {
      return {
        timerCircle: state.showTimerCircle,
        modeSelector: state.showModeSelector,
        settingsPanel: state.showSettingsPanel,
        statisticsCards: state.showStatisticsCards,
        taskList: state.showTaskList
      }
    }
  },
  actions: {
    toggleTimerCircle() {
      this.showTimerCircle = !this.showTimerCircle
      saveStateToStorage(this.$state)
    },
    toggleModeSelector() {
      this.showModeSelector = !this.showModeSelector
      saveStateToStorage(this.$state)
    },
    toggleSettingsPanel() {
      this.showSettingsPanel = !this.showSettingsPanel
      saveStateToStorage(this.$state)
    },
    toggleStatisticsCards() {
      this.showStatisticsCards = !this.showStatisticsCards
      saveStateToStorage(this.$state)
    },
    toggleTaskList() {
      this.showTaskList = !this.showTaskList
      saveStateToStorage(this.$state)
    },
    setTimerCircleVisible(visible: boolean) {
      this.showTimerCircle = visible
      saveStateToStorage(this.$state)
    },
    setModeSelectorVisible(visible: boolean) {
      this.showModeSelector = visible
      saveStateToStorage(this.$state)
    },
    setSettingsPanelVisible(visible: boolean) {
      this.showSettingsPanel = visible
      saveStateToStorage(this.$state)
    },
    setStatisticsCardsVisible(visible: boolean) {
      this.showStatisticsCards = visible
      saveStateToStorage(this.$state)
    },
    setTaskListVisible(visible: boolean) {
      this.showTaskList = visible
      saveStateToStorage(this.$state)
    }
  }
})