import { axiosToken } from "@/utils/axios";
import to from "await-to-js";

const dashboard = {
  state: {
    categories: null,
    products: null,
    isShowBack: null,
    pathForRedirect: ""
  },
  getters: {},
  mutations: {},
  actions: {
    async GET_PRODUCTS({ rootState }, id) {
      const url = "/products?category_id=" + id;
      const token = rootState.auth.accessToken.token;

      let [err, obj] = await to(axiosToken("GET", url, token));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data.data;
      }

      return obj;
    },

    async CREATE_PRODUCT({ rootState }, body) {
      const url = "/products";
      const token = rootState.auth.accessToken.token;

      let [err, obj] = await to(axiosToken("POST", url, token, body));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data.data;
      }

      return obj;
    },

    async EDIT_PRODUCT({ rootState }, body) {
      const url = "/products/" + body.id;
      const token = rootState.auth.accessToken.token;
      delete body.id;

      let [err, obj] = await to(axiosToken("PUT", url, token, body));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data;
      }

      return obj;
    },

    async DELETE_PRODUCT({ rootState }, id) {
      const url = "/products/" + id;
      const token = rootState.auth.accessToken.token;

      let [err, obj] = await to(axiosToken("DELETE", url, token));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data;
      }

      return obj;
    },

    /* bottom category */

    async GET_CATEGORIES({ rootState }) {
      const url = "/categories";
      const token = rootState.auth.accessToken.token;

      let [err, obj] = await to(axiosToken("GET", url, token));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data.data;
      }

      return obj;
    },

    async CREATE_CATEGORY({ rootState }, body) {
      const url = "/categories";
      const token = rootState.auth.accessToken.token;

      let [err, obj] = await to(axiosToken("POST", url, token, body));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data.data;
      }

      return obj;
    },

    async EDIT_CATEGORY({ rootState }, body) {
      const url = "/categories/" + body.id;
      const token = rootState.auth.accessToken.token;
      delete body.id;

      let [err, obj] = await to(axiosToken("PUT", url, token, body));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data;
      }

      return obj;
    },

    async DELETE_CATEGORY({ rootState }, id) {
      const url = "/categories/" + id;
      const token = rootState.auth.accessToken.token;

      let [err, obj] = await to(axiosToken("DELETE", url, token));
      if (err) return false;
      
      else if(obj.status == 200 && obj) {
        obj = obj.data;
      }

      return obj;
    }
  }
}

export default dashboard;