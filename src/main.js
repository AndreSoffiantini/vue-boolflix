import Vue from 'vue'
import App from './App.vue'

/* Font Awesome icons*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faMagnifyingGlass)
Vue.component('font-awesome-icon', FontAwesomeIcon)

/* Lang Flags */
import LangFlag from 'vue-lang-code-flags';
Vue.component('lang-flag', LangFlag);

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')