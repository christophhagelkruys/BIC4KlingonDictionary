<template>
<div class="card">
    <header class="card-header">
        <p class="card-header-title is-centered">
            {{capitalize(values[config.formConfig[0].key])}}
        </p>
    </header>
    <div class="card-content">
        <div class="content">
            <template v-if="config && form.originalData">
                <query-message :success="form.isSuccess()" :fail="form.isFail()"
                               :message="form.failMessage || form.successMessage"></query-message>
                <template v-for="configElement in config.formConfig">
                    <div class="block">
                        <config-element-component :config="configElement" :value="form.originalData[configElement.key]" @value-change="saveValue"></config-element-component>
                    </div>
                </template>
            </template>
            <div v-if="terms.length > 0" class="dropdown is-active">
                <div class="dropdown">
                    <div class="dropdown-trigger">
                        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                            <span v-on:click="isActive = true">{{ selectedTerm != null ? selectedTerm.name : 'Select Term' }}</span>
                            <span class="icon is-small">
                                <i class="fa fa-angle-down" aria-hidden="true"></i>
                            </span>
                        </button>
                    </div>
                    <div v-if="isActive" class="dropdown-menu" id="dropdown-menu3" role="menu">
                        <div class="dropdown-content">
                            <template v-for="term in terms">
                                <a class="dropdown-item" v-on:click="setTerm(term)"> {{term.name}}</a>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="card-footer">
        <a v-if="mode.includes('Edit')" v-on:click="save" class="card-footer-item">Save</a>
        <a v-if="mode.includes('Create')" v-on:click="create" class="card-footer-item">Create</a>
    </footer>
</div>
</template>

<script>

import {capitalize, FormEnum, TermBase} from "../utilities/FormHelpers";

export default {
    props: {
      mode: {
        required: true,
      },
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
        save(){
            this.form.put(`${this.config.baseUrl}/${this.form.originalData['slug']}`)
        },
        create(){
            this.form.post(`${this.config.baseUrl}`)
        },
        saveValue({key,value}){
            this.form.originalData[key] = value;
        },
        setTerm(term){
            this.form.originalData.term_id = term.id;
            this.isActive = false;
            this.selectedTerm = term;
        },
        capitalize(s){
            return capitalize(s);
        },
    },
    data:  () => {
        return {
            isEditing: false,
            form: new Form(),
            terms: [],
            isActive: false,
            selectedTerm: undefined,
        }
    },
    created(){
        if(this.mode === FormEnum.TRANSLATION_CREATE){
            axios.get(TermBase.listUrl).then( (response) => {
                this.terms = response.data;
            });
        }
    }
}
</script>

<style scoped>

</style>
