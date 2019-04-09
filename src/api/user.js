import fetch_requset from '../config/fetch'

const API_CONFIG = '/api/user';

/**
 * [doLogin 登录]
 * @return {[type]}  [description]
 */
export const doLogin = (data) => {
  const url = `${API_CONFIG}/login`;
  return fetch_requset(url,data,'POST')
}

export const writeFileJson = (data) => {
  const url = `${API_CONFIG}/writeFileJson`;
  return fetch_requset(url,data,'GET')
}

//测试接口 获取本地的登录数据
export const doTestLogin = (url) => {
  return fetch_requset(url)
}
/**
 * [注册新用户]
 */
export const registerUser = (data)=>{
  const url = `${API_CONFIG}/registerUser`;
  return fetch_requset(url,data,'POST')
}
/**
 * [添加新增备课列表信息]
 */
export const addClassListInfo = (data) => {
  const url = `${API_CONFIG}/addClassListInfo`;
  return fetch_requset(url,data,'POST')
}
/**
 * [添加班级学生信息]
 */
export const addStudentUser = (data) => {
  const url = `${API_CONFIG}/addStudentUser`;
  return fetch_requset(url,data,'POST')
}
/**
 * [修改班级学生信息]
 */
export const updateStudentUser = (data) => {
  const url = `${API_CONFIG}/updateStudentUser`;
  return fetch_requset(url,data,'POST')
}
/**
 * [删除学生信息]
 */
export const deleteStudentUser = (data) => {
  const url = `${API_CONFIG}/deleteStudentUser`;
  return fetch_requset(url,data,'POST')
}
