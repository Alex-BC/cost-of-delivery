const myLatLng = { lat: 49.80298, lng: 30.1237 };
const mapOptions = {
  center: myLatLng,
  zoom: 10,
  mapTypeId: "terrain",
};

//create map
const map = new google.maps.Map(
  document.getElementById("googleMap"),
  mapOptions
);
const polygons = [
  {
    id: 1,
    name: "Київ",
    polygon_coords: [
      {
        lat: 50.41336456065911,
        lng: 30.274834782410526,
      },
      {
        lat: 50.487691527544065,
        lng: 30.261101872254276,
      },
      {
        lat: 50.56713572180551,
        lng: 30.359978825379276,
      },
      {
        lat: 50.56015697902436,
        lng: 30.5755855148324,
      },
      {
        lat: 50.54968692697855,
        lng: 30.730767399598026,
      },
      {
        lat: 50.39148146394909,
        lng: 30.722527653504276,
      },
      {
        lat: 50.33716777796403,
        lng: 30.612664372254276,
      },
      {
        lat: 50.32907342756105,
        lng: 30.40199935118932,
      },
    ],
    main_point: {
      lat: 50.423379666714204,
      lng: 30.565465194825936,
    },
    main_price: 250,
    price_per_km: 5,
  },
  {
    id: 2,
    name: "БЦ",
    polygon_coords: [
      {
        lat: 49.82749223753116,
        lng: 30.04261198511439,
      },
      {
        lat: 49.77696970092556,
        lng: 30.05085173120814,
      },
      {
        lat: 49.76543963325659,
        lng: 30.129129319098766,
      },
      {
        lat: 49.769874599270665,
        lng: 30.208780198005016,
      },
      {
        lat: 49.79558940098191,
        lng: 30.21564665308314,
      },
      {
        lat: 49.82837812725975,
        lng: 30.13874235620814,
      },
    ],
    main_point: {
      lat: 49.802981117592346,
      lng: 30.123705715687187,
    },
    main_price: 90,
    price_per_km: 4,
  },
  {
    id: 3,
    name: "Фастів'",
    polygon_coords: [
      {
        lat: 50.121236369142444,
        lng: 29.83503876860146,
      },
      {
        lat: 50.03839719693367,
        lng: 29.83503876860146,
      },
      {
        lat: 50.01898863204859,
        lng: 29.92018281157021,
      },
      {
        lat: 50.07013975025288,
        lng: 29.990220653367086,
      },
      {
        lat: 50.10714619258948,
        lng: 29.99708710844521,
      },
      {
        lat: 50.1344421441868,
        lng: 29.962754833054586,
      },
      {
        lat: 50.13620263888454,
        lng: 29.91194306547646,
      },
    ],
    main_point: {
      lat: 50.07904188790587,
      lng: 29.91401038036094,
    },
    main_price: 200,
    price_per_km: 5,
  },
];
//create a DirectionsService object to use the route method and get a result for our request
const directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
const directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
  //create request
  const request = {
    origin: document.getElementById("from").value,
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  //pass the request to the route method
  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //Get distance and time
      const output = document.querySelector("#output");
      output.innerHTML =
        "<div class='alert-info'>From: " +
        document.getElementById("from").value +
        ".<br />To: " +
        document.getElementById("to").value +
        ".<br /> Driving distance <i class='fas fa-road'></i> : " +
        result.routes[0].legs[0].distance.text +
        ".<br />Duration <i class='fas fa-hourglass-start'></i> : " +
        result.routes[0].legs[0].duration.text +
        ".</div>";

      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in London
      map.setCenter(myLatLng);

      //show error message
      output.innerHTML =
        "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
    }
  });
}

//create autocomplete objects for all inputs
const options = {
  types: ["(cities)"],
};

const input1 = document.getElementById("from");
const autocomplete1 = new google.maps.places.Autocomplete(input1, options);

const input2 = document.getElementById("to");
const autocomplete2 = new google.maps.places.Autocomplete(input2, options);

polygons.forEach(function (item, index, array) {
  const polygon = new google.maps.Polygon({
    paths: item.polygon_coords,
    strokeColor: "blue",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "blue",
    fillOpacity: 0.2,
  });

  new google.maps.Marker({
    position: item.main_point,
    map,
    title: item.name,
  });

  polygon.setMap(map);
});
// console.log(polygons[0]);
