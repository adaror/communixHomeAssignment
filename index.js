const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const sqlProvider = require('./providers/sqlProvider');
const authMiddleware = require('./middlewares/auth.middleware');

//enabling to send message to different servers
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

let connectedUsers = []

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

app.post('/register', async (req, res) => {
    try {
        await sqlProvider.registerUser(req);
        res.status(200).send({user: 'register'});
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/login', async (req, res) => {
    try {
        const {email, password} = req.query;
        isValidate = await sqlProvider.validateUserByEmailAndPassword(email, password);
        if (isValidate) {
            res.status(200).send({user: "login"});
        } else {
            res.status(404).send({user: "Not Authorize"});
        }
    } catch(err) {
        res.status(500).send(err);
    }
});

io.use(authMiddleware.authenticateUser);

io.on('connection', function(socket){
    console.log(' user connected to my room');
    connectedUsers.push(socket.id);

    require('./api/api')(io, socket, connectedUsers);

    socket.on('disconnect', () => {
        console.log('user disconnect');
    })
  });

  http.listen(3000, () => {
      console.log('listen to port 3000');
  });