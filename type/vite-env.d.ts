declare namespace Env {
  interface ImportMeta extends ImportMetaEnv {
    /** 应用标题 */
    readonly VITE_APP_TITLE: string
    /** 包 ID */
    readonly VITE_BUNDLE_ID: string
    /** 应用 ID */
    readonly VITE_UNI_APPID: string
    /** 应用版本名 */
    readonly VITE_VERSION_NAME: string
    /** 应用版本号 */
    readonly VITE_VERSION_CODE: string
    /** 应用 WGT 版本号，始终 >= 应用版本号 */
    readonly VITE_WGT_VERSION_CODE: string
    /**
     * 应用包是否是 A 包
     * AB 包区分，一般用于过审
     * A 包代表用户包
     * B 包代表非用户包
     */
    readonly VITE_PACKAGE_A: string
    /** 路由基础路径 */
    readonly VITE_BASE_PATH: string

    /** 请求接口地址 */
    readonly VITE_API: string
    /** 请求接口地址公共前缀 */
    readonly VITE_API_PREFIX: string

    /** 开发服务器端口 */
    readonly VITE_SERVER_PORT: string
    /** 开发服务器请求代理 */
    readonly VITE_SERVER_PROXY: string
  }
}

interface ImportMeta {
  readonly env: Env.ImportMeta
}
