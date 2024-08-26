<template>
    <div class="activeTabSection">
        <div class="collapsible">
          <div>Add Current Tab</div>
          <button class="toggleBtn" @click="toggleActiveTabForm">
            {{ isActiveFormActive ? "-" : "+" }}
        </button> <!-- Click Event -->
        </div>
        <form :class="['activeTabForm', { toggleOn: isActiveFormActive}]"> <!-- Change Event -->
          <input class="activeTabInpt" placeholder="Add Custom Name to URL (optional)"/>
          <select class="newTabGroupSelect">
            <option value="">Select Tab Group</option>
          </select>
          <input type="submit" class="activeTabButton" value="Add Tab To Group"/> <!-- Event -->
        </form>
    </div>

    <br/>

    <div class="tabGroupSection">
        <div class="collapsible">
          <div>Create Tab Group</div>
          <button class="toggleBtn" @click="toggleTabGroupForm">
            {{ isTabGroupFormActive ? "-" : "+" }}
          </button> <!-- Click Event -->
        </div>
        <form :class="['tabGroupForm', { toggleOn: isTabGroupFormActive}]" > <!-- Change Event -->
          <input class="tabGroupNameInpt" placeholder="Add Name for new Tab Group"/>
          <select class="tabGroupColorSelect">
            <option value="">Select color for group</option>
            <option value="blue">blue</option>
            <option value="red">red</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
            <option value="pink">pink</option>
            <option value="purple">purple</option>
            <option value="cyan">cyan</option>
            <option value="orange">orange</option>
          </select>
          <input type="submit" class="addTabGroupButton" value="Create Tab Group"/> <!-- Event -->
        </form>
      </div>

    <!--
    <template id="li_template"> 
      <div class="tabGroup">
        <div class="tabGroupHeader">
          <h2 class="tabGroupTitle">Title</h2>
          <button class="deleteTabGroupBtn">Delete Tab Group</button>
        </div>
        <div>
          <button class="addToTabGroupBtn">Add New Tab To Group</button>
        </div>
        <div>
            <div class="tabSection"></div>
            <template class="tabListTemplate">
              <ul class="tabList">
                <li>
                  <div class="tabTitleHeader">
                    <div class="tabTitle">Title</div>
                    <button class="deleteTabBtn">Delete Tab</button>
                  </div>
                </li>
                <li class="tabURL">
                  <a class="tabUrlLink">URL link</a>
                </li>
            </template>
            </ul>
          </li>
        </div>
        <li>
      </div>
    </template>  
    -->
    <div class="tabGroup" v-for="tabGroup in tabGroups" :key="tabGroup.id">
        <div class="tabGroupHeader">
          <h2 class="tabGroupTitle">Title</h2>
          <button class="deleteTabGroupBtn">Delete Tab Group</button>
        </div>
        <div>
          <button class="addToTabGroupBtn">Add New Tab To Group</button>
        </div>
        <div class="tabSection"></div>
        <ul class="tabList">
            <li v-for="tab in processedTabs" :key="tab.id">
                <div class="tabTitleHeader">
                    <div class="tabTitle">Title</div>
                    <button class="deleteTabBtn">Delete Tab</button>
                </div>
                <a :href="tab.url" @click="getTabWindow(tab)">
                    <h3 class="title">{{ tab.title }}</h3>
                    <p class="pathname">{{ tab.pathname }}</p>
                </a>
            </li>
        </ul>
    </div>

</template>
<script setup>
import { onMounted, ref, computed } from 'vue';

const tabs = ref([]);
const tabGroups = ref([]);
const isActiveFormActive = ref(false);
const isTabGroupFormActive = ref(false); 


function toggleActiveTabForm(e){
    console.log("toggleActiveTabForm");
  isActiveFormActive.value = !isActiveFormActive.value;
}

function toggleTabGroupForm(e){
    console.log("toggleTabGroupForm");
    isTabGroupFormActive.value = !isTabGroupFormActive.value;
}

/*
- Add submit event to forms
*/

/*
activeTabForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let activeTabInpt = document.querySelector(".activeTabInpt");
  let newTabGroupSelect = document.querySelector(".newTabGroupSelect");

  const activeTabTitle = activeTabInpt.value;
  console.log(`activeTabTitle: ${activeTabTitle}`);
  const newTabGroupValue = newTabGroupSelect.value;

  console.log(`newTabGroupSelect.value: ${newTabGroupSelect.value}`);

  //addTab(activeTabTitle);
  addTab(activeTabTitle, newTabGroupValue);

  activeTabInpt.value = "";

});
*/

/*
tabGroupForm.addEventListener("submit", (e) => {
  console.log(e);
  e.preventDefault();
  console.log("submit");

  let tabGroupNameInpt = document.querySelector(".tabGroupNameInpt");
  let tabGroupColorSelect = document.querySelector(".tabGroupColorSelect");

  console.log(tabGroupNameInpt);
  console.log(tabGroupColorSelect);

  createTabGroup(tabGroupNameInpt.value, tabGroupColorSelect.value);

  tabGroupNameInpt.value = '';
  tabGroupColorSelect.value = '';
});
*/

/*
//Problem
//I need to toggle the form on and off when the button is clicked
//I need to change the button text to "+" when the form is off and "-" when the form is on
//I need to change the form display to flex when the form is on and none when the form is off
*/

</script>
<style>
:root {
    --background-color: rgb(156, 156, 156);
  }
  
  body {
      width: 20rem;
      background-color: #ffffff;
    }
  
    .collapsible {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
    }
  
    .collapsible div {
  
    }
  
    .toggleBtn {
      cursor: pointer;
    }
  
    .activeTabForm {
      border: 1px solid var(--background-color);
      border-radius: 5px;
      background-color: var(--background-color);
      display: none;
    }
  
    .activeTabForm.toggleOn {
      display: flex;
      flex-direction: column;
    }
  
    .activeTabInpt {
      margin: 5px;
    }
  
    .newTabGroupSelect {
      margin: 5px;
    }
  
    .activeTabButton {
      margin: 5px;
    }
  
    .tabGroupForm {
      border: 1px solid var(--background-color);
      border-radius: 5px;
      background-color: var(--background-color);
      display: none;
    }
  
    .tabGroupForm.toggleOn {
      display: flex;
      flex-direction: column;
    }
  
    .tabGroupNameInpt {
      margin: 5px;
    }
  
    .tabGroupColorSelect {
      margin: 5px;
    }
  
    .addTabGroupButton {
      margin: 5px;
    }
  
    /* TEMPLATE STYLING */
  
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
    .tabGroup {
  
    }
    .tabGroupHeader {
      display: flex;
      justify-content: space-between;
    }
    .tabGroupTitle {
  
    }
    .tabList {
      
    }
    .deleteTabGroupBtn {
      cursor: pointer;
    }
    .tabSection {
  
    }
    .tabListTemplate {
  
    }
    .tabList {
  
    }
    .tabTitleHeader {
      display: flex;
      justify-content: space-between;
    }
    .deleteTabBtn {
      cursor: pointer;
    }
    .tabTitle {
  
    }
    .tabUrlLink {
  
    }
</style>