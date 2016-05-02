import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import './main.html';

Template.check.onCreated(function checkOnCreated() { // attach it to the body template instance
  this.state = new ReactiveDict();
});

Template.check.events({
  'click .checkit'(event, instance) {
    
    Meteor.call('code.check', function(error, result){
      if (error){
          console.log('Error from the client side!');
        } 
      if (result) {
          instance.state.set('fett', result.titles[0]);
          instance.state.set('gesfett', result.titles[1]);
          instance.state.set('zucker', result.titles[2]);
          instance.state.set('salz', result.titles[3]);
        }
    });
  },

});

Template.check.helpers({
  
  fett() {
    const instance = Template.instance();
    if (instance.state.get('fett')) {
      return instance.state.get('fett');
    }
    else {
      return 'Value still not known...'
    }
  },
  gesfett() {
    const instance = Template.instance();
    if (instance.state.get('gesfett')) {
      return instance.state.get('gesfett');
    }
    else {
      return 'Value still not known...'
    }
  },
  zucker() {
    const instance = Template.instance();
    if (instance.state.get('zucker')) {
      return instance.state.get('zucker');
    }
    else {
      return 'Value still not known...'
    }
  },
  salz() {
    const instance = Template.instance();
    if (instance.state.get('salz')) {
      return instance.state.get('salz');
    }
    else {
      return 'Value still not known...'
    }
  },
});



if (Meteor.isCordova) {

  Template.barcode_scanner.events({
    'click button': function () {

      cordova.plugins.barcodeScanner.scan(
        function (result) {
          alert("We got a barcode\n" +
            "Result: " + result.text + "\n" +
            "Format: " + result.format + "\n" +
            "Cancelled: " + result.cancelled);
        }, 
        function (error) {
          alert("Scanning failed: " + error);
        }
     );

    }

  });

}


// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });

