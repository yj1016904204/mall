
import { ADD_GOODS, ADD_COUNT } from "./mutationsTypes"
export default {
  getGoodsList({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      let oldGood = state.goodsList.find(item => item.iid == payload.iid)
      if (oldGood) {
        commit(ADD_COUNT, oldGood)
        resolve("商品数量+1")
      } else {
        commit(ADD_GOODS, payload)
        resolve("添加了新商品")
      }
    })
  }
}