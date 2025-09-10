   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
        import {
            getAuth,
            createUserWithEmailAndPassword,
            signInWithEmailAndPassword,
            onAuthStateChanged,
            signOut
        //Update the below URL with the appropriate version if necessary.
        } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
       
      
        // INSERT YOUR FIREBASE CONFIG OBJECT HERE
        const firebaseConfig = {
            apiKey: "AIzaSyACWV6NetYJY6RDwKgSvtnGFt5KZpdMw58",
            authDomain: "alagtma32.firebaseapp.com",
            projectId: "alagtma32",
            storageBucket: "alagtma32.appspot.com",
            messagingSenderId: "65006359694",
            appId: "1:65006359694:web:8d78fb2701bd33dbb6e5df"
          };
      
    
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        const userEmail = document.querySelector("#userEmail");
        const userPassword = document.querySelector("#userPassword");
        const authForm = document.querySelector("#authForm");
        const secretContent = document.querySelector("#secretContent");
        const signUpButton = document.querySelector("#signUpButton");
        const signInButton = document.querySelector("#signInButton");
        const signOutButton = document.querySelector("#signOutButton");

        secretContent.style.display = 'none';

        const userSignUp = async() => {
            const signUpEmail = userEmail.value;
            const signUpPassword = userPassword.value;
            createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Your account has been created!");
            })
            .catch((error) => { 
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)
            })
        }

        const userSignIn = async() => {
            const signInEmail = userEmail.value;
            const signInPassword = userPassword.value;
            signInWithEmailAndPassword(auth, signInEmail, signInPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("You have signed in successfully!");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + errorMessage)
                alert("You have signed in error");
            })
        }

        const checkAuthState = async() => {
            onAuthStateChanged(auth, user => {
                if(user) {
                    authForm.style.display = 'none';
                    secretContent.style.display = 'block';
                }
                else {
                    authForm.style.display = 'block';
                    secretContent.style.display = 'none';
                }
            })
        }

        const userSignOut = async() => {
            await signOut(auth);
        }

        checkAuthState();

        signUpButton.addEventListener('click', userSignUp);
        signInButton.addEventListener('click', userSignIn);
        signOutButton.addEventListener('click', userSignOut);