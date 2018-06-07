import {Mongo} from "meteor/mongo";

export const Teams = new Mongo.Collection("teams");

Teams.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Teams.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
