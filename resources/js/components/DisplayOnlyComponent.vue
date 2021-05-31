<template>
<div class="card">
    <header class="card-header">
        <p class="card-header-title is-centered">
            Card Header
        </p>
    </header>
    <div class="card-content">
        <div class="content">
            test
        </div>
    </div>
    <pre>{{this.form}}</pre>
    <footer class="card-footer">
        <a v-if="!isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Edit</a>
        <a v-if="!isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Delete</a>
        <a v-if="isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Save</a>
        <a v-if="isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Cancel</a>
    </footer>
</div>
</template>

<script>

import {FormEnum, setFormValues} from "../utilities/FormHelpers";

export default {
    props: {
      mode: {
          type: FormEnum.TERM | FormEnum.TRANSLATION,
          required: true,
      },
      values: {
          type: Object,
          required: true,
      }
    },
    watch: {
      mode: {
          handler(curr, _) {
            this.config = FormEnum[curr];
          },
          immediate: true,
      },
      values: {
          handler(curr, _) {
              setFormValues(this.form,curr);
          },
          immediate: true,
      },
    },
    data:  () => {
        return {
            isEditing: false,
            form: new Form(),
            config: {},
        }
    },
}
</script>

<style scoped>

</style>
