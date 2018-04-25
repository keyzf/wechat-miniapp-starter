const { assign } = require('utils/object');
const { request, configUtil } = require('utils/request');
const { mock_prefix } = require('./app.config');

//应用初始化
const initApp = (app, paramsWithCode) => request(
  'GET', `${mock_prefix}/`,
  paramsWithCode,
  result => {
    assign(app.globalData, result); //扩充登录态等
    wx.setStorageSync('login_state', result.login_state);
  }
);

//业务请求：登录
const login = (account, password, callback) => request('POST', `${mock_prefix}/login`, { account, password }, callback);

//业务请求：登出
const logout = () => request('POST', `${mock_prefix}/logout`, {});

//业务请求：获得首页数据
const getIndex = callback => request('GET', `${mock_prefix}/index`, {}, callback);

module.exports = {
  init(app, paramsWithCode) {
    configUtil(app);
    assign(app.globalData, paramsWithCode);
    initApp(app, paramsWithCode);
    return this;
  },
  login,
  logout,
  getIndex
}