<script setup lang="ts">
import { Field as VeeField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    label: string
    name: string
    modelValue: string
    leftIcon?: string
    rules?: string
    type?: string
    options?: string[]
  }>(),
  {
    type: 'input',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const handleChange = (e: Event) =>
  emit('update:modelValue', (e.target as HTMLInputElement).value)
const message = (m: string) => m.replace(new RegExp(props.name), props.label)
</script>
<template>
  <div class="field">
    <div class="field-label has-text-left">
      <label class="label is-normal leading-10" :for="name">
        {{ label }}
        <small class="has-text-grey-light" v-if="!rules?.includes('required')"
          >（選填)</small
        >
      </label>
    </div>
    <div class="field-body">
      <p
        class="control flex-1"
        :class="{
          'has-icons-left has-icons-right': type !== 'select',
          'is-expended': type === 'select',
        }"
      >
        <span class="icon is-small is-left" v-if="leftIcon">
          <i :class="leftIcon" />
        </span>
        <VeeField
          :rules="rules"
          :name="name"
          v-slot="{ errors, errorMessage, meta }"
        >
          <input
            v-if="type === 'input'"
            class="input"
            :class="{
              'is-success': meta.touched && !errorMessage,
              'is-danger': errorMessage,
            }"
            :value="modelValue"
            @input="handleChange"
          />
          <textarea
            v-if="type === 'textarea'"
            class="textarea"
            rows="5"
            :class="{
              'is-success': meta.touched && !errorMessage,
              'is-danger': errorMessage,
            }"
            :value="modelValue"
            @input="handleChange"
          />
          <div
            v-if="type === 'select'"
            class="select is-fullwidth"
            :class="{
              'is-success': meta.touched && !errorMessage,
              'is-danger': errorMessage,
            }"
          >
            <select :value="modelValue" @input="handleChange">
              <option value="" disabled>---請選擇付款方式---</option>
              <option
                v-for="(type, index) in options"
                :key="index + type"
                :value="type"
              >
                {{ type }}
              </option>
            </select>
          </div>
          <span
            class="icon is-small is-right"
            v-if="meta.touched && type !== 'select'"
          >
            <i
              :class="{
                'i-fa-solid-check is-success': !errorMessage,
                'i-fa-solid-exclamation-triangle is-danger': errorMessage,
              }"
            />
          </span>
          <span v-if="errorMessage" class="has-text-left help is-danger">
            {{ message(errorMessage) }}
          </span>
        </VeeField>
      </p>
    </div>
  </div>
</template>
