<template>
<div class="card">
    <header class="card-header">
        <p class="card-header-title is-centered">
            Card Header
        </p>
    </header>
    <div class="card-content">
        <div class="content">
            <template v-if="config">
                <template v-for="configElement in config.formConfig">
                    <div class="block">
                        <config-element-component :config="configElement" v-model="values[configElement.key]"></config-element-component>
                    </div>
                </template>
            </template>
        </div>
    </div>
    <!--<pre>{{this.form}}</pre>-->
    <footer class="card-footer">
        <a v-if="!isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Edit</a>
        <a v-if="!isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Delete</a>
        <a v-if="isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Save</a>
        <a v-if="isEditing" v-on:click="isEditing = !isEditing" class="card-footer-item">Cancel</a>
    </footer>
</div>
</template>

<script>

import {setFormValues} from "../utilities/FormHelpers";

export default {
    props: {
      config: {
          required: true,
      },
      values: {
          type: Object,
          required: true,
      }
    },
    watch: {
        config: {
            handler(curr, _) {
                console.log(curr);
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
        }
    },
}
</script>

<style scoped>

</style>
