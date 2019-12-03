import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import firebaseConfig from './config/firebase'
import 'firebase/firestore'

Vue.config.productionTip = false

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
Vue.$db = db
let app

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


