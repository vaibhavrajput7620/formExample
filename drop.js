let userEntries = [];
let editingIndex = -1;

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');
    const storedEntries = localStorage.getItem('userEntries');
   

    if (storedEntries) {
        userEntries = JSON.parse(storedEntries);
        if (index !== null) {
            populateFormFields(index);
        } else {
            displayUserEntries();
         
        }
    } else {
        userEntries = [];
    }
    
};

function submitForm() {
    const textInput = document.getElementById('textInput').value.trim();
    const numberInput = document.getElementById('numberInput').value.trim();
    const emailInput = document.getElementById('emailInput').value.trim();
    const phoneInput = document.getElementById('phoneInput').value.trim();
    const addressInput = document.getElementById('addressInput').value.trim();
    
    if (!textInput || !numberInput || !emailInput || !phoneInput || !addressInput) {
        let a = "Please fill in all fields."
        document.getElementById("alert").innerHTML = a;
        return;
    }
    
    let mailFormat = /\S+@\S+\.\S+/;
    if (!emailInput.match(mailFormat)) {
        let b = "Invalid Email address!."
        document.getElementById("alert").innerHTML = b;
        return false;
    }
    
    if (phoneInput.length != 10) {
        let c = "Phone number must be 10 digits."
        document.getElementById("alert").innerHTML = c;
        return false;
    }
    
    const userData = {
        textInput: textInput,
        numberInput: numberInput,
        emailInput: emailInput,
        phoneInput: phoneInput,
        addressInput: addressInput,
    };
    
    
    if (editingIndex === -1) {
       
        userEntries.push(userData);
       
    } else {
        userEntries[editingIndex] = userData;
        editingIndex = -1;
    }
  
        // localStorage.setItem('userEntries', JSON.stringify(userEntries));   

        if (window.location.pathname.includes('/register.html') && window.location.search.includes('index')) {
            localStorage.setItem('userEntries', JSON.stringify(userEntries));
        }else {
            localStorage.setItem('newUser', JSON.stringify(userData));
        }
        window.location.replace('http://127.0.0.1:5500/home.html');
        
         clearForm();
       // displayUserEntries();
    }
    
    function displayUserEntries() {
        const userDataContainer = document.getElementById('userDataContainer');
        const userEntries = JSON.parse(localStorage.getItem('userEntries'));
        userDataContainer.innerHTML = '';
        userEntries.forEach((entry, index) => {
            const entryDiv = document.createElement('tr');
            entryDiv.classList.add('userDataEntry');
            entryDiv.innerHTML = `
            <td>${entry?.textInput}</td>
            <td>${entry?.numberInput}</td>
            <td>${entry?.emailInput}</td>
            <td>${entry?.phoneInput}</td>
            <td>${entry?.addressInput}</td>
            <button onclick="editForm(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>
             `;
            userDataContainer.appendChild(entryDiv);
        });
        
        
 }
    
    function populateFormFields(index) {
        const userEntries = JSON.parse(localStorage.getItem('userEntries'));
        const singleUserData = userEntries[index];
    
        document.getElementById('textInput').value = singleUserData?.textInput;
        document.getElementById('numberInput').value = singleUserData?.numberInput;
        document.getElementById('emailInput').value = singleUserData?.emailInput;
        document.getElementById('phoneInput').value = singleUserData?.phoneInput;
        document.getElementById('addressInput').value = singleUserData?.addressInput;
    
        editingIndex = index;
    }
    
    function editForm(index) {
        window.location.replace(`http://127.0.0.1:5500/register.html?index=${index}`);
}

function deleteEntry(index) {
    const userEntries = JSON.parse(localStorage.getItem('userEntries'));
   
    const updatedUserEntries = userEntries?.filter((_, i) => i !== index);
    localStorage.setItem('userEntries', JSON.stringify(updatedUserEntries));
     displayUserEntries();
}

function refreshentry() {
  const newUser = JSON.parse(localStorage.getItem('newUser'));
  const oldUserData = JSON.parse(localStorage.getItem('userEntries'));
  const updatedData = oldUserData ? [...oldUserData, newUser]: [newUser];
  localStorage.setItem('userEntries', JSON.stringify(updatedData))
  localStorage.setItem('newUser', '');
    displayUserEntries();
}
function clearForm() {
    document.getElementById('textInput').value = '';
    document.getElementById('numberInput').value = '';
    document.getElementById('emailInput').value = '';
    document.getElementById('phoneInput').value = '';
    document.getElementById('addressInput').value = '';
}
