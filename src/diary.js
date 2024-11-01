document.addEventListener("DOMContentLoaded", displayEntries);

//CRUD (create)
function createEntry() {
    const title = document.getElementById("titleInput").value;
    const content = document.getElementById("contentInput").value;
    const activities = document.getElementById("activitiesInput").value;
    const itineraries = document.getElementById("itinerariesInput").value;

    if (title && content) {
        const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.push({
            id: Date.now(),
            title,
            content, //ni x nak bagi user edit utk data yg fetch dari API
            activities,
            itineraries
        });
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        displayEntries();
        clearInputs();
    } else {
        alert("Please fill in both title and content.");
    }
}

//CRUD (read)
function displayEntries() {
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    const diaryEntriesDiv = document.getElementById("diaryEntries");
    diaryEntriesDiv.innerHTML = "";

    entries.forEach(entry => {
        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");
        entryDiv.innerHTML = `
            <h4>${entry.title}</h4>
            <div>${entry.content}</div> <!-- API data display -->
            <p><strong>Itineraries:</strong> ${entry.itineraries || "None"}</p>
            <p><strong>Activities:</strong> ${entry.activities || "None"}</p>
            <button onclick="editEntry(${entry.id})">Edit</button>
            <button onclick="deleteEntry(${entry.id})">Delete</button>
        `;
        diaryEntriesDiv.appendChild(entryDiv);
    });
}

//CRUD (delete)
function deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
    displayEntries();
}

//CRUD (update)
function editEntry(id) {
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    const entry = entries.find(entry => entry.id === id);

    //ni field yg boleh update/edit
    document.getElementById("titleInput").value = entry.title;
    document.getElementById("contentInput").value = entry.content;
    document.getElementById("activitiesInput").value = entry.activities || "";
    document.getElementById("itinerariesInput").value = entry.itineraries || "";

    //ni field yg x boleh edit/update
    document.getElementById("contentInput").disabled = true;

    //code utk waktu edit dia akan show button save change and hide add button (waktu edit shj)
    document.getElementById("saveButton").style.display = "block";
    document.getElementById("addButton").style.display = "none";

    document.getElementById("editSection").scrollIntoView({ behavior: "smooth" });

    //ni utk update (after update dia akan update dalam box yg sama intead )
    const saveButton = document.getElementById("saveButton");
    saveButton.onclick = function() {
        saveEntry(id);
    };
}

//save utk update
function saveEntry(id) {
    const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
    const entryIndex = entries.findIndex(entry => entry.id === id);

    if (entryIndex !== -1) {
        entries[entryIndex].title = document.getElementById("titleInput").value;
        entries[entryIndex].activities = document.getElementById("activitiesInput").value;
        entries[entryIndex].itineraries = document.getElementById("itinerariesInput").value;

        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        displayEntries();
        clearInputs();

        //still boleh update after dah update
        document.getElementById("contentInput").disabled = false;

        //show the add button and hide the save button
        document.getElementById("saveButton").style.display = "none";
        document.getElementById("addButton").style.display = "block";
    }
}

//after dah update or add entry pastu tekan button save/add, function ni yg akan clear kan field ii utk add or update benda lain 
function clearInputs() {
    document.getElementById("titleInput").value = "";
    document.getElementById("contentInput").value = "";
    document.getElementById("activitiesInput").value = "";
    document.getElementById("itinerariesInput").value = "";
    document.getElementById("titleInput").disabled = false;
    document.getElementById("contentInput").disabled = false;
}
