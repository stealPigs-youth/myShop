import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowUp,faArrowDown} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faArrowUp)
library.add(faArrowDown)