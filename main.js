// const axios = require('axios/dist/browser/axios.cjs'); // browser
//fetch food items from api and create an item card for each in the array

function getSavedItems(){
    //this function fetches the array of user saved items
    //using the localstorage api, check if the user has any saved items
    //if no items are found, return empty array
    let savedItems = localStorage.getItem("savedRecipes");
    savedItems = JSON.parse(savedItems);
    console.log(savedItems)
    if(!savedItems){
        return [];
    }
    
    return savedItems;
}

const savedItems = getSavedItems();

function saveItem(id){
    //get the item that matches the id
    //append it to the already saved list
    //saved the new list
    let savedList = getSavedItems();
    let item = getItemById(id);

    //check if item is already in the list
    for(let i=0; i<savedList.length; i++){
        if(savedList[i].id == id){
            window.alert("Item is already saved.");
            return;
        }
    }

    if(item){
        let newList = [...savedList, item];
        localStorage.setItem('savedRecipes', JSON.stringify(newList));
        window.alert("Item Saved!");
    }
    
}

function removeSavedItem(id){
    //check if item is in the saved list
    let savedList = getSavedItems();
    let hasItem = false;
    for(let i = 0; i<savedList.length; i++){
        if(savedList[i].id == id){
            hasItem = true;
            //remove the item from the list
            savedList.splice(i, 1);
        }
    }
    //save new list to localstorage
    if(confirm("Remove Item?") == true){
        localStorage.setItem("savedRecipes", JSON.stringify(savedList));
        //reload the saved page
        setPage("Saved");
    }
    
    
}

function filterItemsByTag(tag){
    //filter the items based on tag: dessert or beverage
    //create a new array based on the passed in tag
    //reload recreate the item cards based on the new array
    
    //remove the current elements
    const itemGallery = document.getElementById("itemsGallery");
    if(itemGallery){
        itemGallery.innerHTML = "";
    }

    if(tag === "all"){
        createItemCardList(concatList);
    }

    let newList = [];
    for(let i = 0; i<concatList.length; i++){
        if(concatList[i].tag === tag){
            newList.push(concatList[i]);
        }
    }
    createItemCardList(newList);
}

function createFilterOptions(){
    //create a select element with the options to filter the results by
    //append it to the filterContainer element
    const selectElement = document.createElement("select");
    const htmlString = `
            <option value = "all" >All</option>
            <option value = "dessert" >Dessert</option>
            <option value = "beverage" >Beverage</option>
    `

    selectElement.innerHTML = (htmlString);
    selectElement.id = "filterSelect"

    selectElement.onchange = (e) => {
        //filter based on value
        filterItemsByTag(e.target.value);
    };

    let filterContainer = document.getElementById("filterContainer");
    if(filterContainer){
        filterContainer.appendChild(selectElement);
    }
}


function createItemCard(title, imageURL, tag, id) {
    //create an html element 
    const container = document.createElement("div");
    const htmlString = `
        <div class='itemCard'>
            <img src='${imageURL}' />
            <p>${title}</p>
        </div>`;
    container.innerHTML = htmlString;
    container.onclick = ()=>{
        //open new page based on the id
        openItem(id);
    }

    return container;
}

function createItemCardList(itemsArray) {
    //get the element that will contain all the cards
    const itemGallery = document.getElementById("itemsGallery");

    //create and append a card for every item
    for(let i = 0; i<itemsArray.length; i++){
        let item = itemsArray[i];
        itemGallery.appendChild(
            createItemCard(item.name, 
                item.img[1].lg, 
                item.tag,
                item.id)
            );
    }
    
    
}

function createSavedItemCard(title, imageURL, tag, id) {
    
    //these cards should come with a extra button to remove the item by id
    const container = document.createElement("div");
    const htmlString = `
        <div class='itemCard'>
            <img src='${imageURL}' />
            <p>${title}</p>
        </div>`;
    container.innerHTML = htmlString;
    container.onclick = ()=>{
        //open new page based on the id
        openItem(id);
    }

    const container2 = document.createElement("div");
    container2.appendChild(container);

    //create the button
    const button = document.createElement("button");
    button.innerHTML = "DELETE";
    button.className = "deleteItem";
    button.onclick = () => {
        removeSavedItem(id);
    }
    container2.appendChild(button);

    return container2;
}

function createSavedItemCardList(itemsArray) {
    //get the element that will contain all the cards
    const itemGallery = document.getElementById("itemsGallery");

    //create and append a card for every item
    for(let i = 0; i<itemsArray.length; i++){
        let item = itemsArray[i];
        itemGallery.appendChild(
            createSavedItemCard(item.name, 
                item.img[1].lg, 
                item.tag,
                item.id)
            );
    }
    
    
}

function getHomePage(){
    //create elements for the navbar and page body and add them to the pageContent div
    const element = document.createElement("div");
    const htmlString = `
            <div class="navbar" id="navbar" ></div>
            <div class="pageBody" >
                <div class="filterContainer" id="filterContainer" ></div>
                <div class="itemGallery" id="itemsGallery"></div>
            </div>
    `
    element.innerHTML = htmlString;
    
    return element;
}

