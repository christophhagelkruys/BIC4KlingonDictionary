<template>
    <div v-if="config">
            <template v-if="config.type === type.TEXT">
                <label class="label">{{capitalize(config.key)}} </label>
                <div class="control">
                    <input class="input" type="text" v-model="value" readonly>
                </div>
            </template>
            <template v-if="config.type === type.DATE">
                <label class="label">{{capitalize(config.key)}}</label>
                <div class="control">
                    <input class="input" type="date" v-model="value" readonly>
                </div>
            </template>
            <template v-if="config.type === type.NUMBER">
                <label class="label">{{capitalize(config.key)}}</label>
                <div class="control">
                    <input class="input" type="number" v-model="value" readonly>
                </div>
            </template>
            <template v-if="config.type === type.OBJECT">
                <div class="box">
                    <label class="label">{{capitalize(config.key)}}</label>
                    <div class="container is-fluid">
                            <template v-for="element in config.config">
                                    <config-element-readonly-component :config="element" v-model="value[element.key]"></config-element-readonly-component>
                            </template>
                    </div>
                </div>
            </template>
            <template v-if="config.type === type.ARRAY">
                <div class="box">
                    <label class="label">{{capitalize(config.key)}}</label>
                    <template v-for="element in value">
                        <div class="box">
                            <div class="container is-fluid">
                                    <template v-for="configElement in config.config">
                                            <config-element-readonly-component :config="configElement" v-model="element[configElement.key]"></config-element-readonly-component>
                                    </template>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
    </div>
</template>

<script>
import {capitalize, FormTypes} from "../utilities/FormHelpers";

export default {
    name: "ConfigElementReadonlyComponent",
    props: {
        config: {
            required: true,
        },
        value: {
            required: true,
        },
    },
    methods: {
        capitalize(s){
            return capitalize(s);
        }
    },
    data:  () => {
        return {
            type: FormTypes,
        }
    },
}
</script>

<style scoped>

</style>
