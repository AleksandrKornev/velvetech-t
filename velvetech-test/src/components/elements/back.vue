<template>
  <div 
    class="back"
    @click="click"
  >Назад</div>
</template>

<script>
export default {
  name: "Back",
  methods: {
    click() {
      this.$emit("click");
    }
  }
}
</script>

<style lang="scss">
.back {
  position: absolute;
  padding: 10px 20px;
  border-radius: 15px;
  background: #7692c7;
  color: #fff;
  transition: .4s;
  user-select: none;
  cursor: pointer;

  &:hover {
    background: #90a6cf;
  }
}
</style>