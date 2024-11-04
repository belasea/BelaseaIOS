
<img src="./src/assets/icon/logo.png" id='header'>

<h1 align="center">BelaseaBD - React Native Cli App</h1>

<div align="center">
<!-- Gmail Account -->
<a href="mailto:jayed.swe@gmail.com">
<img src='https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white'
alt='Jayed Hossain Jibon'
/>
</a>
<a href="tel:+8801987132107">
<img
src='https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white'
alt='Jayed Hossain Jibon'
/>
<a href="#" target="_blank">
<img
src='https://img.shields.io/badge/website-000000?style=for-the-badge&logo=About.me&logoColor=white'
alt='Jayed Hossain Jibon'
/>
</a>
<a href="https://www.facebook.com/jibon969" target="_blank">
<img
src='https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white'
alt='Jayed Hossain Jibon'
/>

<a href="https://www.linkedin.com/in/jibon969/" target="_blank">
<img
src='https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white'
alt='Jayed Hossain Jibon'
/>
</a>
<a href="https://github.com/jibon969" target="_blank">
<img
src='https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white'
alt='Jayed Hossain Jibon'
/>
</a>
</div>

<hr/>

<div align="center">
        <a href="https://reactnative.dev/" target="_blank">Documentation
        </a>
        |
        <a href="https://blog.deversity.com/2021/10/combining-drawer-tab-and-stack.html" target="_blank">Combining Navigators </a>
        |
        <a href="https://medium.com/enappd/firebase-push-notifications-in-react-native-apps-d9f60726ce9c" target="_blank">Push notifications</a>
        |
        <a href="https://www.notjust.dev/blog/2022-06-30-how-to-publish-react-native-cli-app-to-google-play-store" target="_blank">Publish Android</a>
        |
        <a href="https://www.notjust.dev/blog/2022-06-29-how-to-publish-react-native-cli-app-to-apple-app-store" target="_blank">Publish iOS</a>
        |
        <a href="#" target="_blank">Learn More</a>
</div>
<hr/>


# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 0: Create a React Native Project

```bash
# Create new project
npx react-native init BelaseaBD

# Using a specific version
npx react-native@X.XX.X init BelaseaBD --version X.XX.X

#
npx react-native@0.74.3 init BelaseaBD --version 0.74.3

# change directory
cd BelaseaBD
npx react-native run-android

# using npm
npm start

# OR using Yarn
yarn start
```

## Step 1: How to run existing project
```bash
git clone git@github.com:belasea/BelaseaBD.git

# change directory
cd BelaseaBD

# install dependency or packages
yarn install

# run command
npx react-native run-android
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.


## More Resources
https://github.com/facebook/react-native


## Problem of app
<details>
<summary style="cursor:pointer">Show Command</summary>

```bash
# Command Here
https://reactnative.dev/docs/more-resources

# ViewPropTypes will be removed from React Native
https://stackoverflow.com/questions/71702392/viewproptypes-will-be-removed-from-react-native-migrate-to-viewproptypes-export


# If all the above didn't work for you try removing cache from .gradle global folder Try the following

rm -rf ~/.gradle/caches
react-native run-android

# If didn't work, the below worked perfectly for me
rm -rf ~/.gradle
react-native run-android

# Reanimated Plugin Problem > added this line to babel con
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};

```
</details>

#### How To Publish React Native CLI Application To The Google Play Store
<details>
<summary style="cursor:pointer">Show Details</summary>

```bash
# Read this documentation
https://www.notjust.dev/blog/2022-06-30-how-to-publish-react-native-cli-app-to-google-play-store

```
</details>

---
**[⬆ Back to Top](#header)**