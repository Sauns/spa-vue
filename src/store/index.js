import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    records: []
  },
  mutations: {
    SET_RECORDS(state, payload){
      state.records = payload
    },
  },
  actions: {
    LOAD_RECORDS({commit}){
      return new Promise ((resolve, reject) => {
        Vue.$db.collection('table-records')
        .get()
        .then(querySnapshot =>{
          let records = []
          querySnapshot.forEach(el => {
            const data = el.data()
            let record = {
              id: el.id,
              title:  data.title,
              description: data.description,
              date: data.date
            }
            records.push(record)
          })
  
          commit('SET_RECORDS', records)
          resolve(records)
      }).catch(error => {
        console.log(error, reject)
      })
      
      })
    },
    UPDATE_RECORDS({commit, dispatch}, payload){
      Vue.$db.collection("table-records").doc(payload.id).set({
        title:  payload.title,
        description: payload.description,
        date: payload.date
      })
      .then(function() {
        dispatch('LOAD_RECORDS')
        console.log(commit)
      })
      .catch(function(error) {
          console.error(error);
      });
    },
    DELETE_RECORDS({commit, dispatch}, payload){
      Vue.$db.collection("table-records").doc(payload.id).delete().then(function() {
        dispatch('LOAD_RECORDS')
        console.log(commit,"Document successfully deleted!");
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
    }
  },
  getters: {
    getRecords: (state) => state.records
  },
})
