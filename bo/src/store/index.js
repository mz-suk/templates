export const state = () => ({
  title: '',
  user: {}, // 사용자 정보 객체
})

export const mutations = {
  updateTitle(state, payload) {
    state.title = payload
  },
}

export const actions = {}
