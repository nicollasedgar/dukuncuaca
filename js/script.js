


function initMap() {

    var options = {
        zoom : 10,
        center:{lat:-7.976278, lng:112.633562}
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

    var marker = new google.maps.Marker({
        position:{lat:-7.976278, lng:112.633562},
        map:map
    });

    var infoWindow = new google.maps.InfoWindow({
        content:`
                <div id="content"> 
                <div id="siteNotice"> 
                    <h5 id="firstHeading" class="firstHeading">Today is a good day?</h5>
                </div> 
                <div id="bodyContent"
                    <p>Find Your position. Maybe You have to bring your umbrella</p>
                </div> 
                </div>
        `
    })

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    })
}

function searchLocation() {
    $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            type: 'get',
            datatype: 'json',
            data: {
                'appid' : 'bfcbc78dbf662d59ef3be3b42c292b97',
                'units' : 'metric',
                'q' : $('#input-search').val()
            },
            success : function(e) {
                if(e.weather.id != 0){
                    // const coordlat = e.coord.lat;
                    // const coordlon = e.coord.lon;
                    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + $('#input-search').val() + '&appid=bfcbc78dbf662d59ef3be3b42c292b97&units=metric')
                    .then(res => res.json())
                    .then(data => {
                        console.log(data.coord);
                        let cordlat = new google.maps.LatLng(data.coord.lat, data.coord.lon);
                        // let codlon = new google.maps.lng(data.coord.lon);
                        // let cordlon = data.coord.lon;
                        var options = {
                            zoom : 10,
                            center:cordlat
                        }

                        var map = new google.maps.Map(document.getElementById('map'), options);

                        var marker = new google.maps.Marker({
                            position:cordlat,
                            map:map
                        });

                        var infoWindow = new google.maps.InfoWindow({
                            content:`
                                    <div id="content"> 
                                        <div id="siteNotice"> 
                                            <h1 id="firstHeading" class="firstHeading">`+ data.name +`</h1>
                                        </div> 
                                            <div id="bodyContent"
                                            <p>Weather : <b>`+ data.weather[0].main +`</b></p>
                                            <p>Temp : `+ data.main.temp +` &#186;Celcius</p>
                                            <p>Wind speed : `+ data.wind.speed +` m/s</p>
                                            <p>Pressure : `+ data.main.pressure +` hPa</p>
                                            <p>Visibility : `+ data.visibility +` m</p>
                                        </div> 
                                    </div>
                            `
                        })

                        marker.addListener('click', function () {
                            infoWindow.open(map, marker);
                        })
                    })
                    // initMap(cordlat, cordlon);

                }else{
                    $('#map').html(`
                    <div class="col">
                        <h1>Lokasi tidak ditemukan!</h1>
                    </div>
                    `)
                }
            },
            error : function (e) {
                 $('#map').html(`
                    <div class="col">
                        <h1>Lokasi tidak ditemukan!</h1>
                    </div>
                 `)
            }
        });
}

$('#btn-search').on('click', function() {
    searchLocation();
});

$('#input-search').on('keyup', function(e) {
    if(e.keyCode === 13){
        searchLocation();
    }
});

function initIndex() {

    var options = {
        zoom : 10,
        center:{lat:-7.976278, lng:112.633562}
    }

    var map = new google.maps.Map(document.getElementById('index'), options);

    var marker = new google.maps.Marker({
        position:{lat:-7.976278, lng:112.633562},
        map:map
    });

    var infoWindow = new google.maps.InfoWindow({
        content:`
                <div id="content"> 
                <div id="siteNotice"> 
                    <h5 id="firstHeading" class="firstHeading">Today is a good day?</h5>
                </div> 
                <div id="bodyContent"
                    <p>Find Your position. Maybe You have to bring your umbrella</p>
                </div> 
                </div>
        `
    })
}