Meteor boilerplate to add teams functionality to user accounts. This code is just to get you started with methods and functions on the server. UI components are not included since there are so many options when selecting a front-end framework.

## Dependencies

To use as is, install from npm:

    meteor npm install --save

sparkpost - To send e-mails. https://www.sparkpost.com The free dev account allows 15,000 e-mails per month.
crypto-random-string - To generate random tokens for user invites.

Meteor will need:

check - To validate arguments
iron:router - Routing
accounts-password
accounts-base
email

## Parameters

To get started, you will need to input the following into /settings.json

"SparkPost": "xxxxxxxxx" - Replace with your Sparkpost client id.

You will also need to set email parameters in /imports/startup/server/email.js

    Accounts.emailTemplates.siteName = "";
    Accounts.emailTemplates.from = "";
    ...
    Accounts.urls.verifyEmail = function(token) {
      return "domain.com/verify-email/" + token;
    };
    Accounts.urls.resetPassword = function(token) {
      return "domain.com/reset-password/" + token;
    };

## Starting

    meteor --settings settings.json

## Optional User Types

Included in /imports/api/global are methods to restrict different user account types to n inserts. Three account types are included: Basic, Premium, Super. The user objects will hold the account limits and you can also insert various error messages to be sent to a UI notification component such as toastr.

Examples:

A user inserts a new document in MongoDB. In your insert function on the front-end, just add in: `Meteor.call('incrDocCount', 1);` This will increment the counts collection for the account Type. If a user removes the document, just call decrDocCount.

When validating each insert or update, you can call the fetchLimits method. This will return an object with the user's account limits for the account type.
