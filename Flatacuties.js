// Waits for the DOM to be fully loaded and then execute the code inside this block.
document.addEventListener('DOMContentLoaded', () => {

    // Get references to the elements in HTML that will display the list of animals and their details.
    const animalListElement = document.getElementById("animalList")
    const animalDetailsElement = document.getElementById("animalDetails")
  
    // It set the currently selected animal's ID.
    let currentAnimalId = null
  
    // Function will be used to display the list of animals.
    function displayAnimalList(animals) {

      // Loop through each animal in the array.
      animals.forEach(animal => {

        // Creates a new div element to represent the animal in the list.
        const animalItem = document.createElement("div")

        // Adds a CSS class to the div for styling purposes.
        animalItem.classList.add("animalItem")

        // Adds the div with the animal's image and name using template literals.
        animalItem.innerHTML = `<img src="${animal.image}" alt="${animal.name}">
                                <p>${animal.name}</p>`

        // Adds a click event listener to the div. So that when clicked, it will display the animal's details.
        animalItem.addEventListener("click", () => {

          // Sets the currentAnimalId to the clicked animal's ID.
          currentAnimalId = animal.id

          // Calls the displayAnimalDetails function to show the details of the selected animal.
          displayAnimalDetails(animal)
        })

        // Adds the created div to the animalListElement to display the animal in the list.
        animalListElement.appendChild(animalItem)
      })
    }
  
    // Function used to display the details of a specific animal.
    function displayAnimalDetails(animal) {

      // Adds the animalDetailsElement with the animal's image, name, and votes using the backticks and the $ sign.
      animalDetailsElement.innerHTML = `<img src="${animal.image}" alt="${animal.name}">
                                        <p>Name: ${animal.name}</p>
                                        <p>Votes: ${animal.votes}</p>
                                        <label for="votes">Add Votes:</label>
                                        <input type="number" id="votes" min="0" step="1">
                                        <button id="voteBtn">Vote</button>`
      
      // Gets the "Vote" button using its ID and adds a click event listener to handle voting.
      const voteButton = document.getElementById("voteBtn")
      voteButton.addEventListener("click", () => {

        // Gets the input field for votes and parse the entered value as an integer (or 0 if not a valid number).
        const votesInput = document.getElementById("votes")
        const votes = parseInt(votesInput.value, 10) || 0

        // Updates the animal's votes count by adding the entered votes.
        animal.votes += votes

        // Updates the displayed votes count in the animalDetailsElement.
        animalDetailsElement.querySelector("p:nth-child(3)").textContent = `Votes: ${animal.votes}`

        // Clears the votes input field after voting.
        votesInput.value = ""
      })
    }
  
    // Fetchs the data about the animals from the server in our case it is the json server
    fetch("http://localhost:3000/characters")
      .then(response => {

        // Checks if the response was successful, otherwise throw an error.
        if (!response.ok) {
          throw new Error("Network response was not ok.")
        }

        // Changes the response to JSON and return the data.
        return response.json()
      })
      .then(data => {

        // Checks if the received data is an array, otherwise throw an error.
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format.")
        }

        // Calls the displayAnimalList function to show the list of animals using the fetched data.
        displayAnimalList(data)
      })
      .catch(error => {

        // If any error occurs during the fetching process, log the error in the console.
        console.error("Error fetching data:", error)
      })
  
  })
  
  