function getSavedPage(){
    //create elements for the navbar and page body and add them to the pageContent div
    const element = document.createElement("div");
    const htmlString = `
            <div class="navbar" id="navbar" ></div>
            <div class="pageBody" >
                <div class="itemGallery" id="itemsGallery"></div>
            </div>
    `
    element.innerHTML = htmlString;
    
    return element;
}

function getItemPage(){
    //create elements for the navbar and page body and add them to the pageContent div
    const element = document.createElement("div");
    const htmlString = `
            <div class="navbar" id = "navbar" ></div>
            <div class="pageBody" >
                <div class="mainContainer" id="mainContainer">
                    <button id="saveButton">SAVE</button>
                    <div class="itemImage" id="itemImage">
                        <img src="https://s7d1.scene7.com/is/image/mcdonalds/default_logo" alt="">
                    </div>
                    <p class="itemTitle" id="itemTitle">placeHolder title</p>
                </div>
                <div class="infoContent" id="infoContent">
                    <div class="description infoCard">
                        <p class="infoTitle">Description</p>
                        <p class="descriptionText" id="descriptionText"> asljd ;a sd;l a;ld jf;jas df; a;d a d;f a;sda j ad jfaj df ja sd; fakf a fd lj sld jkfs flkjf jfsjf </p>
                    </div>
                    <div class="recipe infoCard" id ="recipe">
                        <p class="infoTitle">Recipe</p>
                        <div className="ingredientsList" id="recipeList">
                            <ol>
                                <li>efficitur </li>
                                <li>aliquet sapien in vulputate </li>
                                <li>dignissim efficitur </li>
                                <li>odales augue suscipi </li>
                                <li>ras pretium erat enim, sed ornare massa molestie at </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
    `
    element.innerHTML = htmlString;
    
    return element;
}

function setItemPageProps(item){
    //set the image, description, title and id based on the passed in item
    let name = item.name;
    let description = item.desc;
    let imageURL = item.img[1].lg;
    let id = item.id;

    //get elements by id to set appropriate properties
    const imageContainer = document.getElementById("itemImage");
    if(imageContainer){
        let imgEl = document.createElement("img");
        imgEl.src = imageURL;
        imgEl.alt = name;
        imageContainer.removeChild(imageContainer.firstElementChild);
        imageContainer.appendChild(imgEl);
    }
    
    const titleElement = document.getElementById("itemTitle");
    if(titleElement){
        titleElement.innerHTML = name; 
    }

    const descElement = document.getElementById("descriptionText");
    if(descElement){
        descElement.innerHTML = description;
    }

    //set the function for the save button
    const saveButton = document.getElementById("saveButton");
    if(saveButton){
        saveButton.onclick = () => {
            saveItem(id);
        }
    }

}

function createNavbarButtons(buttonProps){
    // buttonProps - [{label: "Label", function: function()}]
    //this function is passed in an object containing labels and correlated functions
    //create buttons based on each element with the key as the label and function as the onclick event
    const navbarElement = document.getElementById("navbar");
    for(let i = 0; i<buttonProps.length; i++){
        let button = document.createElement("button");
        let label = buttonProps[i].label;
        let onClickFunction = buttonProps[i].function;
        button.innerHTML = label;
        button.onclick = onClickFunction;

        navbarElement.appendChild(button);
    }
}



const pages = {
    home: getHomePage(),
    item: getItemPage(),
    saved: getSavedPage()
}

function setPage(pageName){
    //this function should set the content and the navbar based on the passed in parameter
    const pageContentDiv = document.getElementById("pageContent");
    if(pageName === "Home"){
        pageContentDiv.innerHTML = pages.home.innerHTML;
        createNavbarButtons([
            {
                label: "HOME", 
                function: ()=>{
                    setPage("Home");
                }
            },
            {
                label: "SAVED", 
                function: ()=>{
                    setPage("Saved");
                }
            },
        ]);
        createItemCardList(concatList);
        createFilterOptions();
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }

    if(pageName === "Item"){
        pageContentDiv.innerHTML = pages.item.innerHTML;
        createNavbarButtons([
            {
                label: "< GO BACK", 
                function: ()=>{
                    //set page to "Home"
                    setPage("Home");
                }
            }
        ])
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }

    if(pageName === "Saved"){
        pageContentDiv.innerHTML = pages.saved.innerHTML;
        createNavbarButtons([
            {
                label: "HOME", 
                function: ()=>{
                    setPage("Home");
                }
            },
            {
                label: "SAVED", 
                function: ()=>{
                    setPage("Saved");
                }
            },
        ]);
        let savedList = getSavedItems();
        createSavedItemCardList(savedList);
        document.body.scrollTop = document.documentElement.scrollTop = 0;

    }
}

function openItem(itemId){
    //set the properties of the item page based on the item that matched the passed in id
    //set the page to the Item Page
    let foodItem = getItemById(itemId);
    console.log(foodItem);
    setPage("Item");
    setItemPageProps(foodItem);
}

function getItemById(id){
    //search the concatList for an item that matches the id
    for(let i=0; i<concatList.length; i++){
        if(concatList[i].id == id){
            return concatList[i];
        }
    }
}

setPage("Home");
