

if (document.querySelector('#sign-Up-Button')) {
    document.querySelector('#sign-Up-Button').addEventListener('click', function () {
        let userName = document.getElementById('sign-Up-Username').value;
        let email = document.getElementById('sign-Up-Email').value;
        let password = document.getElementById('sign-Up-Password').value; 
        let confirmPassword = document.getElementById('sign-Up-Confirm-Password').value;

        if (userName === '' || email === '' || password === '' || confirmPassword === '') {
            document.getElementById('sign-Up-Error').textContent = 'Please fill all the fields.';
            document.getElementById('sign-Up-Error').className = 'text-danger mb-3';
            return;
        } 
        else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            document.getElementById('sign-Up-Error').textContent = 'Please enter a valid email address.';
            document.getElementById('sign-Up-Error').className = 'text-danger mb-3';
            return;
        }
        else if (password !== confirmPassword) {
            document.getElementById('sign-Up-Error').textContent = 'Passwords do not match.';
            document.getElementById('sign-Up-Error').className = 'text-danger mb-3';
            return;
        } 
        else if (password.length < 8) { 
            document.getElementById('sign-Up-Error').textContent = 'Password must be at least 8 characters long.';
            document.getElementById('sign-Up-Error').className = 'text-danger mb-3';
            return;
        }

        else{
let users = JSON.parse(localStorage.getItem('users')) || [];
let exists = users.some(user => user.email === email);
if (exists) {
    document.getElementById('sign-Up-Error').textContent = 'User already exists.';
    document.getElementById('sign-Up-Error').className = 'text-danger mb-3';
    return;
}

users.push({
    userName: userName,
    email: email,
    password: password
});
localStorage.setItem('users', JSON.stringify(users));

document.getElementById('sign-Up-Error').textContent = 'Account created successfully.';
document.getElementById('sign-Up-Error').className = 'text-success mb-3';

setTimeout(function(){
    window.location.href = 'index.html';
}, 2000);
    }
    });
}




//  log in logic 


if (document.querySelector('#sign-In-Button')){
    document.querySelector('#sign-In-Button').addEventListener('click' , function(){
        let email = document.getElementById('sign-In-Email').value;
        let password = document.getElementById('sign-In-Password').value;

        if(email === '' || password === ''){
            document.getElementById('sign-In-Error').textContent = 'Please fill all the fields.';
            document.getElementById('sign-In-Error').className = 'text-danger mb3';
            return;
        }
        else{
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.email === email && user.password === password);
            if(user){
                localStorage.setItem('currentUser', JSON.stringify(user));
                document.getElementById('sign-In-Error').textContent = 'Login successful.';
                document.getElementById('sign-In-Error').className = 'text-success mb-3';
               setTimeout(function(){
                window.location.href = 'main.html';
               }, 2000);
            }
        }

    })
}




  
//  log out logic

window.onload = function () {
    if (window.location.pathname.includes('main.html')) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            window.location.href = 'index.html';
        } else {
            const nameEl = document.getElementById('user-Name');
            if (nameEl) {
                nameEl.textContent = currentUser.userName;
            }
        }
        const logoutBtn = document.getElementById('log-Out-Button');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        }
    }
};
