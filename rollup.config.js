import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

export default {
  entry: 'lib/localforage-getitems.js',
  // sourceMap: true,
  plugins: [babel(babelrc())]
};
