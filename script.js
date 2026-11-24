const signupForm = document.getElementById('signupForm');
const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword');

togglePassword.addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  togglePassword.textContent = isHidden ? 'Hide' : 'Show';
  togglePassword.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();

  // Clear old messages before checking the form again.
  document.querySelectorAll('.error').forEach((item) => item.textContent = '');
  document.getElementById('successMessage').textContent = '';

  const name = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const acceptedTerms = document.getElementById('terms').checked;

  let isValid = true;

  if (name.length < 2) {
    document.getElementById('nameError').textContent = 'Please enter your name (at least 2 characters).';
    isValid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address.';
    isValid = false;
  }

  if (password.length < 8) {
    document.getElementById('passwordError').textContent = 'Password must be at least 8 characters.';
    isValid = false;
  }

  if (confirmPassword !== password || confirmPassword === '') {
    document.getElementById('confirmError').textContent = 'Passwords do not match.';
    isValid = false;
  }

  if (!acceptedTerms) {
    document.getElementById('termsError').textContent = 'Please accept the terms to continue.';
    isValid = false;
  }

  if (isValid) {
    document.getElementById('successMessage').textContent =
      `Welcome, ${name}! Your form was submitted successfully.`;
    signupForm.reset();
    passwordInput.type = 'password';
    togglePassword.textContent = 'Show';
  }
});
