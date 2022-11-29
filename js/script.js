const input = document.getElementById("input");
const button = document.querySelector("#button");
const commentContainer = document.querySelector("#commentContainer");

input.addEventListener("input", dynamicHeight);

button.addEventListener("click", addComment);

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


//dynamicHeight function
function dynamicHeight(e) {
    e.target.style.height = "50px";
    const h = e.target.scrollHeight;
    e.target.style.height = `${h}px`;
}


//Comment Function
function addComment() {
    if (/^\s/.test(input.value) || input.value == "") return input.value = "";

    // Comment user name
    const h3 = document.createElement("h3");
    h3.innerText = "Anonymous";
    h3.className = "name";

    //Date
    const dateContainer = document.createElement("p");
    const d = new Date();
    dateContainer.innerText = `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    dateContainer.className = "dateText";
    
    // Comment text
    const p = document.createElement("p");
    const text = document.createTextNode(input.value);
    p.appendChild(text);
    p.classList.add("commentText");

    //Edit button
    const editButton = document.createElement("span");
    const editButtonText = document.createTextNode(" edit ");
    editButton.appendChild(editButtonText);
    editButton.className = "material-icons-outlined commentEdit";
    editButton.setAttribute("title", "Edit comment");
    editButton.addEventListener("click", editComment);

    //Delete button
    const deleteButton = document.createElement("span");
    deleteButton.innerText = " delete ";
    deleteButton.classList.add("material-icons-outlined", "commentDelete");
    const deleteTitle = document.createAttribute("title");
    deleteTitle.value = "Delete comment";
    deleteButton.setAttributeNode(deleteTitle);
    deleteButton.setAttribute("onclick", "deleteComment(this)");
    
    // Comment container
    const div = document.createElement("div");
    div.append(h3, dateContainer, p, editButton, deleteButton);
    div.classList.add("userContainer");

    //Main container
    if(commentContainer.children.length > 1) {
        commentContainer.insertBefore(div, commentContainer.children[2]);
    } else {
        commentContainer.appendChild(div);
    }
    input.value = null;
    input.style.height = "50px";
}


function editComment(e) {
    const parentElement = e.target.parentElement;
    if (parentElement.contains(parentElement.querySelector(".updateInput"))) return

    const previousElementSibling = e.target.previousElementSibling;

    //Creating input field
    const input = document.createElement("textarea");
    input.value = previousElementSibling.innerHTML;
    input.classList.add("updateInput");
    input.addEventListener("focus", dynamicHeight);
    input.addEventListener("input", dynamicHeight);

    //Creating update button
    const button = document.createElement("button");
    const buttonSpan = document.createElement("span");
    buttonSpan.innerText = "Update";
    button.innerHTML = buttonSpan.outerHTML;
    button.className = "updateButton";
    button.setAttribute("onclick", "updateComment(this)");

    previousElementSibling.remove();
    // parentElement.insertBefore(input, e.target);
    // parentElement.insertBefore(button, e.target);
    e.target.before(input, button);
    input.focus();
}


function updateComment(element) {
    const parentElement = element.parentElement;
    const previousElementSibling = element.previousElementSibling;

    //Updated date
    const dateContainer = document.createElement("p");
    const d = new Date();
    dateContainer.innerText = `Last updated: ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    dateContainer.className = "updatedDateText";

    //Updated comment text
    const p = document.createElement("p");
    const text = document.createTextNode(previousElementSibling.value);
    p.appendChild(text);
    p.classList.add("commentText");

    previousElementSibling.remove();
    // parentElement.insertBefore(dateContainer, element);
    if (parentElement.querySelector(".updatedDateText")) {
        parentElement.querySelector(".updatedDateText").replaceWith(dateContainer);
    } else {
        element.before(dateContainer);
    }
    parentElement.insertBefore(p, element);
    element.remove();
}


function deleteComment(element) {
    const comment = element.parentElement;
    comment.remove();
}
