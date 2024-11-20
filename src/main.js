
import './assets/css/style.css'
import './assets/css/header.css'
import './assets/css/bootstrap.min.css'



import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
