import deliveryService from '@/services/delivery'

export const state = () => ({
  deliveries: [],
  loggedDelivery: {},
  status: { isLoading: false }
})

export const mutations = {
  deliveryRequest (state, ctx) {
    state.status = { isLoading: true }
  },
  deliveryFinishedRequest (state, ctx) {
    state.status = { isLoading: false }
  },
  setDeliveries (state, deliveries) {
    state.deliveries = deliveries
  },
  removeDelivery (state, id) {
    state.deliveries = state.deliveries.filter(delivery => delivery.id !== id)
  },
  setLoggedDelivery (state, delivery) {
    state.loggedDelivery = delivery
  },

  setEditedDelivery (state, editedDelivery) {
    const {
      name,
      lastName,
      phoneNumber,
      imageUrl,
      nationalId
    } = editedDelivery

    const { Delivery } = state.loggedDelivery
    Delivery.name = name
    Delivery.lastName = lastName
    Delivery.phoneNumber = phoneNumber
    Delivery.imageUrl = imageUrl
    Delivery.nationalId = nationalId
  },
  setVerifiedDelivery (state, verifiedDelivery) {
    const delivery = state.deliveries.find(delivery => delivery.accountId === verifiedDelivery.accountId)
    delivery.status = verifiedDelivery.status
  }
}
export const actions = {
  createDelivery ({ commit, dispatch }, delivery) {
    commit('deliveryRequest')
    return deliveryService.create(delivery)
      .then((res) => {
        commit('deliveryFinishedRequest')
        this.$router.push(`/delivery/${res.id}`)
      },
      (error) => {
        commit('deliveryFinishedRequest')
        dispatch('alert/error', error, { root: true })
      })
  },
  getDeliveries ({ commit }) {
    return deliveryService.getAll()
      .then((deliveries) => {
        commit('setDeliveries', deliveries)
        commit('deliveryFinishedRequest')
      })
  },
  updateDelivery ({ commit, dispatch }, delivery) {
    commit('deliveryRequest')
    return deliveryService.update(delivery)
      .then(
        (res) => {
          commit('setEditedDelivery', res)
          commit('deliveryFinishedRequest')
          dispatch('alert/success',
            '¡Actualizado con éxito!',
            { root: true }
          )
        },
        (error) => {
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  updateDeliveryStatus ({ commit }, delivery) {
    return deliveryService.update(delivery)
      .then(res => commit('setVerifiedDelivery', res))
  },
  getLoggedDelivery (context, id) {
    return deliveryService.getLogged()
      .then((res) => {
        context.commit('setLoggedDelivery', res)
      })
  }
}
export const getters = {
  activeDeliveries (state) {
    return state.deliveries.filter(delivery => delivery.status === 'active')
  },
  activeDelivery (state) {
    return state.deliveries.find(delivery => delivery.status === 'active')
  },
  unverifiedDeliveries (state) {
    return state.deliveries.filter(delivery => delivery.status === 'inactive')
  },
  loggedDelivery (state, getters, rootState) {
    return state.loggedDelivery
  }
}
