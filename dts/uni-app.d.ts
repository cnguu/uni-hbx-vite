declare namespace UniNamespace {
  interface RequestTask {
    uid?: string
  }
  interface UploadTask {
    uid?: string
  }
  interface DownloadTask {
    uid?: string
  }
  interface GetAppBaseInfoResult {
    uniPlatform: string
  }
  interface SubscriptionsSetting {
    itemSettings?: Record<string, 'accept' | 'reject' | 'ban'>
  }
  interface GetPhoneNumberRes {
    errMsg: string
    cloudID?: string
    code?: string
    encryptedData?: string
    iv?: string
  }
}
