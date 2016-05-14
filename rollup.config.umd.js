import config from './rollup.config';

config.format = 'umd';
config.dest = 'dist/localforage-getitems.js';
config.moduleName = 'localforageGetItems';

export default config;
