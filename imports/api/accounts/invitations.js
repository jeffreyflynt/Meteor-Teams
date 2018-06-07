import {Mongo} from "meteor/mongo";

export const Invitations = new Mongo.Collection("invitations");

Invitations.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Invitations.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
