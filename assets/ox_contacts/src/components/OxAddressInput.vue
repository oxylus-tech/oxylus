<template>
    <v-container>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.street"
                     :label="t('fields.street')"/>
             </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.street_2"
                     :label="t('fields.street_2')"/>
             </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.number"
                     :label="t('fields.number')"/>
            </v-col>
            <v-col>
                <v-text-field v-model="props.item.box"
                     :label="t('fields.box')"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="props.item.postcode" type="number"
                     :label="t('fields.postcode')"/>
            </v-col>
            <v-col>
                <v-text-field v-model="props.item.city"
                     :label="t('fields.city')"/>
            </v-col>
            <v-col>
                <v-select v-model="props.item.country_id"
                    :items="countries"
                    item-value="id"
                    item-title="name"
                    :label="t('fields.country')">
                    <template v-slot:item="{ props: itemProps, item }">
                        <v-list-item v-bind="itemProps">
                            <template #prepend>
                                <span class="mr-2">{{ item.raw.flag }} </span>
                            </template>
                        </v-list-item>
                    </template>
                </v-select>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import {defineProps, inject} from 'vue'
import {t, emailRule} from 'ox'

const props = defineProps({
    item: Object,
})
const repos = inject('repos')
const countries = repos.countries.all()
</script>
