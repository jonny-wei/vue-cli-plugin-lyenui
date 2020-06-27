import Vue from 'vue'
<%# 全局引入 #%>
<%_
if (options.import === 'full') {
_%>
import Element from 'element-ui'

import '../../styles/lyenui-variables.scss'
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
import { Button, Row } from 'element-ui'

import '../../styles/lyenui-variables.scss'
    <%_
if (options.lang !== 'zh-CN') {
_%>
import lang from 'element-ui/lib/locale/lang/<%= options.lang %>'
import locale from 'element-ui/lib/locale'

locale.use(lang)
<%_ } _%>

Vue.use(Button).use(Row)
<%_ } _%>
