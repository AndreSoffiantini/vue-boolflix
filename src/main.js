import Vue from 'vue'
import App from './App.vue'

/* Font Awesome icons*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faMagnifyingGlass, fasStar, farStar)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* Bootstrap */
const bootstrap = require('bootstrap')
Vue.use(bootstrap)

/* Lang Flags */
import LangFlag from 'vue-lang-code-flags';
Vue.component('lang-flag', LangFlag);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')