<!-- eslint-disable vue/multi-word-component-names -->
<!-- Modal Component -->
<template>
  <div class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <header class="modal-header">
        <slot name="header"></slot>
      </header>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
      <footer class="modal-footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style>
/* Style for the modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure the modal is above the calendar */
}
.modal-content {
  background-color: #fff !important;
  padding: 20px;
  border-radius: 8px !important;
  max-width: 500px;
  width: 100%;
  z-index: 1001; /* Ensure content is on top of the overlay */
}
.modal-header {
  padding-bottom: 10px;
  border-bottom: 1px solid #e4dbdb;
}
.modal-footer,
.modal-body {
  margin-top: 10px;
}
.modal-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.modal-footer button {
  margin-left: 10px;
}
</style>
