
    var nodemailer = require('nodemailer');
    var smtpTransport = require('nodemailer-smtp-transport');



    var exec = function(){

        var transporter = nodemailer.createTransport(smtpTransport({
            host: "SSL0.OVH.NET", //mail.example.com (your server smtp)
            port: "587", //2525 (specific port)
            secureConnection: "true", //true or false
            auth: {
                user: "hello@repriseordi.fr", //user@mydomain.com
                pass: "LaTouche2014+" //password from specific user mail
            }
        }));

        transporter.verify(function(error,success){
            if (error) {
                console.log(error);
           } else {
                console.log('Server is ready to take our messages');
           }
        });
    
        var mailOptions = {
            from: "hello@repriseordi.fr",
            to: ["laura@touchedeclavier.com","flavien@touchedeclavier.com"],
            subject: "nouveau client !",
            html: "<p>Nouveau client sur reprise ordi ! Lien vers le back office: </p><a href='https://repriseordi.fr/login'>repriseordi.fr</a>"
        };
        console.log("je suis dans le exec");
        transporter.sendMail(mailOptions, function(err, info){
            transporter.close();
            /*if(err) {
                callback(err, info);
            }
            else {
                callback(null, info);
            }*/
        });
    }

    exports.exec = exec;