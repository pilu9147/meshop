let curruser = JSON.parse(sessionStorage.getItem("loggedUser"))
let prof = document.getElementById('profile')
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let savebtn = document.getElementById('save-info');
let note = document.getElementById('note');

//let curruser = JSON.parse(sessionStorage.getItem('loggedUser'));
if (curruser == null) {
  alert("Please login first!!")
  window.location.href = '/login/'
} else {
  fname.value = curruser.fstName; // Corrected property name
  lname.value = curruser.lstName; // Corrected property name
  prof.textContent = curruser.fstName
}




// changing and updating name-----------------------------------------------------------

savebtn.addEventListener('click', (event) => {
  event.preventDefault()

  // set session storage --------------------------------------------
  curruser.fstName = fname.value.trim()
  curruser.lstName = lname.value.trim()
  sessionStorage.setItem('loggedUser', JSON.stringify(curruser))

  // set local storage  ------------------------------------------------------

  let localstrg = JSON.parse(localStorage.getItem('users'));
  let userIndex = localstrg.findIndex((obj) => obj.uEmail === curruser.uEmail);
  localstrg[userIndex].fstName = fname.value.trim();
  localstrg[userIndex].lstName = lname.value.trim();
  localStorage.setItem('users', JSON.stringify(localstrg));

  note.innerText = `name ${fname.value}${lname.value}updated successfully`
  note.style.color = 'green'

  //curruser = {}
  updateName()
})

//  changing password -------------------------------------------

let oldpass = document.getElementById('old-pass');
let newpass = document.getElementById('pass');
let rePass = document.getElementById('re-pass');
let changepass = document.getElementById('changepass-btn');
let notes = document.getElementById('notes');

changepass.addEventListener('click', (event) => {
  event.preventDefault();

  let curruser = JSON.parse(sessionStorage.getItem('loggedUser'));
  let localstrg = JSON.parse(localStorage.getItem('users'));

  if (oldpass.value === curruser.uPassword) {
    if (newpass.value === rePass.value) {

      // set session storage --------------------------------------------

      curruser.uPassword = newpass.value;
      curruser.rePassword = newpass.value
      sessionStorage.setItem('loggedUser', JSON.stringify(curruser));

      // set localStorage  ---------------------------------------------

      let userIndex = localstrg.findIndex((obj) => obj.uEmail === curruser.uEmail);
      localstrg[userIndex].uPassword = newpass.value;
      localstrg[userIndex].rePassword = newpass.value;
      localStorage.setItem('users', JSON.stringify(localstrg));

      notes.innerText = 'Password changed successfully';
      notes.style.color = 'green';
    } else {
      notes.innerText = 'New password does not match with re-entered password';
      notes.style.color = 'red';
    }
  } else {
    notes.innerText = 'Old password is incorrect. Please enter the correct password';
    notes.style.color = 'red';
  }

  oldpass.value = '';
  newpass.value = '';
  rePass.value = '';
});

// logout and clear session storage  ----------------------------------------------------

let logout = document.getElementById("logout-btn")
logout.addEventListener('click', () => {
  sessionStorage.clear();
  localStorage.clear();
  window.location.href = '../index.html'
})