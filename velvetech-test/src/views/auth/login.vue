<template>
  <div class="auth__wrapper">
    <div class="auth__window">
      <span class="auth__window__title">Authorization</span>
      <div class="auth__window__inputs">
        <input 
          class="auth__window__inputs__input"
          type="text"
          placeholder="email"
          v-model="email"
        >
        <input 
          class="auth__window__inputs__input"
          type="text"
          placeholder="password"
          v-model="password"
        >
      </div>
      <div class="auth__window__btns">
        <div 
          class="auth__window__btns__btn cancel"
          @click="$router.push('/auth')"
        >Cancel</div>
        <div 
          class="auth__window__btns__btn ok"
          @click="auth"
        >Log in</div>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "../../utils/eventBus";

export default {
  name: "auth",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async auth() {
      if (this.email.length === 0 || this.password.length === 0) return false;

      const { email, password } = this;

      const isSuccess = await this.$store.dispatch("AUTH", { email, password });
      if (!isSuccess) {
        eventBus.$emit("notification--error", "Неверный email или пароль");
      }
    }
  }
}
</script>

<style lang="scss">
.auth {
  &__wrapper {
    @include wrapper-c;
  }

  &__window {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 400px;
    padding-top: 20px;
    border-radius: 30px;
    box-sizing: border-box;
    background: #fff;

    &__title {
      font-size: 24px;
    }

    &__inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;

      &__input {
        margin-bottom: 30px;
        padding: 8px 15px;
        border: none;
        border-bottom: 1px solid lightgray;
        font-size: 16px;
        outline: none;
      }
    }

    &__btns {
      display: flex;
      justify-content: space-around;
      width: 100%;

      &__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40%;
        padding: 10px 15px;
        color: #fff;
        cursor: pointer;
        transition: .4s;

        &.ok {
          border-bottom-right-radius: 20px;
          background: #55dc55;

          &:hover {
            background: #75cf75;
          }
        }

        &.cancel {
          border-bottom-left-radius: 20px;
          background: #ec4646;

          &:hover {
            background: #dd5b5b;
          }
        }
      }
    }
  }
}
</style>