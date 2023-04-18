/*
 * @Author: weisheng
 * @Date: 2023-04-17 12:51:22
 * @LastEditTime: 2023-04-18 20:37:06
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\api\DemoApi.ts
 * 记得注释
 */
import http from '@/http/http'
import BaseResponse from '@/model/BaseResponse'
import Chanel from '@/model/Chanel'
import UserInfo from '@/model/UserInfo'

export default class DemoApi {
  /**
   * 登录
   */
  static login(): Promise<BaseResponse<UserInfo>> {
    return http
      .server()
      .post('api/login', {}, {})
      .then((res) => {
        return res.data
      })
  }

  /**
   * 登录
   */
  static init(): Promise<BaseResponse<Chanel[]>> {
    return http
      .server()
      .post('api/init', {}, {})
      .then((res) => {
        return res.data
      })
  }
}
