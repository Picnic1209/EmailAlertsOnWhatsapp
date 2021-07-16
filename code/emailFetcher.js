
//main function inside sandbox
exports.handler = async function (context, event, callback) {
    const twiml = new Twilio.twiml.MessagingResponse();
    const incomingMessage = event.Body.toLowerCase();

    //message configurations
    var imaps = require('imap-simple');
    const _ = require('lodash');
    const simpleParser = require('mailparser').simpleParser;

    const config = {
        imap: {
            user: context.emailID,
            password: context.passKey,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            authTimeout: 3000,
        }
    };

    //if the message contains the word mail
    if (incomingMessage.includes("mail") || incomingMessage.includes("email") || incomingMessage.includes("yes")) {
        const result = await imaps.connect(config).then(function (connection) {
            console.log("connected");

            return connection.openBox('INBOX').then(function () {
                console.log("opened Inbox");

                //different search criteria with different keywords
                var searchCriteria;
                if (incomingMessage.includes("unseen")) {
                    searchCriteria = [
                        'UNSEEN'
                    ];
                } else {
                    searchCriteria = [
                        '1:5'
                    ];
                }


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

                    var senders = results.map(function (res) {
                        return res.parts.filter(function (part) {
                            return part.which === 'HEADER';
                        })[0].body.from[0];
                    });

                    //console.log(subjects);
                    for (let i = 0; i < subjects.length && i < 5; i++) {
                        let currmail = `Sender: ${senders[i]} \n \n Subject: ${subjects[i]}`;
                        //console.log(currmail);
                        twiml.message(currmail);

                    }
                    connection.end();
                });
            });
        }).catch(function (connection) {
            console.log("connection falied");
            twiml.message("Sorry, Can't connect right now");
            return;
        });

    }
    else if (incomingMessage.includes("hi") || incomingMessage.includes("hello") || incomingMessage.includes("hey")) {
        twiml.message("Hey. I Hope you are fine. Should I get the mails for you?");
    }
    else if (incomingMessage.includes("help")) {
        let message = "Keywords: \n 1) mail + unseen: to get recent unseen mails \n 2) mail: get recent mails \n 3)help: to get help for the keywords ";
        twiml.message(message);
    }
    else {
        twiml.message("Sorry. Command not recognised. Send \"help\" to get the list of keywords ");
    }

    console.log("here at the last");
    return callback(null, twiml);
};
