const API_URL = "https://62b21703c7e53744afc76e45.mockapi.io/info";
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const tableBody = document.querySelector("#infoTable tbody");
const pagination = document.querySelector(".pagination");
const pageCount = 10;
let currPage = 1;
const name = document.getElementById("userName");
const birthday = document.getElementById("userBirthday");
const fathersName = document.getElementById("userFather");
const education = document.getElementById("userEducation");
const country = document.getElementById("userCountry");
const city = document.getElementById("userCity");
const block = document.getElementById("userBlock");
const floor = document.getElementById("userFloor");
const family = document.getElementById("userFamily");
const nationalId = document.getElementById("userNationalId");
const job = document.getElementById("userJob");
const gender = document.getElementById("userGender");
const state = document.getElementById("userState");
const street = document.getElementById("userStreet");
const No = document.getElementById("userNo");
const unit = document.getElementById("userUnit");
const dlt = document.getElementById("deleteItem");
const addBtn = document.getElementById("submit");
const loading = document.querySelector("#loading");
document.addEventListener("DOMContentLoaded", () => {
  if (params.page) {
    openCurrentURLpage(params.page);
    currPage = +params.page
  } else {
    readUsers();
  }

});

function readUsers() {
  tableBody.innerHTML = "";
  loading.style.display = "block";
  fetch(`${API_URL}/info${generateQueryParams(currPage)}`)
    .then((response) => response.json())
    .then((user) => {
        loading.style.display = "none";
      const { items, count } = user;
      items.forEach(addToDom);
      createPagination(count);
    });

}

function openCurrentURLpage(page) {
  tableBody.innerHTML = "";
  fetch(`${API_URL}/info${generateQueryParams(page)}`)
    .then((response) => response.json())
    .then((user) => {
      const { items, count } = user;
      items.forEach(addToDom);
      createPagination(count);
    });
}


function addToDom(items) {
  let html = `
  <tr>
                            <td>${items.id}</td>
                            <td>${items.Name}</td>
                            <td>${items.family}</td>
                            <td>${items.birthday}</td>
                            <td>${items.nationalID}</td>
                            <td>${items.fatherName}</td>
                            <td>${items.job}</td>
                            <td>${items.education}</td>
                            <td>${items.gender}</td>
                            <td>${items.country}</td>
                            <td>${items.state}</td>
                            <td>${items.city}</td>
                            <td>${items.street}</td>
                            <td>${items.block}</td>
                            <td>${items.no}</td>
                            <td>${items.floor}</td>
                            <td>${items.unit}</td>
                            <td>
                            <button onclick="editInfo(${items.id})" type="button" class="btn btn-primary sm ">
                            edit
                          </button>
                            </td>
                            <td>
                            <button onclick="modalInfo(${items.id})" type="button" class="btn btn-danger sm " data-bs-toggle="modal" data-bs-target="#exampleModal">
                            DELETE
                          </button>
                            </td>

                        </tr>
  `;
  tableBody.innerHTML += html;
  console.log(tableBody);
}

function createPagination(count) {
  const pageNum = Math.ceil(count / pageCount);
  let str = "";
  for (let i = 1; i <= pageNum; i++) {
    str += `<li class="page-item ${i === currPage ? "active" : ""
      }"><a class="page-link" href="#">${i}</a></li>`;
  }
  pagination.innerHTML = str;
}

function generateQueryParams(page = 1) {
  let queryParams = `?page=${page}&limit=${pageCount}`;
  return queryParams;
}

document.querySelector(".pagination").addEventListener("click", (e) => {
  let lis = document.querySelectorAll(".pagination li");
  lis.forEach((li) => {
    li.classList.remove("active");
  });
  e.target.parentElement.classList.add("active");
  currPage = +e.target.innerHTML;
  readUsers();
});

function searchUser(info) {
  return fetch(`${API_URL}/info?search=${info}`)
    .then((response) => response.json())
    .then((data) => {
      tableBody.innerHTML = "";
      data.items.forEach(addToDom);

      console.log(data);
    });
}

var debounced = _.debounce(searchUser, 1000);
document.querySelector("#searchBox").addEventListener("input", (e) => {
  debounced(e.target.value);
});

function modalInfo(id) {
  // console.log(id);
  fetch(`${API_URL}/info/${id}`)
    .then((respopnse) => respopnse.json())
    .then((data) => {
      name.dataset.value = data.id;
      name.innerText = data.Name;
      family.innerText = data.family;
      birthday.innerText = data.birthday;
      nationalId.innerText = data.nationalID;
      fathersName.innerText = data.fatherName;
      education.innerText = data.education;
      job.innerText = data.job;
      gender.innerText = data.gender;
      country.innerText = data.country;
      state.innerText = data.state;
      city.innerText = data.city;
      street.innerText = data.street;
      block.innerText = data.block;
      No.innerText = data.no;
      floor.innerText = data.floor;
      unit.innerText = data.unit;
    });
}


dlt.addEventListener('click', (e) => {
  const id = + name.dataset.value
  fetch(`${API_URL}/info/${id}`, {
    method: "DELETE"
  })
    .then((response) => response.json())
    .then(() => {
      Toastify({

        text: `user ${id} deleted`,

        duration: 3000

      }).showToast();
      readUsers();
    })

})


addBtn.addEventListener("click", (e) => {
  window.location.href = "/form.html";

})

function editInfo(id) {
  window.location.href = `/form.html?id=${id}&page=${currPage}`;
}