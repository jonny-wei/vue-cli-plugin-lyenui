import Vue from 'vue'
import 'normalize.css/normalize.css'
import '@/icons'
import '@/styles/index.scss'
import api from '@/api'

<%# 全局引入 #%>
<%_
if (options.import === 'full') {
_%>
import Element from 'element-ui'

<%_
if (options.lang !== 'zh-CN') {
_%>
import locale from 'element-ui/lib/locale/lang/<%= options.lang %>'

Vue.use(Element, { locale })
<%_ } else { _%>

Vue.use(Element)
<%_ } _%>
<%# 按需引入 #%>
<%_ } else { _%>
import {
Dropdown,
DropdownMenu,
DropdownItem,
Menu,
Submenu,
MenuItem,
MenuItemGroup,
Input,
Select,
Option,
Button,
Tooltip,
Breadcrumb,
BreadcrumbItem,
Form,
FormItem,
Alert,
Row,
Badge,
Image,
scrollbar
} from 'element-ui'

 <%_
if (options.lang !== 'zh-CN') {
_%>
import lang from 'element-ui/lib/locale/lang/<%= options.lang %>'
import locale from 'element-ui/lib/locale'

locale.use(lang)
<%_ } _%>
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Row)
Vue.use(Badge)
Vue.use(Image)
Vue.use(Alert)
Vue.use(scrollbar)
Vue.use(Tooltip)
<%_ } _%>

Vue.prototype.$api = api
