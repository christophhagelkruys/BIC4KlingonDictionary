<template>
    <div>
        <div class="container is-fluid">
            <div class="columns is-multiline">
                <template v-if="config && entries">
                    <template v-for="entry in entries">
                        <div class="column is-one-third">
                            <form-component :config="config" v-bind:values="entry"></form-component>
                        </div>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {EnumConfig, FormEnum} from "../utilities/FormHelpers";
import DisplayOnlyComponent from "./DisplayOnlyComponent";

export default {
    components: {DisplayOnlyComponent},
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
    data:  () => {
        return {
            entries: [],
            config: {},
        }
    },
    created() {
      axios.get(this.config.listUrl).then( (response) => {
          this.entries = response.data;
      });
    }
}
</script>

<style scoped>

</style>
