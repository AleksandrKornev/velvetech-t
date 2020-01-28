<template>
  <div class="products">
    <CreateProduct
      :isActive="isCreateProduct"
      @ok="handleCreate"
      @cancel="isCreateProduct = false"
    />
    <EditProduct
      :isActive="isEditProduct"
      :id="currentProduct.id"
      :name="currentProduct.name"
      :price="currentProduct.price"
      :category_id="currentProduct.category_id"
      @ok="handleEdit"
      @cancel="isEditProduct = false"
    />
    <div 
      class="products__block"
      v-for="(item, index) in formatProducts" :key="index"
    >
      <Product 
        v-if="!item.isHidden && !item.newItem"
        :id="item.id" 
        :name="item.name" 
        :price="item.price" 
        :category_id="item.category_id" 
        @edit="handleEditCall"
        @delete="handleDelete"
      />
      <div 
        class="products__new"
        v-else-if="item.newItem"
        @click="isCreateProduct = true"
      >
        <div class="products__new__plus"></div>
      </div>
      <div 
        class="products__temp"
        aria-hidden="true"
        v-else-if="item.isHidden"
      />
    </div>
  </div>
</template>

<script>
import Product from "@/components/dashboard/product";
import CreateProduct from '@/components/dashboard/createProduct';
import EditProduct from '@/components/dashboard/editProduct';

import formatItems from "@/helpers/flexLastItem";

export default {
  name: "Products",
  components: {
    Product,
    CreateProduct,
    EditProduct
  },
  data: () => ({
    products: [],
    isCreateProduct: null,
    isEditProduct: null,
    currentProduct: {
      id: null,
      name: null,
      price: null,
      category_id: null,
    }
  }),
  computed: {
    formatProducts() {
      return formatItems(this.products);
    }
  },
  created() {
    this.$store.state.dashboard.isShowBack = true;
    this.$store.state.dashboard.pathForRedirect = "/dashboard/category/";
    this.getProducts();
  },
  beforeDestroy() {
    this.$store.state.dashboard.isShowBack = false;
  },
  methods: {
    async getProducts() {
      const id = this.$route.params.id;
      const result = await this.$store.dispatch("GET_PRODUCTS", id);
      if (!result) return false;

      this.products = result;
    },

    handleCreate() {
      this.isCreateProduct = false;
      this.getProducts();
    },

    handleEdit() {
      this.isEditProduct = false;
      this.getProducts();
    },

    handleEditCall({ id, name, price, category_id }) {
      this.currentProduct = { id, name, price, category_id };
      this.isEditProduct = true;
    },

    handleDelete() {
      this.getProducts();
    }
  }
}
</script>

<style lang="scss">
.products {
  @include wrapper;
  justify-content: space-evenly;
  flex-wrap: wrap;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;

  &__block {
    margin-bottom: 30px;
  }

  &__new {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 220px;
    height: 220px;
    margin: 0 auto;
    border: 1px solid #d4d4d4;
    border-radius: 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    cursor: pointer;
    transition: .4s;

    &:hover {
      border-width: 3px;
    }

    &:hover & {
      &__plus {
        width: 30px;
        height: 30px;
        background: rgba(139, 139, 139, .5);
        transform: translate(-50%, -50%) rotate(-45deg);

        &::before, &::after {
          height: 4px;
        }
      }
    }

    &__plus {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 1px;
      background: #fff;
      transform: translate(-50%, -50%) rotate(45deg);
      border-radius: 100%;
      transition: .4s;

      &::before, &::after {
        content: '';
        position: absolute;
        width: 40px;
        height: 2px;
        background: #8b8b8b;
        transition: .4s;
      }

      &::before {
        transform: rotate(45deg);
      }
      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  &__temp {
    width: 220px;
    height: 220px;
  }
}
</style>