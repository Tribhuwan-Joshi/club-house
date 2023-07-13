# club-house
A secure private community with a members-only feature, built on top of Express and secured with bcrypt.


![Preview](https://gcdnb.pbrd.co/images/wZopeM2OhljK.png?o=1)

## Tech Stack
- [Express JS](https://expressjs.com/) - Node Js framework for writing api endpoints
- [Express-validator](https://express-validator.github.io/docs/) - Middleware for Data sanitization and validation
- [Passport Js](https://www.passportjs.org/) - Node Js middleware for Authentication
- [Tailwindcss](https://tailwindcss.com/) - For designing with utility class
- [Pug](https://pugjs.org/api/getting-started.html) - Template Engine for rendering

#### Rate-limit for api usage
```js
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});
 app.use(limiter);
```

#### Use of Local strategy for passport
```js
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (err) {
      return done(err);
    }
  })
);
``` 
#### Bcrypt-js for encryption and decryption

```js
  brcypt.hash(user.password, 10, async (err, hashedPassword) => {
          user.password = hashedPassword;
          if (req.body.adminCode === process.env.ADMIN_CODE) {
            user.isAdmin = true;
            user.isMember = true;
          }
          const result = await user.save();

          req.login(user, function (err) {
            if (err) {
              return next(err);
            }
            return res.redirect("/");
          });
        });
```
