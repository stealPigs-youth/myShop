import Vue from 'vue'
import { Button,MessageBox } from 'element-ui'

Vue.component(Button.name,Button)
Vue.prototype.$messageBox=MessageBox
Vue.prototype.$alert=MessageBox.alert