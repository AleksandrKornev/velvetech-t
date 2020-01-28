<template>
  <div 
    class="createProduct__wrapper"
    :class="{ active: isActive }"
  >
    <div class="createProduct">
      <span class="createProduct__title">Редактирование продукта</span>
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
          @click="editProduct"
        >Edit</div>
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
  name: "EditProduct",
  components: {
    vSelect
  },
  props: {
    isActive: {
      type: Boolean
    },
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ""
    },
    price: {
      default: 0
    },
    category_id: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    models: {
      newName: null,
      newPrice: null,
      categoryName: null
    },
    newCategoryID: null,
    inputs: [
      {
        name: "newName",
        placeholder: "Название",
        type: "text"
      },
      {
        name: "newPrice",
        placeholder: "Цена",
        type: "number"
      },
    ],
    categories: []
  }),
  watch: {
    name() {
      this.models.newName = this.name;
    },

    price() {
      this.models.newPrice = this.price;
    },

    category_id() {
      this.newCategoryID = this.category_id;
    }
  },
  validations: {
    models: {
      newName: {
        required
      },
      newPrice: {
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

    async editProduct() {
      if (!this.$v.$dirty) {
        this.$v.$touch();
        return;
      }
      if (this.$v.$invalid) return;

      const { newName, newPrice } = this.models;
      const { id } = this;

      const body = {
        id,
        name: newName, 
        price: newPrice, 
        category_id: this.categoryID
      }

      const isRes = await this.$store.dispatch("EDIT_PRODUCT", body);
      if (!isRes) {
        eventBus.$emit("notification--error", "Имя уже занято");
        return false;
      } 

      eventBus.$emit("notification--success", "Категория успешно изменена");
      this.$emit("ok");
    },

    resetFields() {
      this.models.name = null;
      this.models.price = null;
      this.models.categoryName = null;
      this.$v.models.$reset();
    },
    
    cancel() {
      this.resetFields();
      this.$emit("cancel");
    }
  }
}
</script>

<style lang="scss">
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