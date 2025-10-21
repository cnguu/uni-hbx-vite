const eslintCacheFix = 'eslint --cache --fix'
const prettierCacheIgnoreUnknownWrite = 'prettier --cache --ignore-unknown --write'

export default {
  '*.{js,jsx,mjs,cjs,ts,tsx,mts,cts}': [eslintCacheFix, prettierCacheIgnoreUnknownWrite],
  '*.{scss,sass,less,styl,html,css}': [prettierCacheIgnoreUnknownWrite],
  '*.md': [prettierCacheIgnoreUnknownWrite],
  '*.vue': [eslintCacheFix, prettierCacheIgnoreUnknownWrite],
  'package.json': [prettierCacheIgnoreUnknownWrite, 'sort-package-json'],
}
