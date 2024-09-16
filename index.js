const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect: (session, callback) => {
        console.log(`onConnect`, session.id)
        callback(); // return true to accept connection
    },
    onMailFrom: (address, session, callback) => {
        console.log(`onMailFrom`, address, session.id)
        callback(); // return true to accept
    },
    onRcptTo: (address, session, callback) => { 
        console.log(`onRcptTo`, address, session.id)
        callback(); // return true to accept
    },
    onData: (stream, session, callback) => {
        stream.on(`data`, (data) => console.log(`onData, ${data.toString()}`));
        stream.on(`end`, () => callback()); // when stream ends, call callback
    }
});
server.listen(25, () => {
    console.log("Listening on port 25");
})