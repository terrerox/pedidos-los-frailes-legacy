import pushService from '@/services/push'

export const state = () => ({
  isSubscribed: false
})

export const mutations = {
  setIsSubscribed (state, value) {
    state.isSubscribed = value
  }

}

export const actions = {
  getPublicKey ({ dispatch }) {
    return pushService.getKey(this.$api)
      .then((key) => {
        process.client && this.$sw.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: key
        })
          .then((res) => {
            return res.toJSON()
          })
          .then(subscription => dispatch('subscribe', subscription))
      })
  },
  subscribe ({ commit, dispatch }, subscription) {
    return pushService.subscribe(subscription, this.$api)
      .then(commit('setIsSubscribed', true))
  },

  getSubscription ({ commit }) {
    process.client && this.$sw.pushManager.getSubscription().then((subscription) => {
      subscription
        ? commit('setIsSubscribed', true)
        : commit('setIsSubscribed', false)
    })
  },
  destroySubscription ({ commit }) {
    process.client && this.$sw.pushManager.getSubscription().then((subscription) => {
      subscription.unsubscribe().then(() => commit('setIsSubscribed', false))
    })
  }
}
