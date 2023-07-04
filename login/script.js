let email = document.getElementById("mail");
let password = document.getElementById("pass");
let login = document.getElementById("login-btn");
let note = document.getElementById("note");

login.addEventListener('click', (event) => {
    event.preventDefault();

    if (email.value.trim() === '' || password.value === '') {
        note.innerText = "Enter email and password";
        note.style.color = 'red';
    } else {
        let users = JSON.parse(localStorage.getItem('users'));
        if (users && Array.isArray(users)) { // Check if users is an array
            let user = users.find((user) => {
                return user.uEmail === email.value.trim();
            });

            if (user) {
                if (user.uPassword === password.value) {
                    sessionStorage.setItem('loggedUser', JSON.stringify(user));
                    window.location.href = "/shop/";
                } else {
                    note.innerText = "Enter correct password";
                    note.style.color = 'red';
                }
            } else {
                note.innerText = "User not found. Please sign up before logging in.";
                note.style.color = 'red';
            }
        } else {
            note.innerText = "User not found. Please sign up before logging in.";
            note.style.color = 'red';
        }
    }
});
