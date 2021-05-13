import deliveryService from '@/delivery/services/delivery'
import router from '@/router'

const state = {
  deliveries: [],
  loggedDelivery: {}
}

const mutations = {
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
      image,
      nationalId
    } = editedDelivery

    const { Delivery } = state.loggedDelivery
    Delivery.name = name
    Delivery.lastName = lastName
    Delivery.phoneNumber = phoneNumber
    Delivery.image = image
    Delivery.nationalId = nationalId
  }
}
const actions = {
  createDelivery ({ commit }, delivery) {
    return deliveryService.create(delivery)
      .then(res => router.push(`/delivery/${res.id}`))
  },
  getDeliveries (context) {
    return deliveryService.getAll()
      .then(deliveries => {
        context.commit('setDeliveries', deliveries)
      })
  },
  updateDelivery ({ commit, dispatch }, delivery) {
    return deliveryService.update(delivery)
      .then(
        res => {
          commit('setEditedDelivery', res)
          dispatch('alert/success',
            '¡Actualizado con éxito!',
            { root: true }
          )
        },
        error => {
          dispatch('alert/error', error, { root: true })
        }
      )
  },
  updateDeliveryStatus ({ commit }, delivery) {
    return deliveryService.update(delivery)
  },
  getLoggedDelivery (context, id) {
    return deliveryService.getLogged()
      .then(res => {
        context.commit('setLoggedDelivery', res)
      })
  }
}
const getters = {
  activeDeliveries (state) {
    return state.deliveries.filter(delivery => delivery.status === 'active')
  },
  loggedDelivery (state, getters, rootState) {
    return state.loggedDelivery
  }
}

export const delivery = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
