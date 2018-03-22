/* global google */
googleMap.$inject = ['mapService'];
function googleMap(mapService) {

  return {
    restrict: 'E',
    template: '<div class="google-map"></div>',
    replace: true,
    scope: {
      center: '=',
      zoom: '=',
      results: '=?'
    },
    link($scope, $element) {
      //create new map
      const map = new google.maps.Map($element[0], {
        center: $scope.center,
        zoom: $scope.zoom, //zoom not working
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#6195a0"
              }
          ]
      },
      {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "lightness": "0"
              },
              {
                  "saturation": "0"
              },
              {
                  "color": "#f5f5f2"
              },
              {
                  "gamma": "1"
              }
          ]
      },
      {
          "featureType": "landscape.man_made",
          "elementType": "all",
          "stylers": [
              {
                  "lightness": "-3"
              },
              {
                  "gamma": "1.00"
              }
          ]
      },
      {
          "featureType": "landscape.natural.terrain",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#bae5ce"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#fac9a9"
              },
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "labels.text",
          "stylers": [
              {
                  "color": "#4e4e4e"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#787878"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "transit.station.airport",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "hue": "#0a00ff"
              },
              {
                  "saturation": "-77"
              },
              {
                  "gamma": "0.57"
              },
              {
                  "lightness": "0"
              }
          ]
      },
      {
          "featureType": "transit.station.rail",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#43321e"
              }
          ]
      },
      {
          "featureType": "transit.station.rail",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "hue": "#ff6c00"
              },
              {
                  "lightness": "4"
              },
              {
                  "gamma": "0.75"
              },
              {
                  "saturation": "-68"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#eaf6f8"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#c7eced"
              }
          ]
      },
      {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                  "lightness": "-49"
              },
              {
                  "saturation": "-53"
              },
              {
                  "gamma": "0.79"
              }
          ]
      }
    ]
      });

      let markers = [];

      mapService.set(map);
      let infoWindow = new google.maps.InfoWindow();

      function createMarkers() {
        markers.forEach(marker => marker.setMap(null));

        console.log('scope results', $scope.results);

        markers = $scope.results.map(place => {
          const url = place.photos ? place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) : 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/house-icon.png';

          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: {
              url: url,
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(45, 45)
            },
            title: place.name,
            optimized: false
          });

          // add mouseover event to each marker to display info window
          addInfoWindows(marker, place);

          return marker;
        });
      }

      function addInfoWindows(marker, place) {
        google.maps.event.addListener(marker, 'mouseover', function() {
          const html = `<b>${place.name}</b> <br/>${place.vicinity}<br/>Rating:${'🤩'.repeat(Math.floor(place.rating))}`;
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
        });
      }

      // styling of the markers
      var myoverlay = new google.maps.OverlayView();
      myoverlay.draw = function () {
        //this assigns an id to the markerlayer Pane, so it can be referenced by CSS
        this.getPanes().markerLayer.id='markerLayer';
      };
      myoverlay.setMap(map);

      //set a watch on center change
      $scope.$watch('center', () => map.setCenter($scope.center), true);
      $scope.$watch('results', createMarkers, true);
    }
  };
}

export default googleMap;
