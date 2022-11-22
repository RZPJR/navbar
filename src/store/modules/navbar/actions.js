import http from '../../../services/http'

const actions = {
    fetchNavbar: async ({ state, commit, dispatch }, payload) => {
      try {
        const { data } = await http.get('/profile/menu')
        commit('setNavbar', data.data)
      } catch (error) {
        console.log(error);
      }
    },
}

export default actions

