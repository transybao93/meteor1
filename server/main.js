import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Messages = new Mongo.Collection("messages");
  //Register = new Mongo.Collection("users2");
});
