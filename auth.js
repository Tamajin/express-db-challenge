const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
    const password = req.body.password;
    argon2
    .hash("password", {
        type: argon2.argon2d,
        memoryCost: 2 ** 16,
        parallelism: 1,
        hashLength: 50,
    })
    .then((hashedPassword) => {
            console.log(hashedPassword);
            req.body.hashedPassword = hashedPassword;
            delete password;
    next();
        })    
    .catch((err) => {
            console.error(err);
            res.sendStatus(500);
        });
};

module.exports = {
    hashPassword,
};