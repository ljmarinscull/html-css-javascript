$(document).ready(function () {
  $('.slider-container').slick({
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '60px',
  });
});

//Variables
const form = document.getElementById("form");

const name = document.querySelector("#name");
const nameErrors = document.querySelector(".name-errors");
name.addEventListener('focus', (e) => {
  nameErrors.innerHTML = '';
  name.classList.remove("error");
});

const lastname = document.querySelector("#lastname");
const lastnameErrors = document.querySelector(".lastname-errors");
lastname.addEventListener('focus', (e) => {
  lastnameErrors.innerHTML = '';
  lastname.classList.remove("error");
});

const email = document.querySelector("#email");
const emailErrors = document.querySelector(".email-errors");
email.addEventListener('focus', (e) => {
  emailErrors.innerHTML = '';
  email.classList.remove("error");
});

const ci = document.querySelector("#ci");
const ciErrors = document.querySelector(".ci-errors");
ci.addEventListener('focus', (e) => {
  ciErrors.innerHTML = '';
  ci.classList.remove("error");
});

const cbDepartament = document.querySelector("#departament");
const deptErrors = document.querySelector(".depts-errors");
cbDepartament.addEventListener('focus', (e) => {
  deptErrors.innerHTML = '';
  cbDepartament.classList.remove("error");
});

const cbTowns = document.querySelector("#town");
const townErrors = document.querySelector(".towns-errors");
cbTowns.addEventListener('focus', (e) => {
  townErrors.innerHTML = '';
  cbTowns.classList.remove("error");
});

class DataSource {

  static getDepts(dptosLocs) {
    const result = Object.keys(dptosLocs);
    return result;
  }

  static getTownsByDept(dept) {
    return dptosLocs[dept];
  }

  static validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}

class UI {

  fillDepartaments(departaments) {
    departaments.forEach((el) => {
      const opt = document.createElement('option');
      opt.innerHTML = el;
      opt.value = el;
      cbDepartament.appendChild(opt);
    });
  }

  fillTowns(towns) {
    towns.forEach((el) => {
      const opt = document.createElement('option');
      opt.innerHTML = el;
      opt.value = el;
      cbTowns.appendChild(opt);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const ui = new UI();

  ui.fillDepartaments(DataSource.getDepts(dptosLocs));

  cbDepartament.addEventListener("change", (event) => {
    const dept = event.target.value;
    const towns = DataSource.getTownsByDept(dept);
    ui.fillTowns(towns);
  });

  form.addEventListener("submit", (e) => {
    console.log("form => submit");
    e.preventDefault();

    const nameMsgs = [];
    const lastnameMsgs = [];
    const emailMsgs = [];
    const ciMsgs = [];

    if (name.value === '' || name.value == null) {
      nameMsgs.push("The name is required.");
    }

    if (name.value.length < 2) {
      nameMsgs.push("The name must has at least two characters.");
    }

    if (lastname.value === '' || lastname.value == null) {
      lastnameMsgs.push("The lastname is required.");
    }

    if (lastname.value.length < 2) {
      lastnameMsgs.push("The lastname must has at least two characters.");
    }

    if (email.value === '' || email.value == null) {
      emailMsgs.push("The email is required.");
    }

    if (!DataSource.validateEmail(email.value)) {
      emailMsgs.push("The email is invalid.");
    }

    if (ci.value === '' || ci.value == null) {
      ciMsgs.push("The CI is required.");
    }

    if (validarCedula(ci.value)) {
      ciMsgs.push("The CI is invalid.");
    }

    if (nameMsgs.length > 0) {
      e.preventDefault();

      name.classList.add("error");
      nameErrors.innerHTML = nameMsgs[0];
    }

    if (lastnameMsgs.length > 0) {
      e.preventDefault();

      lastname.classList.add("error");
      lastnameErrors.innerHTML = lastnameMsgs[0];
    }

    if (emailMsgs.length > 0) {
      e.preventDefault();

      email.classList.add("error");
      emailErrors.innerHTML = emailMsgs[0];
    }

    if (cbTowns.value === '' || cbTowns.value == null) {
      e.preventDefault();

      cbTowns.classList.add("error");
      townErrors.innerHTML = "The Town is required.";
    }

    if (cbDepartament.value === '' || cbDepartament.value == null) {
      e.preventDefault();

      cbDepartament.classList.add("error");
      deptErrors.innerHTML = "The Departament is required.";
    }

    if (ciMsgs.length > 0) {
      e.preventDefault();

      ci.classList.add("error");
      ciErrors.innerHTML = ciMsgs[0];
    }


  });

});

