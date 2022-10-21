import axios from 'axios'

const actions = {
    fetchNavbar: async ({ state, commit, dispatch }, payload) => {
      try {
        let url = state.staff == 65536 ? 'https://apidev.edenfarm.tech/v1/menu' : 'https://apidev.edenfarm.tech/v1/menu/user/'+state.staff
        const { data } = await axios.get(url)
        commit('setNavbar', data.data)
      } catch (error) {
        console.log(error);
      }
    },
}

export default actions

