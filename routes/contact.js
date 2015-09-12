var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

// Show Contact Form
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

//Post to the services
router.post('/send', function(req, res, next){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'akash90gupta@gmail.com',
			pass: 'Drizzle132' 
		}
	});

	var mailOptions = {
		from: 'John Doe <johndoe@outlook.com>',
		to: 'akash90gupta@gmail.com',
		subject: 'Website Submission',
		text: 'You have a new Submission with the following details... Name: '+req.body.name+' Email: '+req.body.email+' Message: '+req.body.message,
		html: '<p> You got a new submission with the following details.. </p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else{
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	})
});

module.exports = router;