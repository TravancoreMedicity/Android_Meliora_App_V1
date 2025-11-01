const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Apply NativeWind configuration
  const nativeWindConfig = withNativeWind(config, { input: './global.css' });

  // Handle SVGs via react-native-svg-transformer
  nativeWindConfig.transformer = {
    ...nativeWindConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };

  // Allow SVGs as source extensions and remove them from asset extensions
  nativeWindConfig.resolver = {
    ...nativeWindConfig.resolver,
    assetExts: nativeWindConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...nativeWindConfig.resolver.sourceExts, 'svg'],
  };

  return nativeWindConfig;
})();
