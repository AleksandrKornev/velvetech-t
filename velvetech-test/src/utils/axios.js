import * as $axios from 'axios';

const baseURL = "http://localhost:3030";

export const axios = $axios.create({
  baseURL,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
});

/** 
 * @description Соединение с сервером 
 * @contentType application/json
 * @param {String} [method] - метод запроса
 * @param {String} url - адрес для запроса
 * @param {String} token - токен авторизации
 * @param {Object} body  - тело запроса
 * 
 * @returns {Any}
 */  

export async function axiosToken(method, url, token, body) {
  url = url ? url : '';
  method = method ? method.toLowerCase() : 'GET';  

  let res = $axios.create({
    baseURL,
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? 'Bearer ' + token : ''
    },
    timeout: 10000
  });

  return await res[method](url, body);
}