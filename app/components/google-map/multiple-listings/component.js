import Ember from 'ember';
import config from 'stogora-app/config/environment';

export default Ember.Component.extend({
  /**
   * Expected to be passed by parentcontroller
   */
  listings: [],
  /**
   * Initally set to null but will be overriden by function below
   */
  zipToGoogleCoordinates: null,
  centerLat: 37.7833,
  centerLng: -122.4167,
  /*****************************************************************************
  * Code related to getting zip code to coordinates data from google
  *****************************************************************************/
  /**
   * Get all the unique zip codes from the listings and for each make a call to
   * the google api for the coordinates. Store the result in zipToGoogleCoordinates
   *
   * Also calculate the center of the zip codes
   */
  findListingLocations: Ember.observer('listings', function () {
    var centerBounds = new google.maps.LatLngBounds(),
      listings = this.get('listings'),
      uniqueZipCodes = listings.mapBy('zipCode').uniq(),
      responseHash = {},
      urlTemplate = this.get('urlTemplate'),
      self = this,
      urlToForZip;

    if (uniqueZipCodes.length) {
      uniqueZipCodes.forEach(function (zipCode) {
        if (Number(zipCode) !== NaN) {
          urlToForZip = urlTemplate.replace('<zipCode>', zipCode);
          responseHash[zipCode] = Ember.$.getJSON(urlToForZip).then(self.parseResponseJSONFromGoogle);
        }
      });

      Ember.RSVP.hash(responseHash).then(function (values) {
        for (var zipCode in values) {
          var lat = values[zipCode].geometry.location.lat,
            lng = values[zipCode].geometry.location.lng;
          centerBounds.extend(new google.maps.LatLng(lat, lng));
        }

        if (Object.keys(values).length) {
          self.setProperties({
            centerLat: centerBounds.getCenter().lat(),
            centerLng: centerBounds.getCenter().lng(),
            zipToGoogleCoordinates: values
          });
        } else {
          self.set('zipToGoogleCoordinates', values);
        }
      });
    }
  }).on('init'),
  /**
   * Return the result object that object that contains the type
   * @param  {Object} jsonResponse JSON Response from AJAX call to Google Maps
   * @return {Object}              Object containing formatted_address, geometry.location, geometry.bounds
   */
  parseResponseJSONFromGoogle: function (jsonResponse) {
    if (jsonResponse.results) {
      return jsonResponse.results.find(function (item) {
        return item.types.contains('postal_code');
      });
    }
  },
  urlTemplate: Ember.computed(function () {
    return 'https://maps.googleapis.com/maps/api/geocode/json?address=<zipCode>&key=' + config['g-map'].key;
  }),
 /*****************************************************************************
  * Categorizing listings by zip code and setting up display data
  *****************************************************************************/
  displayData: Ember.computed('zipToGoogleCoordinates', function () {
    var zipToGoogleCoordinates = this.get('zipToGoogleCoordinates'),
      allListings = this.get('listings'),
      curatedData = [];
    if (zipToGoogleCoordinates) {
      for (var zipCode in zipToGoogleCoordinates) {
        curatedData.push({
          zipCode: zipCode,
          locationData: zipToGoogleCoordinates[zipCode],
          listings: allListings.filterBy('zipCode', Number(zipCode))
        });
      }
    }
    return curatedData;
  })
});
