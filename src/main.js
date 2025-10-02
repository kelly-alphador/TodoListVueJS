import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'

const app = createApp(App)
app.component('VueCal', VueCal)  // ✅ Enregistrement global
app.mount('#app')