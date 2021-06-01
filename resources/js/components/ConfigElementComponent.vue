<template>
    <div v-if="config">
        <template v-if="config.type === type.TEXT">
            <label class="label">{{config.key}}</label>
            <div class="control">
                <input class="input" type="text" v-model="value">
            </div>
        </template>
        <template v-if="config.type === type.DATE">
            <label class="label">{{config.key}}</label>
            <div class="control">
                <input class="input" type="date" v-model="value">
            </div>
        </template>
        <template v-if="config.type === type.NUMBER">
            <label class="label">{{config.key}}</label>
            <div class="control">
                <input class="input" type="number" v-model="value">
            </div>
        </template>
        <template v-if="config.type === type.OBJECT">
            <div class="box">
                <label class="label">{{config.key}}</label>
                <div class="container is-fluid">
                        <template v-for="element in config.config">
                                <config-elemt-component :config="element" v-model="value[element.key]"></config-elemt-component>
                        </template>
                </div>
            </div>
        </template>
        <template v-if="config.type === type.ARRAY">
            <div class="box">
                <label class="label">{{config.key}}</label>
                <template v-for="element in value">
                    <div class="box">
                        <div class="container is-fluid">
                                <template v-for="configElement in config.config">
                                        <config-elemt-component :config="configElement" v-model="element[configElement.key]"></config-elemt-component>
                                </template>
                        </div>
                    </div>
                </template>
            </div>
        </template>
    </div>
</template>

<script>
import { FormTypes} from "../utilities/FormHelpers";

export default {
    name: "ConfigElemtComponent",
    props: {
        config: {
            required: true,
        },
        value: {
            required: true,
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
