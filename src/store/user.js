import { defineStore } from "pinia";

const UseInfoStore = defineStore("userInfo", {
  state: () => ({
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  }),
  actions: {
    async setUserInfo(userInfo) {
      this.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
  },
  getters: {
    async getUserInfo() {
      return this.userInfo;
    },
  },
  persist: {
    key: "userInfo",
    storage: localStorage,
  },
});

export default UseInfoStore;
