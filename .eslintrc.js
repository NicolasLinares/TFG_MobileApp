module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          _assets: './src/assets',
          
          _components: './src/components',
          _animations: './src/components/animations',
          _buttons: './src/components/buttons',
          _forms: './src/components/forms',
          _lists: './src/components/lists',
          _listsItems: './src/components/listsItems',
          _searcher: './src/components/searcher',
          _modals: './src/components/modals',
          _sidemenu: './src/components/sidemenu',
          _controllers: './src/components/controllers',
          _alerts: './src/components/alerts',

          _navigations: './src/navigations',
          _screens: './src/screens',
          _services: './src/services',
          _styles: './src/styles',
          _constants: './src/constants',
          _redux_actions: './src/redux/actions',
          _redux_reducers: './src/redux/reducers',
          _redux_store: './src/redux/store',
          _redux_types: './src/redux/types'
        },
      },
    },
  },
};
