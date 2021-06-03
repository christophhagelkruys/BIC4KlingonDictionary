<template>
<div class="card">
    <header class="card-header">
        <p class="card-header-title is-centered">
            {{form.originalData[config.formConfig[0].key]}}
        </p>
    </header>
    <div class="card-content">
        <div class="content">
            <template v-if="config">
                <template v-for="configElement in config.formConfig">
                    <div class="block">
                        <config-element-readonly-component :config="configElement" :value="form.originalData[configElement.key]"></config-element-readonly-component>
                    </div>
                </template>
            </template>
        </div>
    </div>
    <footer class="card-footer">
        <a v-on:click="openEditView" class="card-footer-item">Edit</a>
    </footer>
</div>
</template>

<script>

export default {
    props: {
      config: {
          required: true,
      },
      values: {
          type: Object,
          required: true,
      },
    },
    watch: {
      values: {
          handler(curr, _) {
              this.form = new Form(curr);
          },
          immediate: true,
      },
    },
    methods: {
        openEditView(){
            window.open(`${this.config.baseUrl}/${this.form.originalData['slug']}/edit`);
        }
    },
    data:  () => {
        return {
            isEditing: false,
            form: new Form(),
            terms: [],
        }
    },
}
</script>

<style scoped>

</style>
