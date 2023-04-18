/*
 * @Author: weisheng
 * @Date: 2023-04-17 11:53:54
 * @LastEditTime: 2023-04-17 12:32:02
 * @LastEditors: weisheng
 * @Description:
 * @FilePath: \uniapp-vue3-fant-ts\src\mock\mock.ts
 * 记得注释
 */
import BaseResponse from '@/model/BaseResponse'
import UserInfo from '@/model/UserInfo'
import { CommonUtil } from '@/uni_modules/fant-mini-plus'
import Mock from 'better-mock'

const Random = Mock.Random
/**
 * 登录
 */
const login = function () {
  const resp: BaseResponse<UserInfo> = new BaseResponse()
  const userInfo = new UserInfo()
  userInfo.linkMan = Random.cname()
  userInfo.token = CommonUtil.s4()
  resp.code = 200
  resp.data = userInfo
  resp.msg = '事实上事实上'
  return resp
}

Mock.mock('/login', 'post', login)
