<template>
  <div class="categories">
    <CreateCategory
      :isActive="isCreateCategory"
      @ok="handleCreate"
      @cancel="isCreateCategory = false"
    />
    <EditCategory
      :isActive="isEditCategory"
      :id="currentCategory.id"
      :name="currentCategory.name"
      @ok="handleEdit"
      @cancel="isEditCategory = false"
    />
    <div 
      class="categories__block"
      v-for="(item, index) in formatCategories" :key="index"
    >
      <Category 
        v-if="!item.isHidden && !item.newItem"
        :name="item.name" 
        :id="item.id" 
        @edit="handleEditCall"
        @delete="handleDelete"
      />
      <div 
        class="categories__new"
        v-else-if="item.newItem"
        @click="isCreateCategory = true"
      >
        <div class="categories__new__plus"></div>
      </div>
      <div 
        class="categories__temp"
        aria-hidden="true"
        v-else-if="item.isHidden"
      />
    </div>
  </div>
</template>

<script>
import Category from '@/components/dashboard/category';
import CreateCategory from '@/components/dashboard/createCategory';
import EditCategory from '@/components/dashboard/editCategory';

import formatItems from "@/helpers/flexLastItem";

export default {
  name: "Categories",
  components: {
    Category,
    CreateCategory,
    EditCategory
  },
  data: () => ({
    categories: [
      {
        id: 1,
        name: "t"
      }
    ],
    isCreateCategory: null,
    isEditCategory: null,
    currentCategory: {
      id: null,
      name: null
    }
  }),
  computed: {
    formatCategories() {
      return formatItems(this.categories);
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

    handleCreate() {
      this.isCreateCategory = false;
      this.getCategories();
    },

    handleEdit() {
      this.isEditCategory = false;
      this.getCategories();
    },

    handleEditCall({ id, name }) {
      this.currentCategory = { id, name };
      this.isEditCategory = true;
    },

    handleDelete() {
      this.getCategories();
    }
  }
}
</script>

<style lang="scss">
.categories {
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