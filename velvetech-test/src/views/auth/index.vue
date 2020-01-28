<template>
  <div class="auth__wrapper">
    <div class="auth__form">
      <router-link 
        class="auth__form__btn"
        to="/auth/reg"
      >Sign up</router-link>
      <router-link 
        class="auth__form__btn"
        to="/auth/login"
      >Log in</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  methods: {
    auth() {
      this.$store.dispatch("AUTH");
    }
  }
}
</script>

<style lang="scss">
.auth {
  &__wrapper {
    @include wrapper-c;
  }

  &__form {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 500px;
    height: 300px;
    background: #f1f1f1;
    border-radius: 30px;

    &__btn {
      padding: 15px 60px;
      border-radius: 15px;
      background: #4463b8;
      color: #fff;
      box-shadow: 0 0 8px 0.5px #475fa2;
      transition: .4s;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        box-shadow: 0 0 1px .5px #3b3b3b;
      }
    }
  }
}
</style>