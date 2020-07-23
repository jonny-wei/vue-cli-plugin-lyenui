const { notEmpty } = require('../utils.js')

module.exports = {
  description: 'generate single vue component',
  prompts: [
    {
      type: 'input',
      name: 'path',
      message: 'vue file path please',
      validate: notEmpty('name')
    },
    {
      type: 'input',
      name: 'name',
      message: 'vue file name please',
      validate: notEmpty('name')
    },
    {
      type: 'checkbox',
      name: 'blocks',
      message: 'Blocks:',
      choices: [{
        name: '<template>',
        value: 'template',
        checked: true
      },
      {
        name: '<script>',
        value: 'script',
        checked: true
      },
      {
        name: 'style',
        value: 'style',
        checked: true
      }
      ],
      validate (value) {
        if (value.indexOf('script') === -1 && value.indexOf('template') === -1) {
          return 'Components require at least a <script> or <template> tag.'
        }
        return true
      }
    }
  ],
  actions: (data) => {
    const pathName = '{{path}}'
    const name = '{{properCase name}}'
    return [{
      type: 'add',
      path: `${pathName}/${name}.vue`,
      templateFile: 'plop-templates/single/index.hbs',
      data: {
        name,
        template: data.blocks.includes('template'),
        script: data.blocks.includes('script'),
        style: data.blocks.includes('style')
      }
    }]
  }
}
