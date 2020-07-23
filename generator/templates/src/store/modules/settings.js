import defaultSettings from '@/settings'

const { showSettings, sidebarLogo, sidebarUser, fixedNavBar, tagsView, breadcrumbs } = defaultSettings

const state = {
  showSettings,
  sidebarLogo,
  sidebarUser,
  fixedNavBar,
  tagsView,
  breadcrumbs
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting ({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
