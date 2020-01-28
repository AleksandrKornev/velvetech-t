import { axios } from "../utils/axios";
import to from "await-to-js";
import jwtDecode from "jwt-decode";

const auth = {
  state: {
    userID : null,
    accessToken : {
      token: null,
      iat: null,
      exp: null
    },
    checkData : ["accessToken", "userID"] 
  },
  getters: {},
  mutations: {
    EXIT (state) {
      for (let i = 0; i < 5; i++) {
        if (!!state.checkData[i]) {
          localStorage.removeItem(state.checkData[i]);
          state[state.checkData[i]] = null;
        }
      }
      console.log("exit");
    },

    RECORD_AUTH ( state, data ) {
      state[data.name] = data.value;
      if (typeof data.value == "object") {
        localStorage.setItem(data.name, JSON.stringify(data.value));
      }
      else localStorage.setItem(data.name, data.value);
    },

    LOAD_AUTH (state) {
      for (let i = 0; i < 5; i++) {
        let item = localStorage.getItem(state.checkData[i]);
        if (!!item) {
          if (item.indexOf("token") != -1) {
            state[state.checkData[i]] = JSON.parse(item);
          }
          else state[state.checkData[i]] = item;
          
        }
      }
    }
  },
  actions: {
    async AUTH ({ commit }, body) {
      const url = "/authentication";
      body = {
        ...body,
        strategy: "local"
      }

      const [err, obj] = await to(axios.post(url, body));
      if(err) return false;

      const data = obj.data;

      /* record data auth in state, seconds exp and iat to milliseconds */

      const parseToken = jwtDecode(data.accessToken);

      commit("RECORD_AUTH", { name: "accessToken", value: {
          token: data.accessToken,
          iat: parseToken.iat * 1000,
          exp: parseToken.exp * 1000
        }
      });

      commit("RECORD_AUTH", { name: "userID", value: data.user.id });
      
      return true;
    },

    async REG ({}, body) {
      const url = "/users";
      const [err, obj] = await to(axios.post(url, body));
      if (err) return false;

      return true;
    }
  }
}

export default auth;