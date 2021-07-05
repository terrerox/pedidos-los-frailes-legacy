import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2'
import tooltip from '@/_helpers/directives/tooltip.js'

import 'sweetalert2/dist/sweetalert2.min.css'

import './styles/tailwind.css'
import './styles/tooltip.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import 'normalize.css'
import './registerServiceWorker'

createApp(App).directive('tooltip', tooltip).use(router).use(store).use(VueSweetalert2).mount('#app')
