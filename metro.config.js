const {getDefaultConfig} = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  config.resolver.assetExts.push(
    'db', // Add your custom asset extensions here
    'png',
    'jpg',
    'svg',
  );

  config.transformer.getTransformOptions = async () => ({
    assetPlugins: ['expo-asset/tools/hashAssetFiles'],
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });

  config.resolver.extraNodeModules = {
    ...require('node-libs-react-native'),
    vm: require.resolve('vm-browserify'),
  };

  return config;
})();
