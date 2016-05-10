import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';
Messages = new Mongo.Collection("messages");
//Register = new Mongo.Collection("users2");
Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
	messages:function()
	{
		return Messages.find();
	}
  // counter() {
  //   return Template.instance().counter.get();
  // },
});

Template.hello.events({
  'submit .chat-form'(event, instance) {
  	event.preventDefault();
  	var mess = event.target.message.value;
  	console.log(mess);
  	insertMess(mess);
  	event.target.message.value = "";
  },
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

function insertMess(mess)
{
	Messages.insert({
  		text: mess,
  		createdAt: new Date(), // current time
      	owner: Meteor.userId,
      	username: Meteor.user().username,
  	});
}

function addNewAccount(email, username, pass)
{
	Accounts.createUser({
        email: email,
        username: username,
        password: pass
    });
}