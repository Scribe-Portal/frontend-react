module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
        "node_modules/(?!(@react-native-firebase"
        +"|@react-native"
        +"|react-native"
        +"|react-native-gesture-handler"
        +"|@twotalltotems/react-native-otp-input"
        +"|react-native-progress"
        +"|@react-native-community"
        +"|react-native-image-picker"
        +"|react-native-elements"
        +"|react-native-size-matters"
        +"|react-native-ratings"
        +"|react-native-reanimated"
        +")/)",
    ],
    setupFiles: [
        "./node_modules/react-native-gesture-handler/jestSetup.js"
      ]
}