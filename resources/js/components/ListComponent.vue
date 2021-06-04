<template>
    <div>
        <template v-if="mode === type.TRANSLATION_SEARCH && config">
            <div class="container">
                <form  @submit.prevent="submit" class="column">
                    <div class="field">
                        <label class="label" for="title">Search</label>
                        <div class="control">
                            <input id="title"
                                   v-model="form.q"
                                   name="query"
                                   class="input"
                                   type="text" autofocus>
                        </div>

                    </div>
                    <button class="button is-primary" >
                        Search {{config.name}}
                    </button>
                </form>


            </div>
        </template>
        <div class="container is-fluid">
            <div class="columns is-multiline">
                <template v-if="config && entries && !isLoading">
                    <template v-for="entry in entries">
                        <div class="column is-one-third">
                            <form-readonly-component :config="config" v-bind:values="entry" v-on:delete="deleteAndReload"></form-readonly-component>
                        </div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {EnumConfig, FormEnum, FormTypes} from "../utilities/FormHelpers";
import FormComponent from "./FormComponent";
import FormReadonlyComponent from "./FormReadonlyComponent";

let form = new Form({
    q: '',
    noReset: ['q'],
});
export default {
    components: {FormReadonlyComponent, FormComponent},
    props: {
        mode: {
            type: String,
            required: true,
        },
    },
    watch: {
        mode: {
            handler(curr, _) {
                this.config = EnumConfig[curr];
            },
            immediate: true,
        },
    },
    computed: {
      isLoading(){
          return this.loading;
      }
    },
    methods: {
        load(){
            this.loading = true;
            axios.get(this.config.listUrl).then( (response) => {
                this.entries = response.data;
                this.loading = false;
            }).catch((err) => {
                console.log(err);
                this.loading = false;
            });
        },
        deleteAndReload(slug){
            axios.delete(`${this.config.baseUrl}/${slug}`).then( () => {
                this.load();
            });
        },
        submit(){
            this.loading = true;
            this.form.post(this.config.searchUrl).then((response)=>{
                this.entries = response;
                this.loading = false;
            })
        },
    },
    data:  () => {
        return {
            entries: [],
            config: {},
            query: '',
            loading: true,
            form: form,
            type: FormEnum
        }
    },
    created() {
        this.load();
    }
}
</script>

<style scoped>

</style>
