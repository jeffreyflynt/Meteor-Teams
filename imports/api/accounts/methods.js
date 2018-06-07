import {Invitations} from "./invitations";
import {Teams} from "./teams";
const cryptoRandomString = require("crypto-random-string");

Meteor.methods({
  "team.create"() {
    if (!this.userId) throw new Meteor.Error(401, "Login required");

    const teamData = {
      ownerId: this.userId,
      created: new Date(),
      userCount: 1,
      isDeleted: false
    };
    const teamId = Teams.insert(teamData);

    const userData = {
      teamId: teamId,
      accountType: "Basic",
      role: "Team Administrator"
    };
    Meteor.users.update({_id: this.userId}, {$set: {permissions: userData}});
  },
  "team.Invite"(data) {
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    check(data, {
      name: String,
      email: String,
      role: String
    });

    data.team = Meteor.user().permissions.teamId;
    data.token = cryptoRandomString(16);

    Invitations.insert(data);
    sendEmail("invite", data);
  },
  "team.addMember"(id) {
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    check(id, String);
    const inviteData = Invitations.find(id);

    const userData = {
      teamId: inviteData.team,
      accountType: "Basic",
      role: inviteData.role
    };
    Meteor.users.update({_id: this.userId}, {$set: {permissions: userData}});
    Invitations.remove(id);
  },
  getInvite(token) {
    if (!this.userId) throw new Meteor.Error(401, "Login required");
    check(token, String);
    return Invitations.find({token: token});
  }
});
