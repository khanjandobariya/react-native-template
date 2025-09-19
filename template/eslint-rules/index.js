/**
 * Custom ESLint plugin for Alfa IELTS React Native App
 * Contains custom naming convention rules
 */

const customRules = require('./custom-rules')

module.exports = {
  rules: {
    ...customRules.rules
  },
  configs: {
    recommended: {
      plugins: ['@alfa-ielts/custom-rules'],
      rules: {
        '@alfa-ielts/custom-rules/camelcase-dynamic-data': 'error',
        '@alfa-ielts/custom-rules/constant-static-data': 'error',
        '@alfa-ielts/custom-rules/boolean-is-prefix': 'error'
      }
    }
  }
}
