import { URL, fileURLToPath } from 'node:url'

import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { loadEnv } from 'vite'

import { getMode } from './builder/util'

const envDir = fileURLToPath(new URL('./env/', import.meta.url))
const env = loadEnv(getMode(), envDir) as unknown as ImportMetaEnv
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_VERSION_NAME,
  VITE_VERSION_CODE,
  VITE_BASE_PATH,
  VITE_MP_WECHAT_APPID,
} = env

export default defineManifestConfig({
  name: VITE_APP_TITLE,
  appid: VITE_UNI_APPID,
  description: '',
  versionName: VITE_VERSION_NAME,
  versionCode: VITE_VERSION_CODE,
  transformPx: false,
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    modules: {},
    distribute: {
      android: {
        permissions: [],
        abiFilters: ['armeabi-v7a', 'arm64-v8a'],
        minSdkVersion: 21,
        targetSdkVersion: 36,
      },
      ios: {
        dSYMs: false,
        privacyDescription: {
          NSMicrophoneUsageDescription: '请允许使用麦克风，以便于您进行录音、语音通话、视频通话',
          NSCameraUsageDescription: '请允许使用摄像头，以便于您进行拍照、语音通话、视频通话',
          NSPhotoLibraryUsageDescription: '请允许访问所有照片，以便更自由地上传、下载、分享',
          NSPhotoLibraryAddUsageDescription: '请允许保存图片到相册，以便更自由地上传、下载、分享',
          NSUserTrackingUsageDescription:
            '请放心，开启权限不会获取您在其他站点的隐私信息，该权限仅用于标识设备并保障服务安全与提示浏览体验',
          NSLocalNetworkUsageDescription: '请允许访问本地网络，以便为您提供更好的服务体验',
          NSLocationWhenInUseUsageDescription: '请允许使用定位，以便于您进行地理位置相关活动',
          NSLocationAlwaysUsageDescription: '请允许使用定位，以便于您进行地理位置相关活动',
        },
        idfa: true,
        urlschemewhitelist: 'iosamap,baidumap,qqmap',
      },
      sdkConfigs: {
        ad: {},
        push: {},
        maps: {},
        oauth: {},
        geolocation: {},
      },
      icons: {},
      splashscreen: {
        androidStyle: 'default',
        useOriginalMsgbox: true,
        iosStyle: 'common',
      },
    },
    compatible: {
      ignoreVersion: true,
    },
    runmode: 'liberate',
    nativePlugins: {},
  },
  'app-harmony': {
    distribute: {},
  },
  'mp-harmony': {
    distribute: {},
  },
  quickapp: {},
  'mp-weixin': {
    appid: VITE_MP_WECHAT_APPID,
    libVersion: '3.11.2',
    setting: {
      condition: false,
      es6: true,
      es7: false,
      enhance: true,
      postcss: true,
      minified: true,
      minifyWXSS: true,
      minifyWXML: true,
      swc: false,
      uglifyFileName: false,
      ignoreUploadUnusedFiles: true,
      autoAudits: false,
      urlCheck: false,
      compileHotReLoad: true,
      preloadBackgroundData: false,
      lazyloadPlaceholderEnable: false,
      useStaticServer: false,
      bigPackageSizeSupport: true,
      skylineRenderEnable: false,
      babelSetting: {
        outputPath: '@babel/runtime',
        ignore: [],
      },
      useCompilerPlugins: false,
      disableUseStrict: false,
      uploadWithSourceMap: false,
      localPlugins: false,
      packNpmManually: false,
      coverView: true,
      ignoreDevUnusedFiles: true,
      checkInvalidKey: false,
      showShadowRootInWxmlPanel: true,
      useIsolateContext: true,
      useMultiFrameRuntime: true,
      useApiHook: false,
      useApiHostProcess: false,
      useLanDebug: false,
      enableEngineNative: false,
      showES6CompileOption: true,
      checkSiteMap: false,
    },
    plugins: {
      // sendCoupon: {
      //   version: 'latest',
      //   provider: 'wxf3f436ba9bd4be7b',
      // },
    },
    usingComponents: true,
    requiredPrivateInfos: [
      'getLocation',
      'chooseLocation',
      'onLocationChange',
      'startLocationUpdateBackground',
    ],
    requiredBackgroundModes: ['location'],
    permission: {
      'scope.userLocation': {
        desc: '请允许使用定位，以便于您进行地理位置相关活动',
      },
    },
    optimization: { subPackages: true },
  },
  'mp-alipay': {
    usingComponents: true,
  },
  'mp-baidu': {
    usingComponents: true,
  },
  'mp-toutiao': {
    usingComponents: true,
  },
  uniStatistics: {
    enable: false,
  },
  vueVersion: '3',
  locale: 'zh-Hans',
  fallbackLocale: 'zh-Hans',
  h5: {
    sdkConfigs: {
      maps: {},
    },
    title: VITE_APP_TITLE,
    router: {
      mode: 'hash',
      base: VITE_BASE_PATH,
    },
    unipush: {
      enable: false,
    },
    optimization: {
      treeShaking: {
        enable: true,
      },
    },
  },
})
