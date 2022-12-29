// Database config

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCCb1lNsNtLsqhFhcrKiW8DKoLhR5Krys",
    authDomain: "registration-form-with-db.firebaseapp.com",
    projectId: "registration-form-with-db",
    storageBucket: "registration-form-with-db.appspot.com",
    messagingSenderId: "366969734350",
    appId: "1:366969734350:web:0dabb24a404c70fdc57c9f",
    measurementId: "G-9K9N6KSCLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var qualifications = document.getElementById("qualifications");
var age = document.getElementById("age");
var email = document.getElementById("email");
var phoneNum = document.getElementById("pNum");

var parent = document.getElementById("parent");

window.submit = function () {
    var obj = {
        firstName: firstName.value,
        lastName: lastName.value,
        qualifications: qualifications.value,
        age: age.value,
        email: email.value,
        phoneNum: phoneNum.value,
    }
    if (!firstName.value || !lastName.value || !qualifications.value || !age.value || !email.value || !phoneNum.value) {
        alert("Must Fill All Fields")
    } else {
        obj.uid = Math.random().toString().slice(2);
        const reference = ref(db, `registrations/${obj.uid}/`);
        set(reference, obj)
            .then((function () {
                alert("Form Submitted Successfully");
                firstName.value = "";
                lastName.value = "";
                qualifications.value = "";
                age.value = "";
                email.value = "";
                phoneNum.value = "";
                window.location.assign("./getData.html");
            }))
            .catch(function (err) {
                console.log(err);
            });
    }
}

function getData() {
    const reference = ref(db, "registrations/");
    var array = [];
    onChildAdded(reference, function (data) {
        array.push(data.val());
        parent.innerHTML = "";
        for (var i = 0; i < array.length; i++) {
            parent.innerHTML += "";
            parent.innerHTML +=
                `
                    <tr>
                        <th scope="row">${array[i].uid}</th>
                        <td>${array[i].firstName}</td>
                        <td>${array[i].lastName}</td>
                        <td>${array[i].qualifications}</td>
                        <td>${array[i].age}</td>
                        <td>${array[i].email}</td>
                        <td>${array[i].phoneNum}</td>
                    </tr>
                `
            // console.log(array[i]);
        }
    })
}

getData();