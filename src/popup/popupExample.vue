<template>
    <h1>Google Dev Docs</h1>
    <button @click="groupTabs">Group Tabs</button>

     <ul>
        <li v-for="tab in processedTabs" :key="tab.id">
            <a :href="tab.url" @click="getTabWindow(tab)">
                <h3 class="title">{{ tab.title }}</h3>
                <p class="pathname">{{ tab.pathname }}</p>
            </a>
        </li>
     </ul>
     
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';

const tabs = ref([]);

onMounted(async () => {
    tabs.value = await chrome.tabs.query({
        url: [
        "https://developer.chrome.com/docs/webstore/*",
        "https://developer.chrome.com/docs/extensions/*",
        ]
    });

    const collator = new Intl.Collator();
    tabs.value.sort((a, b) => collator.compare(a.title, b.title));
});

const processedTabs = computed(() => {
    return tabs.value.map(tab => {
        return {
            id: tab.id,
            title: tab.title.split('-')[0].trim(),
            pathname: new URL(tab.url).pathname.slice("/docs".length)
        };
    });
});

async function getTabWindow(tab){
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
}

async function groupTabs(){
    const tabIds = tabs.value.map(({ id }) => id);
    if (tabIds.length) {
        const group = await chrome.tabs.group({ tabIds });
        await chrome.tabGroups.update(group, { title: "This is a thing that's happening." });
    } 
}
</script>

<style>
    body {
        width: 20rem;
    }
    
    ul {
        list-style-type: none;
        padding-inline-start: 0;
        margin: 1rem 0;
    }
    
    li {
        padding: 0.25rem;
    }
    li:nth-child(odd) {
        background: #80808030;
    }
    li:nth-child(even) {
        background: #ffffff;
    }
    
    h3,
    p {
        margin: 0;
    }
</style>