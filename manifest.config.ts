import { fileURLToPath, URL } from 'node:url'
import { defineManifestConfig } from '@uni-helper/vite-plugin-uni-manifest'
import { loadEnv } from 'vite'
import { getMode } from './builder/util'

const envDir = fileURLToPath(new URL('./env/', import.meta.url))
const env = loadEnv(getMode(), envDir) as unknown as Env.ImportMeta
const {
  VITE_APP_TITLE,
  VITE_UNI_APPID,
  VITE_VERSION_NAME,
  VITE_VERSION_CODE,
  VITE_BASE_PATH,
  VITE_AMAP_USERNAME,
  VITE_AMAP_WEB_KEY,
  VITE_AMAP_JS_KEY,
  VITE_AMAP_JS_SECURITY_CODE,
  VITE_AMAP_IOS_KEY,
} = env

export default defineManifestConfig({
  name: VITE_APP_TITLE,
  appid: VITE_UNI_APPID,
  description: '',
  versionName: VITE_VERSION_NAME,
  versionCode: VITE_VERSION_CODE,
  transformPx: false,
  /* 5+App特有相关 */
  'app-plus': {
    usingComponents: true,
    nvueStyleCompiler: 'uni-app',
    compatible: {
      ignoreVersion: true,
    },
    compilerVersion: 3,
    splashscreen: {
      alwaysShowBeforeRender: true,
      waiting: true,
      autoclose: true,
      delay: 0,
    },
    runmode: 'liberate',
    /* 模块配置 */
    modules: {
      Camera: {},
      Barcode: {},
      Bluetooth: {},
      Push: {},
      Maps: {},
      OAuth: {},
      Record: {},
      VideoPlayer: {},
      Geolocation: {},
    },
    /* 应用发布信息 */
    distribute: {
      /* android打包配置 */
      android: {
        permissions: [
          '<uses-permission android:name="android.permission.CHANGE_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.MOUNT_UNMOUNT_FILESYSTEMS"/>',
          '<uses-permission android:name="android.permission.VIBRATE"/>',
          '<uses-permission android:name="android.permission.READ_LOGS"/>',
          '<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>',
          '<uses-feature android:name="android.hardware.camera.autofocus"/>',
          '<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>',
          '<uses-permission android:name="android.permission.CAMERA"/>',
          '<uses-permission android:name="android.permission.GET_ACCOUNTS"/>',
          '<uses-permission android:name="android.permission.CALL_PHONE"/>',
          '<uses-permission android:name="android.permission.READ_PHONE_STATE"/>',
          '<uses-permission android:name="android.permission.CHANGE_WIFI_STATE"/>',
          '<uses-permission android:name="android.permission.WAKE_LOCK"/>',
          '<uses-permission android:name="android.permission.FLASHLIGHT"/>',
          '<uses-feature android:name="android.hardware.camera"/>',
          '<uses-permission android:name="android.permission.WRITE_SETTINGS"/>',
          '<uses-permission android:name="android.permission.RECORD_AUDIO"/>',
          '<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS"/>',
          '<uses-permission android:name="android.permission.POST_NOTIFICATIONS"/>',
          '<uses-permission android:name="android.permission.READ_SYNC_SETTINGS"/>',
          '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>',
          '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>',
          '<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE"/>',
          '<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>',
          '<uses-permission android:name="android.permission.READ_MEDIA_VIDEO"/>',
          '<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>',
          '<uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS"/>',
        ],
        abiFilters: ['armeabi-v7a', 'arm64-v8a'],
        minSdkVersion: 21,
        targetSdkVersion: 36,
      },
      /* ios打包配置 */
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
      /* SDK配置 */
      sdkConfigs: {
        ad: {},
        push: {
          unipush: {
            icons: {
              push: {
                ldpi: 'static/logo.png',
                mdpi: 'static/logo.png',
                hdpi: 'static/logo.png',
                xhdpi: 'static/logo.png',
                xxhdpi: 'static/logo.png',
              },
              small: {
                hdpi: 'static/logo.png',
                xhdpi: 'static/logo.png',
                xxhdpi: 'static/logo.png',
                ldpi: 'static/logo.png',
                mdpi: 'static/logo.png',
              },
            },
            offline: true,
            version: '2',
            hms: {},
            oppo: {},
            vivo: {},
            mi: {},
            meizu: {},
            honor: {},
          },
        },
        maps: {
          amap: {
            name: VITE_AMAP_USERNAME,
            appkey_ios: VITE_AMAP_IOS_KEY,
            appkey_android: VITE_AMAP_WEB_KEY,
          },
        },
        oauth: {
          weixin: {
            appid: 'wx123',
            UniversalLinks: `https://uniappoauth.xxx.com/uni-universallinks/${VITE_UNI_APPID}/`,
          },
          apple: {},
        },
        geolocation: {
          system: {
            __platform__: ['ios', 'android'],
          },
          amap: {
            name: VITE_AMAP_USERNAME,
            __platform__: ['ios', 'android'],
            appkey_ios: VITE_AMAP_IOS_KEY,
            appkey_android: VITE_AMAP_WEB_KEY,
          },
        },
      },
      icons: {
        android: {
          hdpi: 'static/app/icons/72x72.png',
          xhdpi: 'static/app/icons/96x96.png',
          xxhdpi: 'static/app/icons/144x144.png',
          xxxhdpi: 'static/app/icons/192x192.png',
        },
        ios: {
          appstore: 'static/app/icons/1024x1024.png',
          ipad: {
            app: 'static/app/icons/76x76.png',
            'app@2x': 'static/app/icons/152x152.png',
            notification: 'static/app/icons/20x20.png',
            'notification@2x': 'static/app/icons/40x40.png',
            'proapp@2x': 'static/app/icons/167x167.png',
            settings: 'static/app/icons/29x29.png',
            'settings@2x': 'static/app/icons/58x58.png',
            spotlight: 'static/app/icons/40x40.png',
            'spotlight@2x': 'static/app/icons/80x80.png',
          },
          iphone: {
            'app@2x': 'static/app/icons/120x120.png',
            'app@3x': 'static/app/icons/180x180.png',
            'notification@2x': 'static/app/icons/40x40.png',
            'notification@3x': 'static/app/icons/60x60.png',
            'settings@2x': 'static/app/icons/58x58.png',
            'settings@3x': 'static/app/icons/87x87.png',
            'spotlight@2x': 'static/app/icons/80x80.png',
            'spotlight@3x': 'static/app/icons/120x120.png',
          },
        },
      },
      splashscreen: {
        androidStyle: 'default',
        android: {
          hdpi: 'static/app/splash.9.png',
          xhdpi: 'static/app/splash.9.png',
          xxhdpi: 'static/app/splash.9.png',
        },
        iosStyle: 'common',
        ios: {
          iphone: {
            'portrait-896h@3x': 'static/splash.png',
            'portrait-896h@2x': 'static/splash.png',
            iphonex: 'static/splash.png',
            retina55: 'static/splash.png',
            retina47: 'static/splash.png',
            retina35: 'static/splash.png',
          },
        },
        useOriginalMsgbox: true,
      },
    },
    nativePlugins: {},
  },
  /* 快应用特有相关 */
  quickapp: {},
  /* 小程序特有相关 */
  'mp-weixin': {
    appid: '',
    setting: {
      urlCheck: false,
    },
    usingComponents: true,
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
      maps: {
        amap: {
          key: VITE_AMAP_JS_KEY,
          securityJsCode: VITE_AMAP_JS_SECURITY_CODE,
          serviceHost: '',
        },
      },
    },
    title: VITE_APP_TITLE,
    router: {
      mode: 'hash',
      base: VITE_BASE_PATH,
    },
    unipush: {
      enable: true,
    },
    optimization: {
      treeShaking: {
        enable: true,
      },
    },
  },
})
