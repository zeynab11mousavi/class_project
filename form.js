const addInfoBtn = document.getElementById("addInfo");
const submitForm = document.getElementById("submitForm");
//Get URL Query Param
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const API_URL = "https://62b21703c7e53744afc76e45.mockapi.io/info";
const name = document.getElementById("Name");
const birthday = document.getElementById("birthday");
const fathersName = document.getElementById("fathername");
const education = document.getElementById("education");
const country = document.getElementById("country");
const city = document.getElementById("city");
const block = document.getElementById("block");
const floor = document.getElementById("floor");
const family = document.getElementById("family");
const nationalId = document.getElementById("nationalID");
const job = document.getElementById("job");
const gender = document.getElementById("gender");
const state = document.getElementById("state");
const street = document.getElementById("street");

// document.addEventListener('contextmenu', event => event.preventDefault());
// const disableselect = (e) => {
//     return false
//     }
//     document.onselectstart = disableselect
//     document.onmousedown = disableselect



if (params.id) {
    addInfoBtn.textContent = "Edit";
    document.addEventListener("DOMContentLoaded", getInfo(params.id));
    function getInfo(id) {
        fetch(`${API_URL}/info/${id}`)
            .then(res => res.json())
            .then(data => {
                Name.value = data.Name;
                family.value = data.family;
                birthday.value = data.birthday;
                nationalId.value = data.nationalID;
                fathersName.value = data.fatherName;
                education.value = data.education;
                job.value = data.job;
                gender.value = data.gender;
                country.value = data.country;
                state.value = data.state;
                city.value = data.city;
                street.value = data.street;
                block.value = data.block;
                no.value = data.no;
                floor.value = data.floor;
                unit.value = data.unit;
            });

    }


    function editInfo(data, id) {
        fetch(`${API_URL}/info/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.json()).then(() => {
            window.location.href = `/index.html?page=${params.page}`;
        })
    }
    console.log(submitForm)
    submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(submitForm);
        let data = Object.fromEntries(formData);
        console.log(data);
        editInfo(data, params.id);
    })



} else {
    addInfoBtn.textContent = "Add";
        function addInfo(data) {
        fetch(`${API_URL}/info`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res => res.json()).then(() => {
            window.location.href = `/index.html`;

        })
        .catch(err => {
            // console.log(err);

            Toastify({

                text: `user error`,
        
                duration: 3000
        
              }).showToast();
        });

    }
    console.log(submitForm)
    submitForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let formData = new FormData(submitForm);
        let data = Object.fromEntries(formData);
        console.log(data);
        addInfo(data);

    })
}


