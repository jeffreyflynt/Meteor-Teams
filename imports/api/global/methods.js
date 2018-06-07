import {Counts} from "./global";

const basicUser = {
  docLimit: 100,
  type: "Basic",
  errorWordMax: "You have have reached your account limit of 100 inserts!"
};

const premiumUser = {
  docLimit: 250,
  type: "Premium",
  errorWordMax: "You have have reached your account limit of 250 inserts!"
};

const superUser = {
  docLimit: 500,
  type: "Super",
  errorWordMax: "You have have reached your account limit of 500 inserts!"
};

Meteor.methods({
  incrDocCount(count) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check(count, Number);
    const user = Meteor.users.findOne({_id: this.userId});
    Counts.upsert({owner: user.permissions.teamId}, {$inc: {docCount: count}}, {upsert: true});
  },
  decrDocCount(count) {
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    check(count, Number);
    const user = Meteor.users.findOne({_id: this.userId});
    Counts.upsert({owner: user.permissions.teamId}, {$inc: {docCount: -count}}, {upsert: true});
  },
  fetchLimits() {
    const user = Meteor.users.findOne({_id: this.userId});
    const account = user.permissions.accountType;
    if (account === "Basic") {
      return basicUser;
    } else if (account === "Premium") {
      return premiumUser;
    } else if (account === "Super") {
      return superUser;
    }
  }
});
