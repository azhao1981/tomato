import { defineStore } from 'pinia'

interface UIState {
  showTimerCircle: boolean
  showModeSelector: boolean
  showSettingsPanel: boolean
  showStatisticsCards: boolean
  showTaskList: boolean
}

export const useUIStore = defineStore('ui', {
  state: (): UIState => ({
    showTimerCircle: true,
    showModeSelector: true,
    showSettingsPanel: false,
    showStatisticsCards: true,
    showTaskList: true
  }),
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
    },
    toggleModeSelector() {
      this.showModeSelector = !this.showModeSelector
    },
    toggleSettingsPanel() {
      this.showSettingsPanel = !this.showSettingsPanel
    },
    toggleStatisticsCards() {
      this.showStatisticsCards = !this.showStatisticsCards
    },
    toggleTaskList() {
      this.showTaskList = !this.showTaskList
    },
    setTimerCircleVisible(visible: boolean) {
      this.showTimerCircle = visible
    },
    setModeSelectorVisible(visible: boolean) {
      this.showModeSelector = visible
    },
    setSettingsPanelVisible(visible: boolean) {
      this.showSettingsPanel = visible
    },
    setStatisticsCardsVisible(visible: boolean) {
      this.showStatisticsCards = visible
    },
    setTaskListVisible(visible: boolean) {
      this.showTaskList = visible
    }
  }
})