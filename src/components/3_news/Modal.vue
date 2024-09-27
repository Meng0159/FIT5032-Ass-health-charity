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
/* Modal styles */
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
  z-index: 1050; /* Make sure the modal is above the calendar */
}
.modal-content {
  background: #42c0dd;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  z-index: 1100; /* Higher z-index to appear above other elements */
}
.modal-header,
.modal-footer {
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.modal-body {
  margin-top: 10px;
}

/* Make sure calendar z-index is lower than modal */
.fc {
  z-index: 1000;
}
</style>
