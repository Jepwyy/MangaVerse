import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from 'vue-query'
import './assets/main.css'
import { addIcons, OhVueIcon } from 'oh-vue-icons'
import { IoSearchSharp } from 'oh-vue-icons/icons'
import { SiBookstack } from 'oh-vue-icons/icons'

addIcons(IoSearchSharp, SiBookstack)
const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
