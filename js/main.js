const moveToLogin = document.querySelector("#moveToLogin");
const moveToSignup = document.querySelector("#moveToSignup");
const signUpPage = document.querySelector("#signUp");
const logInPage = document.querySelector("#logIn");
const loginButton = document.querySelector("#loginButton");
const signupButton = document.querySelector("#signupButton");
const signupFirstname = document.querySelector("#signupFirstname ");
const signupLastname = document.querySelector("#signupLastname ");
const signupEmail = document.querySelector("#signupEmail ");
const signupPassword = document.querySelector("#signupPassword ");
const loginEmail = document.querySelector("#loginEmail");
const loginPassword = document.querySelector("#loginPassword");
const signupErrorName = document.querySelector("#signupErrorName");
const signupErrorEmail = document.querySelector("#signupErrorEmail");
const signupErrorPassword = document.querySelector("#signupErrorPassword");
const moshkel = document.querySelector('#moshkel')
const panel = document.querySelector('#panel')
const panelName = document.querySelector('#panelName')
const panelEmail = document.querySelector('#panelEmail')
const closePanel = document.querySelector('#closePanel')
const errorLogin = document.querySelector('#errorLogin')
const inputLogin = document.querySelectorAll('.inputLogin')
const inputSignup = document.querySelectorAll('.inputSignup')
let flagSignup
let newTask

moveToLogin.addEventListener("click", () => {
  signUpPage.style.display = "none";
  logInPage.style.display = "flex";
});
moveToSignup.addEventListener("click", () => {
  signUpPage.style.display = "flex";
  logInPage.style.display = "none";
});

signupButton.addEventListener("click", () => {
  moshkel.style.minHeight ='40px' 
  flagSignup = true;

  const regexName = /^[a-zA-Zآ-ی]{4,}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  if (
    !regexName.test(signupFirstname.value) ||
    !regexName.test(signupLastname.value)
  ) {
    flagSignup = false;
    if (signupFirstname.value.length < 4 || signupLastname.value.length < 4) {
      signupErrorName.innerHTML = "First name and last name must be at least 4 characters long.";
    } else if (/\d/.test(signupFirstname)) {
      signupErrorName.innerHTML = "First name and last name must not contain any numbers.";
    } else {
      signupErrorName.innerHTML ="Invalid first name or last name! Please enter a valid name with letters only.";
    }
  } else {
    signupErrorName.innerHTML = "";
  }

  if (!regexEmail.test(signupEmail.value)) {
    flagSignup = false;
    if (!signupEmail.value.includes("@")) {
      signupErrorEmail.innerHTML = "The email must contain the '@' symbol.";
    } else if (!signupEmail.value.includes(".")) {
      signupErrorEmail.innerHTML =
        "The email must contain a '.' after the '@' symbol.";
    } else if (signupEmail.value.indexOf("@") === 0) {
      signupErrorEmail.innerHTML = "The email cannot start with the '@' symbol.";
    } else {
      signupErrorEmail.innerHTML =
        "Invalid email! Please enter a valid email address in the format: example@domain.com.";
    }
  } else {
    signupErrorEmail.innerHTML = "";
  }

  if (!regexPassword.test(signupPassword.value)) {
    flagSignup = false;
    if (signupPassword.value.length < 6) {
      signupErrorPassword.innerHTML =
        "The password must be at least 6 characters long.";
    } else if (!/[a-z]/.test(signupPassword.value)) {
      signupErrorPassword.innerHTML =
        "The password must include at least one lowercase letter.";
    } else if (!/[A-Z]/.test(signupPassword.value)) {
      signupErrorPassword.innerHTML =
        "The password must include at least one uppercase letter.";
    } else if (!/\d/.test(signupPassword.value)) {
      signupErrorPassword.innerHTML =
        "The password must include at least one number.";
    } else if (!/[@$!%*?&]/.test(signupPassword.value)) {
      signupErrorPassword.innerHTML =
        "The password must include at least one special character (e.g., @, $, !, %, *).";
    } else {
      signupErrorPassword.innerHTML = "Invalid password!";
    }
  } else {
    signupErrorPassword.innerHTML = "";
  }
  




  if (flagSignup == true) {
     newTask = {
        firstname: signupFirstname.value,
        lastname: signupLastname.value,
        email: signupEmail.value,
        password: signupPassword.value,
      };
    checkEmailAndSignUp(newTask)
    
    
  }
});

loginButton.addEventListener("click", () => {
  let userEmail = loginEmail.value;
  let userPassword = loginPassword.value;
  fetch("https://67928399cf994cc6804a4504.mockapi.io/users", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((tasks) => {
      // Do something with the list of tasks

      tasks.map((val,i) => {
        if (val.password == userPassword && val.email == userEmail) {
            panel.style.display='flex' 
            errorLogin.innerHTML = ''
            panelName.innerHTML = tasks[i].firstname+ " " + tasks[i].lastname
            panelEmail.innerHTML = "email : " + tasks[i].email

        }else{
            errorLogin.innerHTML = 'The email or password you entered is incorrect. Please check your details and try again.'
        }



        loginEmail.value = "";
        loginPassword.value = "";
      });
    })
    .catch((error) => {
      // handle error
      loginEmail.value = "";
      loginPassword.value = "";
    });
});



closePanel.addEventListener('click' , ()=>{
    panel.style.display='none' 
    errorLogin.innerHTML = ''
})


inputLogin.forEach((val)=>[
    val.addEventListener('keyup', (e)=>{
        if (e.keycode || e.which == 13) {
            loginButton.click()
        }
    })
])
inputSignup.forEach((val)=>[
    val.addEventListener('keyup', (e)=>{
        if (e.keycode || e.which == 13) {
            signupButton.click()
        }
    })
])


async function checkEmailAndSignUp(newUser) {
    const { email } = newUser;
  
    try {
      // دریافت لیست کاربران از MockAPI
      const response = await fetch("https://67928399cf994cc6804a4504.mockapi.io/users");
      const users = await response.json();
  
      // فیلتر کردن کاربران برای بررسی ایمیل
      const isEmailTaken = users.some(user => user.email === email);
  
      if (isEmailTaken) {
        signupErrorEmail.innerHTML = "This email is already exist!";
      } else{
        fetch("https://67928399cf994cc6804a4504.mockapi.io/users", {
            method: "POST",
            headers: { "content-type": "application/json" },
            // Send your data in the request body as JSON
            body: JSON.stringify(newTask),
          })
            .then((res) => {
              if (res.ok) {
                return res.json();
              }
              // handle error
            })
            .then((task) => {
              // do something with the new task
              signupFirstname.value = "";
              signupLastname.value = "";
              signupEmail.value = "";
              signupPassword.value = "";
              signupFirstname.value.focus();
            })
            .catch((error) => {
              // handle error
              signupFirstname.value = "";
              signupLastname.value = "";
              signupEmail.value = "";
              signupPassword.value = "";
              signupFirstname.focus();
            });
      }
    } catch (error) {
      console.error("Error:", error);
   
    }
  }
  