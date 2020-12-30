const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// sgMail.send({
//     to: 'acygnarowicz@yahoo.com',
//     from: 'acygnarowicz@gmail.com',
//     subject: 'Test Email',
//     text: 'I hope this one actually makes it to you.'
// })

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'acygnarowicz@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how the app works for you!`
    })
};

const sendGoodByeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'acygnarowicz@gmail.com',
        subject: "We are sorry to see you go!",
        text: `We are sorry to see you go, ${name}. Is there something we could have done better?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodByeEmail
}