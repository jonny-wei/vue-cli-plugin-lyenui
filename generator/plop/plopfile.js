const singleGenerator = require('./plop-templates/single/prompt')
const viewGenerator = require('./plop-templates/view/prompt')
const componentGenerator = require('./plop-templates/component/prompt')
const storeGenerator = require('./plop-templates/store/prompt')

module.exports = (plop) => {
  plop.setGenerator('single', singleGenerator)
  plop.setGenerator('view', viewGenerator)
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('store', storeGenerator)
}
