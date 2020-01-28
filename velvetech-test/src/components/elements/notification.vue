<template>
  <div 
    class="notification__wrapper"
    :class="{
      active: isActive,
      success: isSuccess,
      error: isError,
    }"
  >
    <span class="notification__title">Уведомление</span>
    <div class="notification__line"></div>
    <div class="notification__message">{{ message }}</div>
  </div>
</template>

<script>
import eventBus from '@/utils/eventBus';

export default {
  name: "Notification",
  data() {
    return {
      isActive: null,
      isSuccess: null,
      isError: null,
      message: 'Данные успешно сохранены'
    }
  },
  created() {
    eventBus.$on('notification', this.handler);
    eventBus.$on('notification--success', this.isSuccessHandler);
    eventBus.$on('notification--error', this.isErrorHandler);
  },
  beforeDestroy() {
    eventBus.$off('notification', this.handler);
    eventBus.$off('notification--success', this.isSuccessHandler);
    eventBus.$off('notification--error', this.isErrorHandler);
  },
  methods: {
    isSuccessHandler(message) {
      this.isSuccess = true;
      this.handler(message);
    },

    isErrorHandler(message) {
      this.isError = true;
      this.handler(message);
    },

    async handler(message) {
      this.isActive = null;
      this.message = null;

      this.isActive = true;
      this.message = message;

      await new Promise((res) => {
        setTimeout(() => { res() }, 2000);
      })

      this.isActive = false;
      this.isError = false;
      this.isSuccess = false;
    }
  },
}
</script>

<style lang="scss">
.notification {
  &__wrapper {
    position: fixed;
    right: -450px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    width: 400px;
    min-height: 120px;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    transition: .5s;
    z-index: 99999;

    &.active {
      right: 20px;
    }

    &.error {
      background: #ff5756;
    }

    &.success {
      background: #55d27a;
    }
  }

  &__title {
    display: block;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: left;
    font-size: 28px;
  }

  &__line {
    width: 100%;
    height: 1px;
    background: lightgray;
  }

  &__message {
    padding: 15px 20px;
    text-align: left;
  }
}
</style>