<template>
    <div>
        <div class="container is-fluid">
            <div class="columns is-multiline">
                <template v-if="config && entries">
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
import {EnumConfig, FormEnum} from "../utilities/FormHelpers";
import FormComponent from "./FormComponent";
import FormReadonlyComponent from "./FormReadonlyComponent";

export default {
    components: {FormReadonlyComponent, FormComponent},
    props: {
        mode: {
            type: FormEnum.TERM | FormEnum.TRANSLATION,
            required: true,
        },
    },
    watch: {
        mode: {
            handler(curr, _) {
                this.config = EnumConfig[curr];
            },
            immediate: true,
        }
    },
    methods: {
        load(){
            axios.get(this.config.listUrl).then( (response) => {
                this.entries = response.data;
            });
        },
        deleteAndReload(slug){
            axios.delete(`${this.config.baseUrl}/${slug}`).then( () => {
                this.load();
            });
        }
    },
    data:  () => {
        return {
            entries: [],
            config: {},
        }
    },
    created() {
        this.load();
    }
}
</script>

<style scoped>

</style>
