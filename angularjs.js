// Angularjs
'use strict'
var app = angular.module('myApp', ['ngAnimate'])
app.constant('moment', moment)
app.controller('formControl', function ($scope, $http, $filter, moment) {
  var ipapi
  var validation
  var herelat
  var herelon
  var latitude
  var longitude
  var nextpage
  var nextpage1
  var firstpageresults
  var nextpageresults
  var lastpageresults
  var setpage = 0
  var totalpage = 1
  var placeinfo
  var numberth = -1
  var marker
  var gooreviewslist
  var yelpreviewslist
  var nearbylength = 0
  var MyStorage = window.sessionStorage
  var locating
  var locatingName
  var currentpage = 1
  var resultstab = true
  var favortab = false
  var yelpempty = false
  var twitterurl

  $http({
    method: 'GET',
    url: 'http://ip-api.com/json'
  }).then(function (responsehere) {
    console.log(responsehere)
    herelat = responsehere.data.lat
    herelon = responsehere.data.lon
    ipapi = true
  }, function (errorhere) {
    $scope.error = true
    $scope.resultserror = 'Failed to search results.'
  })

  $scope.categories = {
    'Default': 'Default',
    'Airport': 'Airport',
    'Amusement Park': 'Amusement_Park',
    'Aquarium': 'Aquarium',
    'Art Gallery': 'Art_Gallery',
    'Bakery': 'Bakery',
    'Bar': 'Bar',
    'Beauty Salon': 'Beauty_Salon',
    'Bowling Alley': 'Bowling_Alley',
    'Bus Station': 'Bus_Station',
    'Cafe': 'Cafe',
    'Campground': 'Campground',
    'Car Rental': 'Car_Rental',
    'Casino': 'Casino',
    'Lodging': 'Lodging',
    'Movie Theater': 'Movie_Theater',
    'Museum': 'Museum',
    'Night Club': 'Night_Club',
    'Park': 'Park',
    'Parking': 'Parking',
    'Restaurant': 'Restaurant',
    'Shopping Mall': 'Shopping_Mall',
    'Stadium': 'Stadium',
    'Subway Station': 'Subway_Station',
    'Taxi Stand': 'Taxi_Stand',
    'Train Station': 'Train_Station',
    'Transit Station': 'Transit_Station',
    'Travel Agency': 'Travel_Agency',
    'Zoo': 'Zoo'
  }

  $scope.modes = {
    'Driving': 'DRIVING',
    'Bicycling': 'BICYCLING',
    'Transit': 'TRANSIT',
    'Walking': 'WALKING'
  }

  $scope.rbtn = 'btn btn-primary'
  $scope.fbtn = 'btn btn-link'

  $scope.from = function () {
    if ($scope.myVar === 'optionone') {
      $scope.switchhere = true
      $scope.placewarn = false
      $scope.locationinput = 'Enter a location'
      document.getElementById('autocomplete').style.border = '1px solid #CED4DA'
    }else if ($scope.myVar === 'optiontwo') {
      $scope.switchhere = false
    }
  }

  $scope.KeyUp = function () {
    var keyword = $scope.keyword
    var validation = false
    for (var i = 0; i < keyword.length; i++) {
      if (keyword[i] != '' && keyword[i] != ' ') {
        validation = true
      }
    }
    if (validation == false) {
      $scope.warning = true
      document.getElementById('keywordID').style.border = '2px solid #FF1B1C'
    }else {
      $scope.warning = false
      document.getElementById('keywordID').style.border = '1px solid #CED4DA'
    }
    if (validation === true && ipapi === true) {
      $scope.switch = false
    }else {
      $scope.switch = true
    }
  }

  $scope.PlaceKeyUp = function () {
    var enterplace = document.getElementById('autocomplete').value
    var verify = false
    for (var i = 0; i < enterplace.length; i++) {
      if (enterplace[i] != '' && enterplace[i] != ' ') {
        verify = true
      }
    }
    if (verify == false) {
      $scope.placewarn = true
      document.getElementById('autocomplete').style.border = '2px solid #FF1B1C'
    }else {
      $scope.placewarn = false
      document.getElementById('autocomplete').style.border = '1px solid #CED4DA'
    }
  }

  $scope.formReset = function () {
    var master = ''
    $scope.keyword = angular.copy(master)
    $scope.tablelist = false
    $scope.showtable = true
    $scope.showdetails = true
    $scope.switch = false
    $scope.warning = false
    $scope.placewarn = false
    $scope.selectedcategory = $scope.categories.Default
    $scope.distance = '10'
    $scope.switchhere = true
    $scope.myVar = 'optionone'
    $scope.locationinput = 'Enter a location'
    $scope.preswitch = false
    $scope.nextswitch = false
    $scope.favorpre = false
    $scope.favornext = false
    $scope.detailswitch = true
    $scope.addressswitch = false
    $scope.phoneswitch = false
    $scope.levelswitch = false
    $scope.ratingswitch = false
    $scope.pageswitch = false
    $scope.websiteswitch = false
    $scope.hourswitch = false
    $scope.showphoto = true
    $scope.showreview = true
    $scope.showempty = false
    $scope.showphotoempty = false
    $scope.showreviewempty = false
    setpage = 0
    totalpage = 1
    currentpage = 1
    resultstab = true
    favortab = false
    yelpempty = false
    nearbylength = 0
    $scope.rbtn = 'btn btn-primary'
    $scope.fbtn = 'btn btn-link'
    document.getElementById('keywordID').style.border = '1px solid #CED4DA'
    document.getElementById('autocomplete').style.border = '1px solid #CED4DA'
  }

  $scope.formSearch = function () {
    $scope.tablelist = false
    $scope.searchtable = false
    $scope.bar = true
    resultstab = true
    favortab = false
    $scope.rbtn = 'btn btn-primary'
    $scope.fbtn = 'btn btn-link'
    if ($scope.distance === undefined) {
      $scope.distance = 10
    }
    var meters = $scope.distance * 1609.344
    var urltransfer
    if ($scope.myVar === 'optionone') {
      urltransfer = 'http://xinyuw.us-east-2.elasticbeanstalk.com/?search=true&latitude=' + encodeURIComponent(herelat)
      + '&longitude=' + encodeURIComponent(herelon)
      + '&keyword=' + encodeURIComponent($scope.keyword)
      + '&category=' + encodeURIComponent($scope.selectedcategory)
      + '&distance=' + encodeURIComponent(meters)
    }else {
      urltransfer = 'http://xinyuw.us-east-2.elasticbeanstalk.com/?search=true&inputaddress=true&keyword=' + encodeURIComponent($scope.keyword)
      + '&category=' + encodeURIComponent($scope.selectedcategory)
      + '&distance=' + encodeURIComponent(meters)
      + '&address=' + encodeURIComponent($scope.locationinput)
    }
    $http.get(urltransfer)
      .then(function (responsenearby) {
        latitude = responsenearby.data.latitude
        longitude = responsenearby.data.longitude
        firstpageresults = responsenearby.data.nearbyresults
        nextpage = responsenearby.data.nextpage
        nearbylength = responsenearby.data.nearbyresults.length
        if (nearbylength == 0) {
          $scope.showempty = true
          $scope.showtable = true
          $scope.showdetails = true
          $scope.resultsempty = 'No Records.'
        }else {
          $scope.bar = false
          $scope.showtable = false
          $scope.showdetails = true
          $scope.showempty = false
          setpage = 1
          console.log('setpage')
          console.log(setpage)
          if (nextpage == 'none') {
            $scope.nextswitch = false
          }else {
            $scope.nextswitch = true
            totalpage = 2
            console.log('totalpage')
            console.log(totalpage)
          }
          $scope.nearbyresults = firstpageresults
          for (var i = 0; i < $scope.nearbyresults.length; i++) {
            $scope.nearbyresults[i].starstyle = 'fa fa-star-o'
            $scope.nearbyresults[i].highlight = 'highlight'
          }
          $scope.starstyle = 'fa fa-star-o'
        }
      }, function (reserror) {
        $scope.error = true
        $scope.resultserror = 'Failed to get search results.'
      })
    if ($scope.myVar === 'optionone') {
      $scope.inputfrom = 'Your location'
    }else {
      $scope.inputfrom = document.getElementById('autocomplete').value
    }
  }

  $scope.NextPage = function () {
    $scope.showtable = false
    $scope.favorpre = false
    $scope.favornext = false
    if (setpage == 1 && totalpage == 2) {
      var nextpageurl = 'http://xinyuw.us-east-2.elasticbeanstalk.com/?next=true&pagetoken=' + encodeURIComponent(nextpage)
      $http.get(nextpageurl)
        .then(function (responsenext) {
          nextpageresults = responsenext.data.nextpageresults
          nextpage1 = responsenext.data.nextpage
          setpage = 2
          console.log('setpage')
          console.log(setpage)
          if (nextpage1 == 'none') {
            $scope.nextswitch = false
          }else {
            $scope.nextswitch = true
            totalpage = 3
            console.log('totalpage')
            console.log(totalpage)
          }
          $scope.nearbyresults = nextpageresults
          for (var i = 0; i < $scope.nearbyresults.length; i++) {
            $scope.nearbyresults[i].starstyle = 'fa fa-star-o'
          }
          $scope.preswitch = true
        }, function (nexterror) {
          $scope.error = true
          $scope.resultserror = 'Failed to get search results.'
        })
    }else if (setpage == 2 && totalpage == 3) {
      var lastpageurl = 'http://xinyuw.us-east-2.elasticbeanstalk.com/?next=true&pagetoken=' + encodeURIComponent(nextpage1)
      $http.get(lastpageurl)
        .then(function (responselast) {
          lastpageresults = responselast.data.nextpageresults
          setpage = 3
          console.log('setpage')
          console.log(setpage)
          $scope.nearbyresults = lastpageresults
          for (var i = 0; i < $scope.nearbyresults.length; i++) {
            $scope.nearbyresults[i].starstyle = 'fa fa-star-o'
          }
          $scope.preswitch = true
          $scope.nextswitch = false
        }, function (lasterror) {
          $scope.error = true
          $scope.resultserror = 'Failed to get search results.'
        })
    }
  }

  $scope.PreviousPage = function () {
    $scope.favorpre = false
    $scope.favornext = false
    $scope.showtable = false
    if (setpage == 2 && totalpage == 3) {
      $scope.nearbyresults = firstpageresults
      setpage = 1
      totalpage = 2
      $scope.preswitch = false
      $scope.nextswitch = true
    }else if (setpage == 3) {
      $scope.nearbyresults = nextpageresults
      setpage = 2
      totalpage = 3
      $scope.nextswitch = true
      $scope.preswitch = true
    }
  }

  $scope.RightDetails = function (i) {
    $scope.detailswitch = false
    $scope.tablelist = true
    $scope.showdetails = false
    $scope.showtable = true
    $('#nav-tab a[href="#nav-info"]').tab('show')
    numberth = i
    if ($scope.nearbyresults[i].starstyle == 'fa fa-trash') {
      $scope.starstyle = 'fa fa-star btn-yellow'
    }else {
      $scope.starstyle = $scope.nearbyresults[i].starstyle
    }
    $scope.titlename = $scope.nearbyresults[i].name
    var placeid = $scope.nearbyresults[i].place_id
    var map = new google.maps.Map(document.getElementById('map'))
    var service = new google.maps.places.PlacesService(map)
    service.getDetails({
      placeId: placeid
    }, function (place, status) {
      $scope.$apply(function () {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          placeinfo = place
          console.log(placeinfo)
          if (place.hasOwnProperty('name')) {
            var twittername = place.name
          }
          if (place.hasOwnProperty('formatted_address')) {
            $scope.addressswitch = true
            $scope.formatted_address = place.formatted_address
            var twitteraddress = place.formatted_address
          }
          if (place.hasOwnProperty('international_phone_number')) {
            $scope.phoneswitch = true
            $scope.phone_number = place.international_phone_number
          }
          if (place.hasOwnProperty('price_level')) {
            $scope.levelswitch = true
            var levelstring = ''
            for (var i = 0; i < place.price_level; i++) {
              levelstring += '$'
            }
            $scope.pricelevel = levelstring
          }
          if (place.hasOwnProperty('rating')) {
            $scope.ratingswitch = true
            $scope.rating = place.rating
            var ratingstar = Math.ceil(place.rating)
            var xingxing = ''
            for (var i = 0; i < ratingstar; i++) {
              xingxing += '★'
            }
            $scope.xingxing = xingxing
            var startotal = 5
            var starwidth = parseFloat(place.rating) / startotal * 100
            starwidth = starwidth + '%'
            $scope.the_width = starwidth
          }
          if (place.hasOwnProperty('url')) {
            $scope.pageswitch = true
            $scope.google_page = place.url
          }
          if (place.hasOwnProperty('website')) {
            $scope.websiteswitch = true
            $scope.website = place.website
          }
          if (place.hasOwnProperty('opening_hours')) {
            $scope.hourswitch = true
            var openarray = place.opening_hours.weekday_text
            var exopenarray = [ ]
              for (var i = 0; i < openarray.length; i++) {
                var maohao = openarray[i].indexOf(':')
                var openhour = openarray[i].substring(maohao + 1)
                exopenarray[i] = openhour.trim()
              }
              if (place.opening_hours.open_now) {
                var myDate = new Date()
                var weekday = myDate.getDay()
                var showday = (weekday + 6) % 7
                var openday = exopenarray[showday]
                var opentime = 'Open now: '
                opentime += openday
                $scope.open_hour = opentime
              }else {
                var closetime = 'Closed '
                $scope.open_hour = closetime
              }
              if (place.hasOwnProperty('utc_offset')) {
                var utcoffset = place.utc_offset
                var localtime = new moment().utcOffset(utcoffset)
                var localweekday = localtime.day()
                if (localweekday == 0) {
                  var dayonemao = openarray[6].indexOf(':')
                  var dayoneopen = openarray[6].substring(0, dayonemao)
                  $scope.dayfirstopen = dayoneopen.trim()
                  var dayonehour = openarray[6].substring(dayonemao + 1)
                  $scope.dayfirsthour = dayonehour.trim()
                }else {
                  var dayonemao = openarray[localweekday - 1].indexOf(':')
                  var dayoneopen = openarray[localweekday - 1].substring(0, dayonemao)
                  $scope.dayfirstopen = dayoneopen.trim()
                  var dayonehour = openarray[localweekday - 1].substring(dayonemao + 1)
                  $scope.dayfirsthour = dayonehour.trim()
                }
                var localarray = [ ]
                  for (var i = localweekday; i < openarray.length; i++) {
                    var j = i - localweekday
                    localarray[j] = openarray[i]
                  }
                  var firstlen = localarray.length
                  for (var i = 0; i < localweekday - 1; i++) {
                    var j = i + firstlen
                    localarray[j] = openarray[i]
                  }
                  var exlocalday = [ ]
                    var exlocalhour = [ ]
                      for (var i = 0; i < localarray.length; i++) {
                        var exdaymao = localarray[i].indexOf(':')
                        var exday = localarray[i].substring(0, exdaymao)
                        exlocalday[i] = exday.trim()
                        var exhour = localarray[i].substring(exdaymao + 1)
                        exlocalhour[i] = exhour.trim()
                      }
                      $scope.localday = exlocalday
                      $scope.localhour = exlocalhour
                    }
                  }
                  if (place.hasOwnProperty('website')) {
                    var weburl = place.website
                  }else if (place.hasOwnProperty('url')) {
                    var weburl = place.url
                  }
                  var text = ''
                  text += 'Check out ' + twittername + ' located at ' + twitteraddress + '. Website: '
                  twitterurl = 'https://twitter.com/intent/tweet?text='
                    + encodeURIComponent(text).replace(/'/g, '%27')
                    + '&url=' + encodeURIComponent(weburl) + '&hashtags=TravelAndEntertainmentSearch'
                }
              })
            })
          }

          $scope.Mywindow = function () {
            window.open(twitterurl, '', 'width=200,height=100')
          }

          $scope.ListToDetails = function () {
            if (resultstab) {
              $scope.tablelist = false
              console.log('$scope.tablelist')
              console.log($scope.tablelist)
              $scope.showtable = false
              $scope.showdetails = true
              $scope.ResultsList()
            }else if (favortab) {
              $scope.tablelist = false
              $scope.showtable = false
              $scope.showdetails = true
              $scope.FavoriteList()
            }
          }

          $scope.DetailsToList = function () {
            $('#nav-tab a[href="#nav-info"]').tab('show')
            $scope.showtable = true
            $scope.showdetails = false
          }

          $scope.createInfo = function () {
            $scope.showphotoempty = false
          }

          $scope.createPhotoMarker = function () {
            if (placeinfo.hasOwnProperty('photos')) {
              $scope.showphoto = true
              $scope.showphotoempty = false
              var photos = placeinfo.photos
              var photosurl = [ ]
                var colfirst = [ ]
                  var colsecond = [ ]
                    var colthird = [ ]
                      var collast = [ ]
                        for (var i = 0; i < photos.length; i++) {
                          var height = photos[i].height
                          var width = photos[i].width
                          photosurl[i] = photos[i].getUrl({'maxWidth': height, 'maxHeight': width})
                        }
                        for (var i = 0; i < photosurl.length; i++) {
                          if (i % 4 == 0) {
                            colfirst.push(photosurl[i])
                          }else if (i % 4 == 1) {
                            colsecond.push(photosurl[i])
                          }else if (i % 4 == 2) {
                            colthird.push(photosurl[i])
                          }else {
                            collast.push(photosurl[i])
                          }
                        }
                        $scope.colone = colfirst
                        $scope.coltwo = colsecond
                        $scope.colthree = colthird
                        $scope.colfour = collast
                      }else {
                        $scope.showphoto = false
                        $scope.showphotoempty = true
                        $scope.photoempty = 'No records.'
                      }
                    }

                    var directionsDisplay
                    var directionsService
                    $scope.createMaps = function () {
                      $scope.showphotoempty = false
                      var nameTo = $scope.nearbyresults[numberth].name
                      var addressTo = placeinfo.formatted_address
                      $scope.inputto = nameTo + ', ' + addressTo
                      directionsDisplay = new google.maps.DirectionsRenderer
                      directionsService = new google.maps.DirectionsService
                      var destination = $scope.nearbyresults[numberth].geometry.location
                      var map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 14,
                        center: destination
                      })
                      marker = new google.maps.Marker({
                        position: destination,
                        map: map
                      })
                      directionsDisplay.setMap(map)
                    }

                    function calculateAndDisplayRoute (directionsService, directionsDisplay, start) {
                      var end = $scope.nearbyresults[numberth].geometry.location
                      var mode = $scope.inputmode
                      directionsService.route({
                        origin: start,
                        destination: end,
                        travelMode: mode,
                        provideRouteAlternatives: true
                      }, function (response, status) {
                        if (status == 'OK') {
                          marker.setMap(null)
                          directionsDisplay.setDirections(response)
                          directionsDisplay.setPanel(document.getElementById('right-panel'))
                        } else {
                          window.alert('Directions request failed due to ' + status)
                        }
                      })
                    }

                    $scope.KeyUpdir = function () {
                      var start_pos = document.getElementById('inputFrom').value
                      var valid = false
                      for (var i = 0; i < start_pos.length; i++) {
                        if (start_pos[i] != '' && start_pos[i] != ' ') {
                          valid = true
                        }
                      }
                      if (valid == false) {
                        $scope.getdir = true
                      }else {
                        $scope.getdir = false
                      }
                    }

                    $scope.GetDirection = function () {
                      var start_pos = document.getElementById('inputFrom').value
                      console.log(start_pos)
                      var start
                      if (start_pos.indexOf('Your location') >= 0 || start_pos.indexOf('My location') >= 0) {
                        start = new google.maps.LatLng(latitude, longitude)
                        calculateAndDisplayRoute(directionsService, directionsDisplay, start)
                      }else {
                        var urlstart_pos = 'http://xinyuw.us-east-2.elasticbeanstalk.com/?getdirection=true&placename=' + encodeURIComponent(start_pos)
                        $http.get(urlstart_pos)
                          .then(function (respos) {
                            var startlat = respos.data.startlat
                            var startlng = respos.data.startlng
                            start = new google.maps.LatLng(startlat, startlng)
                            calculateAndDisplayRoute(directionsService, directionsDisplay, start)
                          })
                      }
                    }

                    $scope.StreetView = function () {
                      var destination = $scope.nearbyresults[numberth].geometry.location
                      var map = new google.maps.Map(document.getElementById('map'), {
                        center: destination,
                        zoom: 14
                      })
                      if ($scope.streetswitch === 'pegman') {
                        $scope.streetswitch = 'digitalmap'
                        $scope.mapimg = 'http://cs-server.usc.edu:45678/hw/hw8/images/Map.png'
                        var panorama = new google.maps.StreetViewPanorama(
                          document.getElementById('map'), {
                            position: destination,
                            pov: {
                              heading: 34,
                              pitch: 10
                            }
                          })
                        map.setStreetView(panorama)
                      }else {
                        $scope.streetswitch = 'pegman'
                        $scope.mapimg = 'http://cs-server.usc.edu:45678/hw/hw8/images/Pegman.png'
                        var directionsDisplay = new google.maps.DirectionsRenderer
                        var marker = new google.maps.Marker({
                          position: destination,
                          map: map
                        })
                        directionsDisplay.setMap(map)
                      }
                    }

                    $scope.createReviews = function () {
                      $scope.showphotoempty = false
                      if (placeinfo.hasOwnProperty('reviews')) {
                        $scope.showreview = true
                        $scope.showreviewempty = false
                        var reviewsresult = placeinfo.reviews
                        var timelist = [ ]
                          var starlist = [ ]
                            gooreviewslist = [ ]
                              for (var i = 0; i < reviewsresult.length; i++) {
                                var time = reviewsresult[i].time
                                var detailtime = new Date(time * 1000)
                                detailtime = $filter('date')(detailtime, 'yyyy-MM-dd HH:mm:ss')
                                timelist[i] = detailtime
                              }
                              for (var i = 0;i < reviewsresult.length; i++) {
                                var star = reviewsresult[i].rating
                                var starstring = ''
                                for (var j = 0; j < star; j++) {
                                  starstring += '★'
                                }
                                starlist[i] = starstring
                              }
                              for (var i = 0; i < reviewsresult.length; i++) {
                                gooreviewslist[i] = {
                                  'author_url': reviewsresult[i].author_url,
                                  'profile_photo_url': reviewsresult[i].profile_photo_url,
                                  'author_name': reviewsresult[i].author_name,
                                  'star': starlist[i],
                                  'detailtime': timelist[i],
                                  'text': reviewsresult[i].text
                                }
                              }
                              $scope.reviewslist = gooreviewslist
                            }else {
                              $scope.showreview = false
                              $scope.showreviewempty = true
                              $scope.emptyreview = 'No records.'
                            }

                            if (placeinfo.hasOwnProperty('formatted_address')) {
                              if (placeinfo.hasOwnProperty('name')) {
                                var name = placeinfo.name
                              }else {
                                var name = ''
                              }
                              var formataddress = placeinfo.formatted_address
                              var addsplit = formataddress.split(',')
                              for (var i = 0; i < addsplit.length; i++) {
                                addsplit[i] = addsplit[i].trim()
                              }
                              if (addsplit.length > 0) {
                                var address1 = addsplit[0]
                              }else {
                                var address1 = ''
                              }
                              if (addsplit.length > 1) {
                                var city = addsplit[1]
                              }else {
                                var city = ''
                              }
                              var splitlen = addsplit.length
                              if (addsplit.length > 0) {
                                var splitlast = addsplit[splitlen - 1]
                                var addsplittwice = splitlast.split(' ')
                                if (addsplittwice.length > 0) {
                                  var state = addsplittwice[0]
                                }
                              }else {
                                var state = ''
                              }
                              var yelpmatchurl = 'http://xinyuw.us-east-2.elasticbeanstalk.com/?&yelp=true&name=' + encodeURIComponent(name)
                                + '&address1=' + encodeURIComponent(address1)
                                + '&city=' + encodeURIComponent(city)
                                + '&state=' + encodeURIComponent(state)
                                + '&country=US'
                              $http.get(yelpmatchurl)
                                .then(function (responseyelp) {
                                  var yelpreviews = responseyelp.data
                                  if (yelpreviews != 'No Match') {
                                    var yelpstarlist = [ ]
                                      yelpreviewslist = [ ]
                                        for (var i = 0; i < yelpreviews.length; i++) {
                                          var yelpstar = yelpreviews[i].rating
                                          var yelpstarstring = ''
                                          for (var j = 0; j < yelpstar; j++) {
                                            yelpstarstring += '★'
                                          }
                                          yelpstarlist[i] = yelpstarstring
                                        }
                                        for (var i = 0; i < yelpreviews.length; i++) {
                                          yelpreviewslist[i] = {
                                            'author_url': yelpreviews[i].url,
                                            'profile_photo_url': yelpreviews[i].user.image_url,
                                            'author_name': yelpreviews[i].user.name,
                                            'star': yelpstarlist[i],
                                            'detailtime': yelpreviews[i].time_created,
                                            'text': yelpreviews[i].text
                                          }
                                        }
                                      }else {
                                        yelpempty = true
                                      }
                                    })
                                }else {
                                  yelpempty = true
                                }
                              }

                              $scope.GoogleReviews = function () {
                                $scope.reviewtype = 'Google Reviews'
                                $scope.orderlist = 'Default Order'
                                $scope.createReviews()
                              }

                              $scope.YelpReviews = function () {
                                $scope.reviewtype = 'Yelp Reviews'
                                $scope.orderlist = 'Default Order'
                                if (yelpempty) {
                                  $scope.showreview = false
                                  $scope.showreviewempty = true
                                  $scope.emptyreview = 'No records.'
                                }else {
                                  $scope.showreview = true
                                  $scope.showreviewempty = false
                                  $scope.reviewslist = yelpreviewslist
                                }
                              }

                              $scope.DefaultOrder = function () {
                                $scope.orderlist = 'Default Order'
                                $scope.ordertype = 'index'
                              }

                              $scope.HRating = function () {
                                $scope.orderlist = 'Highest Rating'
                                $scope.ordertype = '-star'
                              }

                              $scope.LRating = function () {
                                $scope.orderlist = 'Lowest Rating'
                                $scope.ordertype = 'star'
                              }

                              $scope.MostRecent = function () {
                                $scope.orderlist = 'Most Recent'
                                $scope.ordertype = '-detailtime'
                              }

                              $scope.LeastRecent = function () {
                                $scope.orderlist = 'Least Recent'
                                $scope.ordertype = 'detailtime'
                              }

                              $scope.LightStar = function (num) {
                                var placekey = $scope.nearbyresults[num].place_id
                                if ($scope.nearbyresults[num].starstyle == 'fa fa-star btn-yellow') {
                                  $scope.nearbyresults[num].starstyle = 'fa fa-star-o'
                                  $scope.starstyle = 'fa fa-star-o'
                                  for (var i = 0; i < MyStorage.length; i++) {
                                    var keyith = MyStorage.key(i)
                                    if (keyith.indexOf(placekey) > -1) {
                                      MyStorage.removeItem(keyith)
                                    }
                                  }
                                }else if ($scope.nearbyresults[num].starstyle == 'fa fa-star-o') {
                                  $scope.nearbyresults[num].starstyle = 'fa fa-star btn-yellow'
                                  $scope.starstyle = 'fa fa-star btn-yellow'
                                  var double = false
                                  for (var i = 0; i < MyStorage.length; i++) {
                                    var keyith = MyStorage.key(i)
                                    if (keyith.indexOf(placekey) > -1) {
                                      double = true
                                    }
                                  }
                                  if (double == false) {
                                    var tmpdate = new Date()
                                    var favorkey = tmpdate.getTime() + placekey
                                    MyStorage.setItem(favorkey, JSON.stringify($scope.nearbyresults[num]))
                                  }
                                }else if ($scope.nearbyresults[num].starstyle == 'fa fa-trash') {
                                  for (var i = 0; i < MyStorage.length; i++) {
                                    var keyith = MyStorage.key(i)
                                    if (keyith.indexOf(placekey) > -1) {
                                      MyStorage.removeItem(keyith)
                                    }
                                  }
                                  var findstar = false
                                  if (setpage == 0) {
                                    nearbylength = 0
                                  }else if (setpage == 1) {
                                    for (var i = 0; i < firstpageresults.length; i++) {
                                      if (firstpageresults[i].place_id.indexOf(placekey) > -1) {
                                        firstpageresults[i].starstyle = 'fa fa-star-o'
                                        $scope.starstyle = 'fa fa-star-o'
                                      }
                                    }
                                  }else if (setpage == 2) {
                                    for (var i = 0; i < firstpageresults.length; i++) {
                                      if (firstpageresults[i].place_id.indexOf(placekey) > -1) {
                                        firstpageresults[i].starstyle = 'fa fa-star-o'
                                        $scope.starstyle = 'fa fa-star-o'
                                        findstar = true
                                      }
                                    }
                                    if (findstar == false) {
                                      for (var j = 0; j < nextpageresults.length; j++) {
                                        if (nextpageresults[j].place_id.indexOf(placekey) > -1) {
                                          nextpageresults[j].starstyle = 'fa fa-star-o'
                                          $scope.starstyle = 'fa fa-star-o'
                                        }
                                      }
                                    }
                                  }else if (setpage == 3) {
                                    for (var i = 0; i < firstpageresults.length; i++) {
                                      if (firstpageresults[i].place_id.indexOf(placekey) > -1) {
                                        firstpageresults[i].starstyle = 'fa fa-star-o'
                                        $scope.starstyle = 'fa fa-star-o'
                                        findstar = true
                                      }
                                    }
                                    if (findstar == false) {
                                      for (var j = 0; j < nextpageresults.length; j++) {
                                        if (nextpageresults[j].place_id.indexOf(placekey) > -1) {
                                          nextpageresults[j].starstyle = 'fa fa-star-o'
                                          $scope.starstyle = 'fa fa-star-o'
                                          findstar = true
                                        }
                                      }
                                    }
                                    if (findstar == false) {
                                      for (var k = 0; k < lastpageresults.length; k++) {
                                        if (lastpageresults[k].place_id.indexOf(placekey) > -1) {
                                          lastpageresults[k].starstyle = 'fa fa-star-o'
                                          $scope.starstyle = 'fa fa-star-o'
                                          findstar = true
                                        }
                                      }
                                    }
                                  }
                                  $scope.FavoriteList()
                                }
                              }

                              $scope.LightStarDetail = function () {
                                var placekey = $scope.nearbyresults[numberth].place_id
                                if ($scope.starstyle == 'fa fa-star btn-yellow') {
                                  $scope.starstyle = 'fa fa-star-o'
                                  $scope.nearbyresults[numberth].starstyle = 'fa fa-star-o'
                                  for (var i = 0; i < MyStorage.length; i++) {
                                    var keyith = MyStorage.key(i)
                                    if (keyith.indexOf(placekey) > -1) {
                                      MyStorage.removeItem(keyith)
                                    }
                                  }
                                }else if ($scope.starstyle == 'fa fa-star-o') {
                                  $scope.starstyle = 'fa fa-star btn-yellow'
                                  $scope.nearbyresults[numberth].starstyle = 'fa fa-star btn-yellow'
                                  var double = false
                                  for (var i = 0; i < MyStorage.length; i++) {
                                    var keyith = MyStorage.key(i)
                                    if (keyith.indexOf(placekey) > -1) {
                                      double = true
                                    }
                                  }
                                  console.log('double')
                                  console.log(double)
                                  if (double == false) {
                                    var tmpdate = new Date()
                                    var favorkey = tmpdate.getTime() + placekey
                                    MyStorage.setItem(favorkey, JSON.stringify($scope.nearbyresults[numberth]))
                                  }
                                }
                              }

                              $scope.FavoriteList = function () {
                                $scope.rbtn = 'btn btn-link'
                                $scope.fbtn = 'btn btn-primary'
                                favortab = true
                                resultstab = false
                                $scope.nextswitch = false
                                $scope.preswitch = false
                                if (MyStorage.length == 0) {
                                  $scope.showempty = true
                                  $scope.showtable = true
                                  $scope.showdetails = true
                                  $scope.resultsempty = 'No records.'
                                }else {
                                  $scope.tablelist = false
                                  $scope.showtable = false
                                  $scope.showdetails = true
                                  $scope.showempty = false
                                  var totalnum = MyStorage.length
                                  var pagesize = 20
                                  var startrow = (currentpage - 1) * pagesize
                                  var endrow = currentpage * pagesize
                                  if (currentpage == 1) {
                                    $scope.favorpre = false
                                  }else {
                                    $scope.favorpre = true
                                  }
                                  if (endrow < totalnum) {
                                    $scope.favornext = true
                                  }else {
                                    $scope.favornext = false
                                  }
                                  endrow = (endrow > totalnum) ? totalnum : endrow
                                  var favoritelist = [ ]
                                    for (var i = startrow; i < endrow; i++) {
                                      var getkey = MyStorage.key(i)
                                      var favorith = JSON.parse(MyStorage.getItem(getkey))
                                      favorith.starstyle = 'fa fa-trash'
                                      favoritelist.push(favorith)
                                    }
                                    if (numberth < 0) {
                                      $scope.nearbyresults = favoritelist
                                      $scope.searchtable = false
                                    }else {
                                      var placekey = $scope.nearbyresults[numberth].place_id
                                      for (var j = 0; j < favoritelist.length; j++) {
                                        var listkey = favoritelist[j].place_id
                                        if (listkey == placekey) {
                                          favoritelist[j].highlight = 'yellowlight'
                                        }else {
                                          favoritelist[j].highlight = 'highlight'
                                        }
                                      }
                                      $scope.nearbyresults = favoritelist
                                      $scope.searchtable = false
                                    }
                                  }
                                }

                                $scope.FavorPre = function () {
                                  currentpage = currentpage - 1
                                  $scope.FavoriteList()
                                }

                                $scope.FavorNext = function () {
                                  currentpage = currentpage + 1
                                  $scope.FavoriteList()
                                }

                                $scope.ResultsList = function () {
                                  $scope.rbtn = 'btn btn-primary'
                                  $scope.fbtn = 'btn btn-link'
                                  resultstab = true
                                  favortab = false
                                  $scope.favorpre = false
                                  $scope.favornext = false
                                  var findhigh = false
                                  if (nearbylength == 0) {
                                    $scope.showempty = true
                                    $scope.showtable = true
                                    $scope.showdetails = true
                                    $scope.resultsempty = 'No records.'
                                  }else {
                                    $scope.showempty = false
                                    $scope.showtable = false
                                    $scope.showdetails = true
                                    if (setpage == 1) {
                                      if (numberth < 0) {
                                        $scope.nearbyresults = firstpageresults
                                      }else {
                                        var placekey = $scope.nearbyresults[numberth].place_id
                                        for (var i = 0; i < firstpageresults.length; i++) {
                                          if (placekey == firstpageresults[i].place_id) {
                                            firstpageresults[i].highlight = 'yellowlight'
                                          }else {
                                            firstpageresults[i].highlight = 'highlight'
                                          }
                                        }
                                        $scope.nearbyresults = firstpageresults
                                      }
                                    }else if (setpage == 2) {
                                      if (numberth < 0) {
                                        $scope.nearbyresults = nextpageresults
                                      }else {
                                        var placekey = $scope.nearbyresults[numberth].place_id
                                        for (var j = 0; j < nextpageresults.length; j++) {
                                          if (placekey == nextpageresults[j].place_id) {
                                            nextpageresults[j].highlight = 'yellowlight'
                                          }else {
                                            nextpageresults[j].highlight = 'highlight'
                                          }
                                        }
                                        $scope.nearbyresults = nextpageresults
                                      }
                                    }else if (setpage == 3) {
                                      if (numberth < 0) {
                                        $scope.nearbyresults = lastpageresults
                                      }else {
                                        var placekey = $scope.nearbyresults[numberth].place_id
                                        for (var k = 0; k < lastpageresults.length; k++) {
                                          if (placekey == lastpageresults[k].place_id) {
                                            lastpageresults[k].highlight = 'yellowlight'
                                          }else {
                                            lastpageresults[k].highlight = 'highlight'
                                          }
                                        }
                                        $scope.nearbyresults = lastpageresults
                                      }
                                    }
                                  }
                                  if (setpage == 1 || setpage == 0) {
                                    $scope.preswitch = false
                                  }else {
                                    $scope.preswitch = true
                                  }
                                  if (totalpage >= 2) {
                                    $scope.nextswitch = true
                                  }else {
                                    $scope.nextswitch = false
                                  }
                                }

                                $scope.geolocate = function (id) {
                                  function fillInAddress () {
                                    var place = autocomplete.getPlace()
                                    if (place.geometry) {
                                      locating = place.formatted_address
                                      locatingName = place.name
                                    }
                                  }
                                  var autocomplete = new google.maps.places.Autocomplete(
                                    (document.getElementById(id)), {types: ['geocode']})
                                  autocomplete.addListener('place_changed', fillInAddress)
                                  if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(function (position) {
                                      var geolocation = {
                                        lat: position.coords.latitude,
                                        lng: position.coords.longitude
                                      }
                                      var circle = new google.maps.Circle({
                                        center: geolocation,
                                        radius: position.coords.accuracy
                                      })
                                      autocomplete.setBounds(circle.getBounds())
                                    })
                                  }
                                }
                              })
