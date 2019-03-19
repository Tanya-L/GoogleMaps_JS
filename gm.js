$(document).ready(function () {
    $(".city-filter").on("click", function (ev) {
        filterCity = $(this).text();
        updateAddresses();
        $("div.list-group a").removeClass('active');
        $(this).addClass('active');
    });
});

let addresses = [];
let filterCity = "All";

function updateAddresses() {
    $('#nav-tabContent').empty();
    let filtered = addresses.apartments.filter(function (addr) {
        return filterCity == "All" || addr.city == filterCity;
    });
    console.log(filtered);
    for (let f in filtered) {
        let newDiv = $("<div class='card'></div>").html(filtered[f].description + '<br/>' +
            filtered[f].address + "<br/>" + "Bedrooms: " + filtered[f].bedrooms + " / " +
            "Neighborhood: " + filtered[f].neighborhood);
        let price = $("<div class='price'></div>").text(filtered[f].price);
        newDiv.append(price);

        // google map
        newDiv.on("click", function (event) {
            window.open('http://maps.google.com?q=' + filtered[f].address, "_blank");
        });

        // make description in the right side
        $('#nav-tabContent').append(newDiv);
    }
};

$.ajax('https://api.myjson.com/bins/2sadq?pretty=1', {
    success: function (data) {
        addresses = data;
        updateAddresses();
        alert('an error has occurred');
    },
    error: function () {
        alert('an error has occurred');
    }
});