<template>
    <form-component :mode="mode" :config="config" v-bind:values="values"></form-component>
</template>
<script>
import FormComponent from "./FormComponent";
import {EnumConfig, FormEnum} from "../utilities/FormHelpers";
export default {
    components: {FormComponent},
    props: {
        mode: {
            type: String,
            required: true,
        },
        values: {
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
    data:  () => {
        return {
            config: {},
        }
    },
}
</script>

<style scoped>

</style>
