<template>
  <div class="dashboard__wrapper">
    <Back 
      class="dashboard__back"
      v-if="$store.state.dashboard.isShowBack"
      @click="redirect"
    />
    <div 
      class="dashboard__btn"
      @click="exit"
    >Выход</div>
    <div class="dashboard__window">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Back from "@/components/elements/back";
import eventBus from "@/utils/eventBus";

export default {
  name: "Dashboard",
  components: {
    Back
  },
  created() {
    eventBus.$on("btnBack", this.redirect);
  },
  beforeDestroy() {
    eventBus.$off("btnBack", this.redirect);
  },
  methods: {
    redirect() {
      const path = this.$store.state.dashboard.pathForRedirect;
      this.$router.push(path);
    },

    exit() {
      this.$store.commit("EXIT");
    }
  }
}
</script>

<style lang="scss">
.dashboard {
  &__wrapper {
    @include wrapper-c;
  }

  &__window {
    @include wrapper-c;

    width: 900px;
    height: 700px;
    border-radius: 15px;
    background: #fff;
    overflow: hidden;
  }

  &__back {
    position: absolute;
    left: 20px;
    top: 20px;
  }

  &__btn {
    position: absolute;
    top: 20px;
    right: 30px;
    padding: 10px 20px;
    border-radius: 10px;
    background: #3d3d3d;
    color: #fff;
    transition: .4s;
    cursor: pointer;

    &:hover {
      background: #5e5e5e;
    }
  }
}
</style>