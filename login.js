var nameInput = document.getElementById('name');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('confirm_password');

var nameError = document.getElementById('nameError');
var emailError = document.getElementById('emailError');
var passwordError = document.getElementById('passwordError');
var confirmPasswordError = document.getElementById('confirmPasswordError');

var form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  let isValid = true;

  // Check if the name is a string and does not contain numbers
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Name is required';
    isValid = false;
  } else if (!/^[a-zA-Z\s]+$/.test(nameInput.value)) {
    nameError.textContent = 'Name must be a string and cannot contain numbers';
    isValid = false;
  } else {
    nameError.textContent = '';
  }

  if (emailInput.value.trim() === '') {
    emailError.textContent = 'Email is required';
    isValid = false;
  } else {
    emailError.textContent = '';
  }

  if (passwordInput.value.trim() === '') {
    passwordError.textContent = 'Password is required';
    isValid = false;
  } else if (passwordInput.value.length < 8) {
    passwordError.textContent = 'Password must be at least 8 characters';
    isValid = false;
  } else if (!/[A-Z]/.test(passwordInput.value)) {
    passwordError.textContent = 'Password must include at least one capital letter';
    isValid = false;
  } else if (!/[a-z]/.test(passwordInput.value)) {
    passwordError.textContent = 'Password must include at least one lowercase letter';
    isValid = false;
  } else {
    passwordError.textContent = '';
  }

  if (confirmPasswordInput.value.trim() === '') {
    confirmPasswordError.textContent = 'Confirm password is required';
    isValid = false;
  } else if (confirmPasswordInput.value !== passwordInput.value) {
    confirmPasswordError.textContent = 'Passwords do not match';
    isValid = false;
  } else {
    confirmPasswordError.textContent = '';
  }

  if (isValid) {
    localStorage.setItem('username', nameInput.value);
    window.location.href = 'index.html';
  }
});
