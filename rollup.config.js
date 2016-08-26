import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/app.js',
  dest: 'dist/app.js',
  format: 'umd',
  moduleName: 'app',
  sourceMap: true,
  plugins: [ babel() ]
};
