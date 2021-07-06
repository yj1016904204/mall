import { ADD_GOODS, ADD_COUNT, } from "./mutationsTypes"
export default {
  [ADD_COUNT](state, payload) {
    payload.count++
  },
  [ADD_GOODS](state, payload) {
    payload.count = 1
    state.goodsList.push(payload)
  },

}