// //npm install lodash
// //npm i imap-simple
// npm install mailparser

var imaps = require('imap-simple');
const _ = require('lodash');
const simpleParser = require('mailparser').simpleParser;


var config = {
    imap: {
        user: 'paragpanigrahi.dev@gmail.com',
        password: 'nqhmkzqnxbagvcnq',
        host: 'imap.gmail.com',
        port: 993,
        tls:  true,
        tlsOptions: { rejectUnauthorized: false },
        authTimeout: 3000,
    }
};


// //1. Only Headers
// imaps.connect(config).then(function (connection) {

//     return connection.openBox('INBOX').then(function () {
//         var searchCriteria = [
//             'UNSEEN'
//         ];

//         var fetchOptions = {
//             bodies: ['HEADER', 'TEXT'],
//             markSeen: false
//         };

//         return connection.search(searchCriteria, fetchOptions).then(function (results) {
//             var subjects = results.map(function (res) {
//                 return res.parts.filter(function (part) {
//                     return part.which === 'HEADER';
//                 })[0].body.subject[0];
//             });

//             console.log(subjects);
//             // =>
//             //   [ 'Hey Chad, long time no see!',
//             //     'Your amazon.com monthly statement',
//             //     'Hacker Newsletter Issue #445' ]
//         });
//     });
// });

//TODO
//var status = imaps.Disconnect();


//2. Both header and content

// imaps.connect(config).then(function (connection) {
//     return connection.openBox('INBOX').then(function () {
//         var searchCriteria = ['1:5'];
//         var fetchOptions = {
//             bodies: ['HEADER', 'TEXT'],
//         };
//         return connection.search(searchCriteria, fetchOptions).then(function (messages) {
//             messages.forEach(function (item) {
//                 var all = _.find(item.parts, { "which": "TEXT" })
//                 var html = (Buffer.from(all.body, 'base64').toString('ascii'));
//                 console.log(html)
//             });
//         });
//     });
// });



// 3. With Mail Parser
// imaps.connect(config).then(async function (connection) {
//     await connection.openBox('INBOX');
//     var searchCriteria = ['1:5'];
//     var fetchOptions = {
//         bodies: ['HEADER', 'TEXT', ''],
//     };
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
//             connection.end();   
//         });
//     });
// });

// 4. Test
imaps.connect(config).then(function (connection) {
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
            var senders = results.map(function (res) {
                return res.parts.filter(function (part) {
                    return part.which === 'HEADER';
                })[0].body.from[0];
            });

            
            for(let i=0;i<subjects.length;i++){
                console.log(senders[i]);
            }
            connection.end();
        });
      });
    }).catch(function(connection){
        console.log("connection falied");
        //twiml.message("SOrry, Can't connect right now");
        console.log(connection);
        connection.end();
        return;
    });

