/*
Tab manager
- Find a way to add tabs in a group 
    - If a group doesn’t exist, create it and name it in the popup
    - Add an active tab to a group 
- Collapse a particular group of tabs
- Name a particular group of tags (and perhaps assign colors if that’s possible)
- A way to store the links of these tabs
- A way to delete a tab group 
- A way to move these tab groups
*/

/*
  GET URL FROM ACTIVE TAB
*/

chrome.action.onClicked.addListener((tab) => {
    const activeTab = document.querySelector("activeTab");
    const activeTabButton = document.querySelector("activeTabButton");
    //if the user selects a certain tab group, present this option
  
    /*
    - if tab group is clicked, activeTabButton is no longer grayed out
    */
  
    activeTabButton.addEventListener("click", () => {
      //store into group
      //get tabGroup name from local storage
      //store active tab data (tabId, title, tabGroup) into local storage
    });
  });
  
  
  
  async function storageFunction(){
    await chrome.storage.local.set();
  }
  
  
  /*
  const activeTab = document.querySelector("activeTab");
    //HOW DO I GET THE ACTIVE TAB?
  const activeTabButton = document.querySelector("activeTabButton");
  activeTabButton.addEventListener("click", () => {
    //store into group
  });
  */
  
  const tabs = await chrome.tabs.query({
      url: [
        "https://developer.chrome.com/docs/webstore/*",
        "https://developer.chrome.com/docs/extensions/*",
      ]
    });
  
    /*
      GET FROM STORAGE INSTEAD OF FROM TABS.QUERY
    */
  
  const collator = new Intl.Collator();
  tabs.sort((a, b) => collator.compare(a.title, b.title));
  
  const template = document.getElementById("li_template");
  const elements = new Set();
  for (const tab of tabs) {
    const element = template.content.firstElementChild.cloneNode(true);
  
    const title = tab.title.split("-")[0].trim();
    const pathname = new URL(tab.url).pathname.slice("/docs".length);
  
    element.querySelector(".title").textContent = title;
    element.querySelector(".pathname").textContent = pathname;
    element.querySelector("a").addEventListener("click", async () => {
      // need to focus window as well as the active tab
      await chrome.tabs.update(tab.id, { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
    });
  
    elements.add(element);
  }
  document.querySelector("ul").append(...elements);
  
  
  const button = document.querySelector("button");
  button.addEventListener("click", async () => {
    const tabIds = tabs.map(({ id }) => id);
    /*
      - get tabs by tabGroup
      - group these tabs by appropriate title and color
    */
    if (tabIds.length) {
      const group = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(group, { title: "DOCS" });
    }
  });
  
  /*
    id
    title
    tabGroup 
  */
  
  
  /*
    CREATE TAB GROUP
      // Create a form that accepts a group name
  */
  
  /*
    DELETE TAB GROUP
      // 
  */
  
  /*
    LIST TAB GROUPS
      //List tabs under group name
      //Collapse tabs under group name
  */
  
  /*
    UPDATE TAB GROUPS
      //Change tab group name
      //Change tab group color
  */
  
  /*
    SEARCH TAB GROUPS
      // Create an input form 
      // Select color
  */