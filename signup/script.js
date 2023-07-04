let signup = document.getElementById('signup-btn');
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('mail');
let password = document.getElementById('pass');
let repassword = document.getElementById('re-pass');
let msg = document.getElementById('note')


function saveUser(fnames, lnames, mails, passwords, repasswords) {
    let userObj = {
        fstName: fnames,
        lstName: lnames,
        uEmail: mails,
        uPassword: passwords,
        rePassword: repasswords
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userObj)
    localStorage.setItem('users', JSON.stringify(users))
    sessionStorage.setItem('loggedUser', JSON.stringify(userObj))
    fname.value = ''
    lname.value = ''
    email.value = ''
    password.value = ''
    repassword.value = ''
    msg.innerText = 'Successfully Signed up';
    msg.style.color = 'green';
    window.location.href = '/login/'
}
function checkIfUSerExist(mail) {
    let users = JSON.parse(localStorage.getItem("users"))
    const obj = users.find((ob) => {
        return ob.uEmail === mail;
    })
    if (obj) return true;
    else false
}
signup.addEventListener('click', (event) => {
    event.preventDefault()
    if (fname.value.trim() === '' || lname.value.trim() === '' || email.value.trim() === '' || password.value === '' || repassword.value === '') {
        msg.innerText = 'All fields are Required';
        msg.style.color = 'red'
    }
    else {
        if (password.value !== repassword.value) {
            msg.innerText = 'Re-entered password not matching';
            msg.style.color = 'red'
        }
        else {
            if (localStorage.getItem('users')) {
                if (checkIfUSerExist(email.value.trim())) {
                    msg.innerText = 'User already exist, Please Login';
                    msg.style.color = 'red'
                }
                else {
                    saveUser(fname.value.trim(), lname.value.trim(), email.value.trim(), password.value, repassword.value)
                }
            }
            else {
                saveUser(fname.value.trim(), lname.value.trim(), email.value.trim(), password.value, repassword.value)
            }
        }
    }
})


// ------------------------- go to login  ----------------------------------

let login = document.getElementById('alreadsignup-btn')
login.addEventListener('click', () => {
    window.location.href = '/login/'
})