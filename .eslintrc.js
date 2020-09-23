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
          _atoms: './src/components/atoms',
          _molecules: './src/components/molecules',
          _organisms: './src/components/organisms',
          _navigations: './src/navigations',
          _scenes: './src/scenes',
          _services: './src/services',
          _styles: './src/styles',
          _data: './src/data',
          _redux_actions: './src/redux/actions',
          _redux_reducers: './src/redux/reducers',
          _redux_store: './src/redux/store',
          _redux_types: './src/redux/types'
        },
      },
    },
  },
};
