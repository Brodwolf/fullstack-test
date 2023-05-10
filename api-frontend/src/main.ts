import './style/index.css'
import 'vue-toastification/dist/index.css'
import './registerServiceWorker'

import { createApp } from 'vue'
import Vue3Progress from 'vue3-progress'
import Toast from 'vue-toastification'


import store from './store/Store'
import router from './router/router'
import App from './App.vue'

createApp(App)
  .use(store)
  .use(router)
  .use(Toast)
  .use(Vue3Progress, {
    position: 'fixed',
    height: '3px',
    color: '#006BC2'
  })
  .mount('#app')
