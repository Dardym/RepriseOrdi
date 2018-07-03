var nodemailer = require('nodemailer');

class emailAction {

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'maxime.dardy@gmail.com',
        pass: 'BDYyUojPJVX00670089'
      }
    });

    this.mailOptions = {
      from: 'maxime.dardy@gmail.com',
      to: 'maxime@touchedeclavier.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
	}
  
  exec(){
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
  }
}

module.exports = emailAction;