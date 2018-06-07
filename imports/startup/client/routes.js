const verifyEmail = (token) => {
  Accounts.verifyEmail(token, (error) => {
    Router.go("/");
    this.next();
  });
};

Router.route("/verify-email/:token", {
  name: "verify-email",
  onBeforeAction: function() {
    var token = this.params.token;
    verifyEmail(token);
  }
});

Router.route("/invite/:token", {
  name: "invite",
  onBeforeAction: function() {
    var token = this.params.token;
    verifyEmail(token);
  }
});
