// https://joshua1988.github.io/web-development/vuejs/vuex-start/ vuex는 왼쪽 url 참조
// 각각 컴포넌트 (dispatch)--> actions (commit)--> mutations (state)--> state -->모든 컴포넌트에서 활용
// 아래는 Sample

import axios from 'axios'
const state = {
  EtcCodeList: []
}

const getters = {
  getEtcCodeList (state) {
    return state.EtcCodeList
  }
}

const mutations = {
  setEtcCodelists (state, payload) {
    state.EtcCodeList = payload
  }
}

const actions = {
  apiEtcCodelists (context, payload) {
    axios.post('/api/admin/EtcCodelists', payload)
      .then((response) => {
        console.log(response.data)
        if (payload.Code === '001' || payload.Code === '006') {
          context.commit('setEtcCode001lists', response.data)
        } else if (payload.Code === '002' || payload.Code === '007') {
          context.commit('setEtcCode002lists', response.data)
        } else {
          context.commit('setEtcCodelists', response.data)
        }
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
