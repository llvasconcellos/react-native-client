# Building React Native for Android

This guide contains instructions for building the Android code and running the sample apps.

## Supported Operating Systems

This setup has been tested on Mac OS X and Ubuntu Linux 15.10 so far.

## Prerequisites

* [Node.js](https://nodejs.org) and NPM
* React Native CLI: `sudo npm install -g react-native-cli`
* [Android SDK](https://developer.android.com/sdk/installing/index.html)

Assuming you have the Android SDK installed, run `<android_sdk_dir>/tools/android` to open the Android SDK Manager and make sure you have the following installed:

- Android SDK version 23 (compileSdkVersion in [`build.gradle`](build.gradle))
- SDK build tools version 23.0.1 (buildToolsVersion in [`build.gradle`](build.gradle))
- Android Support Repository >= 17 (for Android Support Library)
- Android NDK (download & extraction instructions [here](http://developer.android.com/ndk/downloads/index.html))

Point Gradle to your Android SDK: either have `$ANDROID_SDK` and `$ANDROID_NDK` defined, or create a `local.properties` file in the root of your `react-native` checkout with the following contents:

    sdk.dir=absolute_path_to_android_sdk
    ndk.dir=absolute_path_to_android_ndk

Example:

    sdk.dir=/Users/your_unix_name/android-sdk-macosx
    ndk.dir=/Users/your_unix_name/android-ndk/android-ndk-r10e

## Run `npm install`

This is needed to fetch the dependencies for the packager.

```bash
cd react-native
npm install
```

## Building from the command line

To be able to build a signed APK we need to create a key and add the key information to your `~/.gradle/gradle.properties` file. Example:
```bash
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
```
See full instrucions on this article: [Generating Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android.html)

To build the framework code:

```bash
cd react-native
./gradlew :ReactAndroid:assembleDebug
```

To install a snapshot version of the framework code in your local Maven repo:

```bash
./gradlew :ReactAndroid:installArchives
```

## Running the examples

To run the UIExplorer app:

```bash
cd react-native
./gradlew :Examples:UIExplorer:android:app:installDebug
# Start the packager in a separate shell:
# Make sure you ran npm install
./packager/packager.sh
# Open UIExplorer in your emulator, Menu button -> Reload JS should work
```

You can run any other sample app the same way, e.g.:

```bash
./gradlew :Examples:Movies:android:app:installDebug
```

## Building from Android Studio

You'll need to do one additional step until we release the React Native Gradle plugin to Maven central. This is because Android Studio has its own local Maven repo:

    mkdir -p /Applications/Android\ Studio.app/Contents/gradle/m2repository/com/facebook/react
    cp -r ~/.m2/repository/com/facebook/react/gradleplugin /Applications/Android\ Studio.app/Contents/gradle/m2repository/com/facebook/react/

Now, open Android Studio, click _Import Non-Android Studio project_ and find your `react-native` repo.

In the configurations dropdown, _app_ should be selected. Click _Run_.

## Installing the React Native .aar in your local Maven repo

In some cases, for example when working on the `react-native-cli` it's useful to publish a snapshot version of React Native into your local Maven repo. This way, Gradle can pick it up when building projects that have a Maven dependency on React Native.

Run:

```bash
cd react-native-android
./gradlew :ReactAndroid:installArchives
```

## Troubleshooting

* Gradle build fails in `ndk-build` and/or fails with the following message:
```java
java.lang.RuntimeException: SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.
```
See the section about `local.properties` file above.

* Gradle build fails "Could not find any version that matches com.facebook.react:gradleplugin:...". See the section about the React Native Gradle plugin above.

* Packager throws an error saying a module is not found. Try running `npm install` in the root of the repo.

* Gradle build fails with the following message: 
 ```java
Could not find property 'MYAPP_RELEASE_STORE_FILE' on SigningConfig_Decorated{name=release, storeFile=null, storePassword=null, keyAlias=null, keyPassword=null, storeType=null}
 ```
See section about Signed Build above.

* If you have a Ubuntu node.js might have come pre-installed but a very old version. Then you'll probably get a warning executing `npm install`:
 ```javascript
npm WARN engine react-native@0.19.0: wanted: {"node":">=4"} (current: {"node":"0.10.25","npm":"1.4.21"})
 ```
Update your node.js. See [here](https://davidwalsh.name/nvm)

* Gradle build fails with the following message:
 ```java
A problem occurred starting process 'command 'react-native''
 ```
 You need to install react-native. See the Prerequisites section above.
