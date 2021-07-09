
// This is your new function. To start, set the name and path on the left.
exports.handler = async function(context, event, callback) {
    const twiml = new Twilio.twiml.MessagingResponse();
    const incomingMessage = event.Body.toLowerCase();
    
    //message configurations
    var imaps = require('imap-simple');
    const _ = require('lodash');
    const simpleParser = require('mailparser').simpleParser;
    twiml.message("Loading Messages");
  
      const config = {
      imap: {
          user: context.emailID,
          password: context.passKey,
          host: 'imap.gmail.com',
          port: 993,
          tls:  true,
          tlsOptions: { rejectUnauthorized: false },
          authTimeout: 3000,
      }
  };
  
  //     imaps.connect(config).then(async function (connection) {
  //     await connection.openBox('INBOX');
  //     var searchCriteria = ['1:5'];
  //     var fetchOptions = {
  //         bodies: ['HEADER', 'TEXT', ''],
  //     };
  //     console.log("connected to inbox");
  //     const messages = await connection.search(searchCriteria, fetchOptions);
  //     messages.forEach(function (item) {
  //         var all = _.find(item.parts, { "which": "" });
  //         var id = item.attributes.uid;
  //         var date = item.attributes.date;
  
  //         var idHeader = "Imap-Id: " + id + "\r\n";
  //         simpleParser(idHeader + all.body, (err, mail) => {
  //             // access to the whole mail object
  //             //console.log(mail.subject);
  //             //console.log(typeof(mail.subject));
  //             //console.log(date);
  //             //console.log(`Recieved mail from:  ${mail.from.value[0].address} , sender's name:  ${mail.from.value[0].name} `);
  //             let newMail = `Mail Subject: ${mail.subject}  Recieved mail from:  ${mail.from.value[0].address} , sender's name:  ${mail.from.value[0].name} `;
  //             console.log(newMail);
  //             twiml.message("newMail");
  //             connection.end();   
  //         });
  //     });
  // });
  
      const result = await imaps.connect(config).then(function (connection) {
      console.log("connected");
  
      return connection.openBox('INBOX').then(function () {
          console.log("opened Inbox");
          var searchCriteria = [
              '1:5'
          ];
  
          var fetchOptions = {
              bodies: ['HEADER', 'TEXT'],
              markSeen: false
          };
  
          return connection.search(searchCriteria, fetchOptions).then(function (results) {
              var subjects = results.map(function (res) {
                  return res.parts.filter(function (part) {
                      return part.which === 'HEADER';
                  })[0].body.subject[0];
              });
  
              console.log(subjects);
              subjects.forEach(function(indMsg){
                  //twiml.message(indMsg);
                  console.log(indMsg);
              })
          });
        });
      }).catch(function(connection){
          console.log("connection falied");
          twiml.message("SOrry, Can't connect right now");
          return;
      });
  
  
  
  
  
    // Return the TwiML as the second argument to `callback`
    // This will render the response as XML in reply to the webhook request
    console.log("here at the last");
    return callback(null, twiml);
  };
  