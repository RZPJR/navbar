import axios from 'axios'

const actions = {
    login: async ({ state, commit, dispatch }, payload) => {
      try {
        const { data } = await axios.get("https://apidev.edenfarm.tech/v1/menu")
        commit('setNavbar', data.data)
      } catch (error) {
        // contoh
        console.log('gagal');
      }
    },
}

export default actions

