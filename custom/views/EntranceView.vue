<script setup>

import NewVisitor from "@@/components/NewRequest.vue";
import Validate from "@@/components/Validate.vue";

const htmlElement = document.querySelector("html")
if (htmlElement.getAttribute("data-bs-theme") === 'auto') {
  function updateTheme() {
    document.querySelector("html").setAttribute("data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)
  updateTheme()
}
</script>

<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.7/css/bootstrap.min.css" integrity="sha512-fw7f+TcMjTb7bpbLJZlP8g2Y4XcCyFZW8uy8HsRZsH/SwbMw0plKHFHr99DN3l04VsYNwvzicUX/6qurvIxbxw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <div class="container-xxl h-100 p-3">
    <div class="row h-100">
        <div class="col-lg-5 border-end">
          <validate></validate>
        </div>
        <div class="col-lg-7">
          <new-visitor></new-visitor>
        </div>
    </div>
    <button type="button" class="bottom-0 btn btn-secondary position-fixed translate-middle-y" onclick="document.querySelector('body').requestFullscreen();">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-fullscreen" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707m0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707m-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707"></path>
      </svg>
    </button>
  </div>
</template>
