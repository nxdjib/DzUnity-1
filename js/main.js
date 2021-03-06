// ############### RETURN CARD TEMPLATE FUNCTION
// ############### RETURN CARD TEMPLATE FUNCTION

function Needs_list(data) {
  return `
        ${data
          .map((n) => `<li class="details__list__items">${n}</li>`)
          .join("")}
    `;
}
// ############### RETURN CARD TEMPLATE FUNCTION
// ############### RETURN CARD TEMPLATE FUNCTION

// #
// ################
// #

// ############### RETURN NEEDS TYPE FUNCTION
// ############### RETURN NEEDS TYPE FUNCTION

function CheckNeedsType(data) {
  let output;

  let medical_needs = ``;
  let alimentaire_needs = ``;
  let autre_needs = ``;

  if (data.medical) {
    medical_needs = `<li class="needs">Medical</li>`;
  }

  if (data.alimentaire) {
    alimentaire_needs = `<li class="needs">Alimentaire</li>`;
  }

  if (data.autre) {
    autre_needs = `<li class="needs">Autre</li>`;
  }

  output = `
  ${medical_needs}
  ${alimentaire_needs}
  ${autre_needs}
   `;

  return output;
}

// ############### RETURN NEEDS TYPE FUNCTION
// ############### RETURN NEEDS TYPE FUNCTION

// #
// ################
// #

// ############### BUILD NEW CARD
// ############### BUILD NEW CARD

function BuildNewCard(data) {
  let card__container = document.getElementById("card__container");
  for (let i = 0; i < data.length; i++) {
    card__container.innerHTML += CardOutput(data[i]);

    function CardOutput(data) {
      function details_inc() {
        let output = "data-det" + i;
        return output;
      }
      let output = `<article
  class="card"
  data-v="${data.willaya}"
  data-details="${details_inc()}"
  ${setCardFillters(data.needs_type)}
>
  <h2 class="association__name">${data.name}</h2>

  <p class="association__willaya">${data.willaya}</p>

  <address class="association__address">
    <span class="icon material-icons-sharp"> location_on </span>
    <p>${data.address}</p>
  </address>

  <a class="association__phone">
    <span class="icon material-icons-sharp"> call </span>

    <p>${data.phone}</p>
  </a>

  <div class="association__needs__type">
    <ul>
      <p class="needs__label">Besoins :</p>

      ${CheckNeedsType(data.needs_type)}
      </ul>
  </div>
      <label class="btn_dt_label" for="${details_inc()}">
        <a class="association__details__btn">
          <span class="icon material-icons-sharp"> info </span>
  
          <p>d??tails</p>
        </a>
  
        <input
          type="radio"
          name="details"
          id="${details_inc()}"
          value="${details_inc()}"
        />
      </label>
</article>

<section class="details_box" data-det="${details_inc()}">
  <div class="details__card">
    <div class="details__card__heading">
      <p class="details__title">Besoin de l'assocition</p>
      <label for="close_btn" class="close_btn">
        <input type="radio" name="details" id="close_btn" value="close" />
        <span class="close-icon material-icons-sharp">visibility_off</span>
      </label>
    </div>

    <ul class="details__list">
      ${Needs_list(data.needs)}
    </ul>
  </div>
</section>`;
      return output;
    }
  }
}

// ############### BUILD NEW CARD
// ############### BUILD NEW CARD

// #
// ################
// #

// ############### AJAX GET REQUEST FUNCTION
// ############### AJAX GET REQUEST FUNCTION

function GET__data(url, callback) {
  const request = new XMLHttpRequest();

  request.open("get", url, true);

  request.onload = function () {
    callback(request);
  };

  request.send();
}

GET__data("./data/list.json", function (request) {
  if (request.status == 200) {
    let associationList = JSON.parse(request.responseText);

    BuildNewCard(associationList);

    const details_value = document.getElementsByName("details");
    const details_box = document.querySelectorAll(".details_box");

    details_value.forEach((dvalue) => {
      dvalue.addEventListener("change", displayDetails);
      function displayDetails() {
        details_box.forEach((e) => {
          let box_details = e.getAttribute("data-det");
          e.style = "display :grid";

          if (box_details != dvalue.value) {
            e.style = "display :none";
          }
        });
      }
    });
  }
});

// ############### AJAX GET REQUEST FUNCTION
// ############### AJAX GET REQUEST FUNCTION

// #
// ################
// #

// ############### FILTER FUNCTIONS
// ############### FILTER FUNCTIONS

// ############### FILTER BY VILLE

function FilterbyVille(selected_ville) {
  cards = document.querySelectorAll(".card");

  cards.forEach((e) => {
    let ville = e.getAttribute("data-v");
    e.style = "display:grid";

    if (selected_ville != "Villes") {
      if (selected_ville != ville) {
        e.style = "display:none";
      }
    }
  });
}

// ############### SET CARD FILTERS FUNCTION

function setCardFillters(data) {
  let output;

  let medical_needs = ``;
  let alimentaire_needs = ``;
  let autre_needs = ``;

  if (data.medical) {
    medical_needs = true;
  } else {
    medical_needs = false;
  }

  if (data.alimentaire) {
    alimentaire_needs = true;
  } else {
    alimentaire_needs = false;
  }

  if (data.autre) {
    autre_needs = true;
  } else {
    autre_needs = false;
  }

  output = `
  data-d1="${medical_needs}"
  data-d2="${alimentaire_needs}"
  data-d3="${autre_needs}"
  `;

  return output;
}

// ############### FILTER BY DONNATION TYPE

function FilterbyDonnationType(selected_donnation) {
  cards = document.querySelectorAll(".card");
  cards.forEach((e) => {
    let donnationType = e.getAttribute(selected_donnation);

    if (donnationType == "false") {
      e.style = "display : none";
    }
  });
}

// ############### FILTER FUNCTIONS
// ############### FILTER FUNCTIONS

const selected_1 = document.getElementById("selected_1");
const selected_2 = document.getElementById("selected_2");

const ville_Filter = document.getElementsByName("ville");
const donnation_Filter = document.getElementsByName("donnation_type");
const label_d = document.querySelectorAll(".label_d");

ville_Filter.forEach((ville) => {
  ville.addEventListener("change", DisplayValue);
  DisplayValue();
});

donnation_Filter.forEach((donnation) => {
  donnation.addEventListener("change", DisplayValue);

  DisplayValue();
});

label_d.forEach((label) => {
  label.addEventListener("click", DisplayValue);

  DisplayValue();
});

function DisplayValue() {
  const getbody = document.getElementsByTagName("body");
  window.scrollTo({ top: 0, behavior: "smooth" });

  ville_Filter.forEach((ville) => {
    if (ville.checked) {
      selected_1.innerHTML = ville.value;

      FilterbyVille(ville.value);
    }
  });

  donnation_Filter.forEach((donnation) => {
    if (donnation.checked) {
      if (donnation.value == "data-d1") {
        selected_2.innerHTML = "Medical";
      }

      if (donnation.value == "data-d2") {
        selected_2.innerHTML = "Alimentaire";
      }

      if (donnation.value == "data-d3") {
        selected_2.innerHTML = "Autre";
      }

      if (donnation.value == "Type de donnation") {
        selected_2.innerHTML = "Type de donnation";
      }

      FilterbyDonnationType(donnation.value);
    }
  });
}

// #######################
