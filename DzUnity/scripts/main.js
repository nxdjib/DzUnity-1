function Needs_list(needs) {
  return `
        ${needs.map((item) => `<li class="needs">${item}</li>`).join("")}
    `;
}

function isAssociation(association) {
  if (association) {
    return `#Association`;
  } else return ``;
}

function Carte(data) {
  var card = document.getElementById("list");

  card.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    var cardTemplate = `
    <article class="card">
        <h2 class="association_name">${data[i].name}</h2>
      
        <p class="willaya">${data[i].willaya}</p>
      
        <hr class="separator" />
      
        <p class="association">${isAssociation(data[i].association)}</p>
      
        <p class="address">
      
        <span class="material-icons-sharp"> location_on </span>
        <a href="${data[i].url}">${data[i].addresse}</a>
        </p>
        <p class="phone">
          <span class="material-icons-sharp"> call </span>
          <a href="tel:${data[i].tel}">${data[i].tel}</a>
        </p>
        <ul class="needs_list">
        <b class="needs_label">Besoins:</b>
        ${Needs_list(data[i].besoin)}
        </ul>
      </article>
    `;

    card.innerHTML += cardTemplate;
  }
}

var xhttp = new XMLHttpRequest();

xhttp.onload = function () {
  if (this.status === 200) {
    var dataResponse = JSON.parse(xhttp.responseText);
    Carte(dataResponse);

    var willayaFilter = document.getElementById("searchInput");

    willayaFilter.addEventListener("keyup", filterWillaya);

    function filterWillaya() {
      var filterValue = document
        .getElementById("searchInput")
        .value.toLowerCase();

      var data = searchList(filterValue, dataResponse);
      Carte(data);
    }

    function searchList(filterValue, data) {
      var filtered_Data = [];
      for (var i = 0; i < data.length; i++) {
        filterValue = filterValue.toLowerCase();
        var willaya = data[i].willaya.toLowerCase();

        if (willaya.includes(filterValue)) {
          filtered_Data.push(data[i]);
        }
      }
      return filtered_Data;
    }
  }
};

xhttp.open("GET", "../scripts/data.json", true);
xhttp.send();

// -------------------------------
// -------------------------------
