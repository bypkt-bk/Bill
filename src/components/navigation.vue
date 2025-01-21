<script setup>
import { House, Trash2, Store, Archive, LayoutDashboard } from "lucide-vue-next"
</script>

<template>
    <div id="navbar">
        <div id="nav-button">
            <House />
            <p>Home</p>
        </div>
        <div id="nav-button">
            <store />
            <p>Home</p>
        </div>
        <div id="nav-button">
            <Archive />
            <p>Home</p>
        </div>
        <div id="nav-button">
            <LayoutDashboard />
            <p>Home</p>
        </div>
        <div id="nav-button">
            <Trash2 />
            <p>Home</p>
        </div>
    </div>
</template>

<style>
#navbar {
    display: flex;
    padding: 28px 18px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 20px;
    border: 1px solid var(--gray-200, #E5E7EB);
    background: var(--white, #FFF);
}

#nav-button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
}

p {
    font-family: monospace;
    font-size: 16px;
}
</style>