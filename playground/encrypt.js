const bcrypt = require("bcryptjs");
const password = "sHyaM1";
bcrypt.genSalt(10).then(salt => {
	//console.log(salt);
	bcrypt.hash(password, salt).then(hashedpassword => {
		console.log(hashedpassword);
	});
});
