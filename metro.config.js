const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  resetCache: true,
  resolver: {
    blockList: exclusionList([/dist\/.*/, /node_modules\/.*/]),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
