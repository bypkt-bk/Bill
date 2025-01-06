<script setup>
defineProps({
  icon: Function,
  label: String,
  onClick: { type: Function, required: true },
});
</script>

<template>
    <button @click="onClick">
        <component :is="icon" />
    <p>{{ label }}</p>
    </button>
</template>

<style>
button {
    background-color: white;
    height: 114px;
    width: 114px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    box-shadow: 4px 4px 18px 0px rgba(0, 0, 0, 0.20);}

p {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
}
</style>