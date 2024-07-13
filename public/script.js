document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Submit the form data asynchronously using fetch
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(new FormData(document.getElementById('myForm')))
    })
    .then(response => {
        if (response.ok) {
            console.log('Form submitted successfully');
            const successMessage = document.getElementById("successMessage");
            successMessage.style.display = "block";

            // Hide the success message after 3 seconds (3000 milliseconds)
            setTimeout(function() {
                successMessage.style.display = "none";
                // Reload the page after hiding the success message
                window.location.reload();
            }, 1000); // Adjust the time as needed
        } else {
            return response.text().then(text => { throw new Error(text) });
        }
    })
    .catch(error => {
        console.error('Error submitting the form', error);
        // Handle errors here (e.g., display an error message to the user)
    });
});