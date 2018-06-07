import {Mongo} from "meteor/mongo";

export const Counts = new Mongo.Collection("counts");

Counts.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Counts.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});
