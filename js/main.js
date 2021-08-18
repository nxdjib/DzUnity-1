// ############### RETURN CARD TEMPLATE FUNCTION
// ############### RETURN CARD TEMPLATE FUNCTION

function CardOutput(data) {
  let output = `
<article
        class="card" data-v="${data.willaya}" 
        ${setCardFillters(data.needs_type)}>

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

      <p class="needs__label">Besoin:</p>

        ${CheckNeedsType(data.needs_type)}

      </ul>


      <button class="association__details__btn">
        <span class="icon material-icons-sharp"> info </span>

        <p>details</p>
      </button>
    </div>

</article>
`;
  return output;
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
  let vetement_needs = ``;

  if (data.medical) {
    medical_needs = `<li class="needs">Medical</li>`;
  }

  if (data.alimentaire) {
    alimentaire_needs = `<li class="needs">Alimentaire</li>`;
  }

  if (data.vetement) {
    vetement_needs = `<li class="needs">Vetements</li>`;
  }

  output = `
  ${medical_needs}
  ${alimentaire_needs}
  ${vetement_needs}
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
  let vetement_needs = ``;

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

  if (data.vetement) {
    vetement_needs = true;
  } else {
    vetement_needs = false;
  }

  output = `
  data-d1="${medical_needs}"
  data-d2="${alimentaire_needs}"
  data-d3="${vetement_needs}"
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
const get_results = document.getElementById("get_results");

get_results.addEventListener("click", DisplayValue);

function DisplayValue() {
  let ville_Filter = document.getElementsByName("ville");
  let donnation_Filter = document.getElementsByName("donnation_type");
  ville_Filter.forEach((ville) => {
    if (ville.checked) {
      selected_1.innerHTML = ville.value;

      FilterbyVille(ville.value);
    }
  });

  donnation_Filter.forEach((donnation) => {
    if (donnation.checked) {
      console.log(donnation.value);
      if (donnation.value == "data-d1") {
        selected_2.innerHTML = "Medical";
      }

      if (donnation.value == "data-d2") {
        selected_2.innerHTML = "Alimentaire";
      }

      if (donnation.value == "data-d3") {
        selected_2.innerHTML = "Vêtement";
      }

      if (donnation.value == "Type de donnation") {
        selected_2.innerHTML = "Type de donnation";
      }

      FilterbyDonnationType(donnation.value);
    }
  });
}
