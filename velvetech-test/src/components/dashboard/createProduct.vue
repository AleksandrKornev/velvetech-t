<template>
  <div 
    class="createProduct__wrapper"
    :class="{ active: isActive }"
  >
    <div class="createProduct">
      <span class="createProduct__title">Создание продукта</span>
      <div class="createProduct__form">
        <div 
          class="createProduct__form__item"
          v-for="(item, index) in inputs" :key="index"
        >
          <input 
            class="createProduct__form__item__input"
            :type="item.type" 
            :placeholder="item.placeholder"
            v-model="$v.models[item.name].$model"
          >
          <div class="createProduct__form__item__errors">
            <span 
              class="createProduct__form__item__errors__error"
              :class="{ 
                active: $v.models[item.name] && 
                !$v.models[item.name].required && 
                $v.models[item.name].$dirty
              }"
            >Поле обязательно к заполнению</span>
            <span 
              class="createProduct__form__item__errors__error"
              v-if="item.name == 'price'"
              :class="{ 
                active: $v.models[item.name] && 
                $v.models[item.name].required && 
                $v.models[item.name].$dirty &&
                !$v.models[item.name].between
              }"
            >Минимум 5, максимум 40</span>
          </div>
        </div>
        <div class="createProduct__form__item-category">
          <vSelect 
            class="createProduct__form__item-category__select"
            :options="categoriesText"
            v-model="$v.models.categoryName.$model"
          />
          <span 
            class="createProduct__form__item__errors__error"
            :class="{ 
              active: $v.models.categoryName && 
              !$v.models.categoryName.required && 
              $v.models.categoryName.$dirty
            }"
          >Поле обязательно к заполнению</span>
        </div>
      </div>
      <div class="createProduct__btns">
        <div 
          class="createProduct__btns__btn cancel"
          @click="cancel"
        >Cancel</div>
        <div 
          class="createProduct__btns__btn create"
          @click="createProduct"
        >Create</div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  required, 
  minLength, 
  maxLength, 
  between 
} from "vuelidate/lib/validators";
import vSelect from "vue-select";

import eventBus from "@/utils/eventBus";

export default {
  name: "CreateProduct",
  components: {
    vSelect
  },
  props: {
    isActive: {
      type: Boolean
    }
  },
  data: () => ({
    models: {
      name: null,
      price: null,
      categoryName: null
    },
    inputs: [
      {
        name: "name",
        placeholder: "Название",
        type: "text"
      },
      {
        name: "price",
        placeholder: "Цена",
        type: "number"
      },
    ],
    categories: []
  }),
  validations: {
    models: {
      name: {
        required
      },
      price: {
        required,
        between: between(5, 40)
      },
      categoryName: {
        required
      }
    }
  },
  computed: {
    categoriesText() {
      const id = this.$route.params.id;
      const arr = this.categories.sort((a, b) => {
        if (a.id != id) return 1;
        else return -1; 
      })
      const arrText = arr.map(el => el.name);
      
      this.models.categoryName = arrText[0];
      
      return arrText;
    },
    
    categoryID() {
      const name = this.models.categoryName;
      let categoryID;

      this.categories.forEach(category => {
        if (category.name === name) {
          categoryID = category.id;
        }
      })

      return categoryID;
    }
  },
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories() {
      const result = await this.$store.dispatch("GET_CATEGORIES");
      if (!result) return false;

      this.categories = result;
    },

    async createProduct() {
      if (!this.$v.$dirty) {
        this.$v.$touch();
        return;
      }
      if (this.$v.$invalid) return;

      const { name, price } = this.models;
      const body = { 
        name,  
        price,
        category_id: this.categoryID
      }

      const isRes = await this.$store.dispatch("CREATE_PRODUCT", body);
      if (!isRes) {
        eventBus.$emit("notification--error", "Имя уже занято");
        return false;
      } 

      eventBus.$emit("notification--success", "Продукт успешно создан");
      this.resetFields();
      this.$emit("ok");
    },
    
    cancel() {
      this.resetFields();
      this.$emit("cancel");
    },

    resetFields() {
      this.models.name = null;
      this.models.price = null;
      this.models.categoryName = null;
      this.$v.models.$reset();
    }
  }
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";

.createProduct {
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

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__item {
      margin-bottom: 20px;

      &__input {
        width: 270px;
        margin-bottom: 10px;
        padding: 8px 15px;
        border: none;
        border-bottom: 1px solid lightgray;
        box-sizing: border-box;
        font-size: 16px;
        outline: none;
      }

      &__errors {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 270px;
        margin-bottom: 10px;

        &__error {
          display: inline-block;
          width: 100%;
          max-height: 0;
          transition: .4s;
          overflow: hidden;
          color: #e67878;

          &.active {
            max-height: 60px;
          }
        }
      }

      &-category {
        width: 270px;
        cursor: pointer;

        &__select {
          margin-bottom: 20px;
        }
      }
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