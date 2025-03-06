jQuery(document).ready(($) => {
  function autocompleteCity(inputId) {
    $(inputId).autocomplete({
      source: (request, response) => {
        $.ajax({
          url: "http://api.geonames.org/searchJSON",
          dataType: "jsonp",
          data: {
            featureClass: "P",
            style: "full",
            maxRows: 12,
            name_startsWith: request.term,
            username: "demo", // Remplacez par votre nom d'utilisateur Geonames
            continent: "EU", // Limite la recherche à l'Europe
          },
          success: (data) => {
            response(
              $.map(data.geonames, (item) => ({
                label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
                value: item.name,
              })),
            )
          },
        })
      },
      minLength: 2,
    })
  }

  autocompleteCity("#lieu-depart")
  autocompleteCity("#lieu-retour")
})

