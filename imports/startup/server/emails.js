Accounts.emailTemplates.siteName = "";
Accounts.emailTemplates.from = "";
import SparkPost from "sparkpost";
const client = new SparkPost(Meteor.settings.private.SparkPost);

Accounts.emailTemplates.verifyEmail.html = function(user, url) {
  client.transmissions
    .send({
      content: {
        template_id: "verify-email"
      },
      recipients: [{address: user.emails[0].address}],
      substitution_data: {
        subject: "Verify E-mail",
        url: url
      }
    })
    .catch((err) => {
      console.log("Whoops! Something went wrong");
      console.log(err);
    });
};

Accounts.emailTemplates.resetPassword.html = function(user, url) {
  try {
    client.transmissions
      .send({
        content: {
          template_id: "reset-pass"
        },
        recipients: [{address: user.emails[0].address}],
        substitution_data: {
          subject: "Reset Password",
          url: url
        }
      })
      .catch((err) => {
        console.log("Whoops! Something went wrong");
        console.log(err);
      });
  } catch (error) {
    console.error("Error while rendering Mandrill template", error);
  }
};

Accounts.urls.verifyEmail = function(token) {
  return "domain.com/verify-email/" + token;
};
Accounts.urls.resetPassword = function(token) {
  return "domain.com/reset-password/" + token;
};
