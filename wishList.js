names = new Meteor.Collection('names');

if (Meteor.isClient) {
  Template.books.names = function() {
    return names.find({},{sort:{Name:1}});
  };

  Session.set('new_book', false);

  Template.books.new_book = function() {
    return Session.equals('adding_book', true);
  };

  Template.books.events({
    'click #addNewBook' : function(e, t) {
      Session.set('adding_book', true);
      Meteor.flush();
      focusText(t.find('#add-book'));
    },

    'keyup #add-book' : function(e, t) {
      if (e.which == 13) {
        var val = String(e.target.value || '');
        if(val){
          names.insert({Name: val});
          Session.set('adding_book', false);
        }
      }
    },

    'focusout #add-book' : function() {
      Session.set('adding_book', false);
    }
  });  
  
  
  function focusText(i){
    i.focus();
    i.select();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
