<template>
  <div 
    class="createCategory__wrapper"
    :class="{ active: isActive }"
  >
    <div class="createCategory">
      <span class="createCategory__title">Создание категории</span>
      <div class="createCategory__form">
        <input 
          class="createCategory__input"
          type="text" 
          placeholder="name"
          v-model="$v.name.$model"
        >
        <span 
          class="createCategory__error"
          :class="{ 
            active: $v.name && 
            !$v.name.required && 
            $v.name.$dirty
          }"
        >Поле обязательно к заполнению</span>
      </div>
      <div class="createCategory__btns">
        <div 
          class="createCategory__btns__btn cancel"
          @click="cancel"
        >Cancel</div>
        <div 
          class="createCategory__btns__btn create"
          @click="createCategory"
        >Create</div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  required
} from "vuelidate/lib/validators";

import eventBus from "@/utils/eventBus";

export default {
  name: "CreateCategory",
  props: {
    isActive: {
      type: Boolean
    }
  },
  data: () => ({
    name: ""
  }),
  validations: {
    name: {
      required
    }
  },
  methods: {
    async createCategory() {
      if (!this.$v.$dirty) {
        this.$v.$touch();
        return;
      }
      if (this.$v.$invalid) return;

      const { name } = this;
      const isRes = await this.$store.dispatch("CREATE_CATEGORY", { name });
      if (!isRes) {
        eventBus.$emit("notification--error", "Имя уже занято");
        return false;
      } 

      eventBus.$emit("notification--success", "Категория успешно создана");
      this.$emit("ok");
    },
    
    cancel() {
      this.name = "";
      this.$v.name.$reset();
      this.$emit("cancel");
    }
  }
}
</script>

<style lang="scss">
.createCategory {
  &__wrapper {
    position: absolute;
    left: -100%;
    @include wrapper-c;
    width: 100%;
    height: 100%;
    z-index: 99;
    background: rgba(0, 0, 0, .6);
    transition: .5s linear;
    overflow: hidden;

    &.active {
      left: 0;
    }
  }

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 350px;
  height: 500px;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 30px;
  background: #fff;

  &__title {
    display: inline-block;
    font-size: 24px;
    margin-bottom: 30px;
  }

  &__input {
    margin-bottom: 20px;
    padding: 8px 15px;
    border: none;
    border-bottom: 1px solid lightgray;
    font-size: 16px;
    outline: none;
  }

  &__error {
    display: inline-block;
    max-height: 0;
    transition: .4s;
    overflow: hidden;
    color: #e67878;

    &.active {
      max-height: 60px;
    }
  }

  &__btns {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 50px;

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45%;
      height: 100%;
      color: #fff;
      transition: .4s;
      user-select: none;
      cursor: pointer;

      &.create {
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        background: #55dc55;

        &:hover {
          background: #75cf75;
        }
      }

      &.cancel {
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background: #ec4646;

        &:hover {
          background: #dd5b5b;
        }
      }
    }
  }
}
</style>