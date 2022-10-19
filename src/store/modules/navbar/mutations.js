const mutations = {
    setNavbar: function (state, payload) {
      state.navbar.data = payload
      return state
    },
    setPreloadNavbar: function (state, payload) {
      state.navbar.isLoading = payload
      return state
    },
  }
  
  export default mutations
  