
const form = document.querySelector(".grocery-form");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const alert = document.querySelector(".alert");
const submitBtn = document.querySelector(".submit-btn");
const grocery = document.getElementById("grocery");

let editelement;
let editFlag = false;
let elementid ;

form.addEventListener("submit",addItem);
clearBtn.addEventListener("click",clearItems);
window.addEventListener("DOMContentLoaded",setupitems);

function addItem(e)
{
  e.preventDefault();
 const value = grocery.value;
 const id = new Date().getTime().toString();

if ( value && !editFlag)
{
  createListItem(id,value);
  displayAlert("item added","success");
  addLocalStorage(id,value);
  setBackToDefault();
}
  else if ( value && editFlag)
{
   editelement.innerHTML = grocery.value;
   displayAlert("item-edited","success");
   editLocalStorage(editID,value);
}
  else
{
  console.log("enter value");
  displayAlert("please enter item ","danger");
  setBackToDefault(id,value);
}
  
}

function displayAlert(text,action)
{
alert.innerHTML = text;
alert.classList.add(`alert-${action}`);

setTimeout(function()
 {
  alert.innerHTML = "";
  alert.classList.remove(`alert-${action}`);
},2000);
  
};

function deleteItems(e)
{
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  
   list.removeChild(element);
  if ( list.children.length === 0)
  {
    container.classList.remove("show-container");
  }
   
  displayAlert("item-deleted","danger");
  removeFromLocalStorage(id);
  setBackToDefault();
}

function editItems(e)
{
 const element = e.currentTarget.parentElement.parentElement;
 editelement = e.currentTarget.parentElement.previousElementSibling;

 grocery.value = editelement.innerHTML;
 editFlag=true;
 editID=element.dataset.id;
 submitBtn.textContent ="Edit";
 
};


function clearItems()
{
  const items = document.querySelectorAll(".grocery-item");
 
 if ( items.length > 0)
 {
   items.forEach( function (item)
  {
     list.removeChild(item);
   });
}

 container.classList.remove("show-container");
 displayAlert("empty list","danger");
 setBackToDefault();
 localStorage.removeItem("list");
  
  };

function  setBackToDefault()
{
let editFlag = false;
let elementid = "" ;
grocery.value="";
submitBtn.textContent = "submit";

}

function addLocalStorage(id,value)
{
  const grocery ={id,value};
  let items = getLocalStorage();

  items.push(grocery);

  localStorage.setItem("list",JSON.stringify(items));

}

function removeFromLocalStorage(id)
{
  let items = getLocalStorage();
  items = items.filter(function(item)
    {
    if ( item.id !== id){
      return item;
    }
  });
   localStorage.setItem("list",JSON.stringify(items));
}

function editLocalStorage(id,value)
{
  let items = getLocalStorage();
  items = items.map(function(item)
    {
    if( item.id === id){
      item.value = value ;
    }
    return item;
  });
  
   localStorage.setItem("list",JSON.stringify(items));
}

function getLocalStorage()
{
  return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
};

function setupitems()
{
  let items = getLocalStorage();
  if ( items.length > 0){
    items.forEach(function(item)
     {
      createListItem(item.id,item.value);
    });
    container.classList.add("show-container");
  }
};

function createListItem(id,value)
{
 const element = document.createElement('article');
 element.classList.add('grocery-item');
 const attr = document.createAttribute('data-id');
  
  attr.value = id ;
  element.setAttributeNode(attr);

  element.innerHTML = `<p class="item">${value}</p>

        <div class="btn-container">
             
           <button type="button" class="edit-btn">
          <i class="fas fa-edit">O</i>
            </button>
          <button type="button" class="delete-btn">
          <i class="fas fa-trash">X</i>
        </button>
       
       </div>` ;

    const editBtn = element.querySelector(".edit-btn");
    const deleteBtn = element.querySelector(".delete-btn");

    editBtn.addEventListener("click",editItems);
    deleteBtn.addEventListener("click",deleteItems);
  
   list.appendChild(element);
  container.classList.add("show-container");
}
