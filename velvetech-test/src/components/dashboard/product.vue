<template>
  <div class="product">
    <div class="product__content">
      <div class="product__content__bg"></div>
      <span class="product__content__text">{{ name }}</span>
    </div>
    <div 
      class="product__footer"
      :class=" { active: isActive } "
    >
      <span 
        class="product__footer__more"
        :class="{ active: !isActive }"
        @click="isActive = true"
      >...</span>
      <div 
        class="product__footer__actions"
        :class="{ active: isActive }"
      >
        <span 
          class="product__footer__actions__hide"
          :class="{ active: !isActive }"
          @click="isActive = false"
        >Hide</span>
        <span 
          class="product__footer__actions__edit"
          :class="{ active: !isActive }"
          @click="edit"
        >Edit</span>
        <span 
          class="product__footer__actions__delete"
          :class="{ active: !isActive }"
          @click="del"
        >Delete</span>
      </div>
    </div>
  </div>
</template>

<script>
import eventBus from "@/utils/eventBus";


export default {
  name: "Product",
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      required: true
    },
    category_id: {
      type: Number,
      required: true
    },
  },
  data: () => ({
    isActive: null
  }),
  methods: {
    edit() {
      const { id, name, price, category_id } = this;
      this.$emit("edit", { id, name, price, category_id });
    },

    async del() {
      const isRes = await this.$store.dispatch("DELETE_PRODUCT", this.id);
      if (!isRes) {
        eventBus.$emit("notification--error", "Не удалось удалить продукт");
        return false;
      } 

      eventBus.$emit("notification--success", "Продукт успешно удален");
      this.$emit("delete");

      return true;
    }
  }
}
</script>

<style lang="scss">
.product {
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 220px;
  margin: 0 auto;
  border: 1px solid #d4d4d4;
  border-radius: 20px;
  background: #fff;
  overflow: hidden;
  transition: .8s;

  &:hover {
    box-shadow: 0 0 10px .1px #747474;
  }

  &:hover & {
    &__content {
      &__bg {
        width: 110%;
        height: 110%;
        background: #bbcfeb;
      }

      &__text {
        color: #fff;
      }
    }
  }
  
  &.active & {
    &__content {
      height: 30%;
    }
  }

  &__content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 75%;
    border-bottom: 1px solid #d4d4d4;
    transition: .8s;
    overflow: hidden;

    &__bg {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 20px;
      transform: translate(-50%, -50%);
      background: #fff;
      transition: .8s;
    }

    &__text {
      position: relative;
      transition: .8s;
    }
  }

  &__footer {
    @include wrapper;
    height: 25%;
    background: #dadada;
    transition: .8s;

    &.active {
      height: 70%;
    }

    &:not(.active):hover {
      background: #bbcfeb;
    }

    &__more {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0;
      height: 0;
      color: #fff;
      text-decoration: none;
      overflow: hidden;
      cursor: pointer;

      &.active {
        height: 100%;
        width: 100%;
      }
    }

    &__actions {
      @include wrapper;
      flex-wrap: wrap;
      height: 0;
      width: 0;
      overflow: hidden;

      &.active {
        height: 100%;
        width: 100%;
      }

      &__link, &__hide, &__edit, &__delete {
        @include wrapper;
        width: 50%;
        height: 50%;
        color: #ffffff;
        cursor: pointer;
      }

      &__link {
        background: #bbcfeb;
        text-decoration: none;
      }

      &__hide {
        background: #95afe8;
      }

      &__edit {
        background: #dc9e51;
      }

      &__delete {
        width: 100%;
        background: #e46d6d;
      }
    }
  }
}
</style>