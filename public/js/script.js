//Show login form
const loginButton = document.getElementById('login')
const signupButton = document.getElementById('signup')

loginButton.addEventListener('click', () => {
    const loginForm = document.getElementById('loginForm')
    loginForm.setAttribute("style", "display: block")
    loginButton.setAttribute("style", "display:none")
    signupButton.setAttribute("style", "display:none")
})

signupButton.addEventListener('click', () => {
    const signupForm = document.getElementById('signupForm')
    signupForm.setAttribute("style", "display: block")
    loginButton.setAttribute("style", "display:none")
    signupButton.setAttribute("style", "display:none")
})