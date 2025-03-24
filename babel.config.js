// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     plugins: ["react-native-reanimated/plugin"],
//     plugins: ['react-native-paper/babel'],
//   };
// };

module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    'react-native-paper/babel',
    "react-native-reanimated/plugin",
    "nativewind/babel"
  ],
};
