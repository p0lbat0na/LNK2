'use strict';
const debug = require('debug')('my express app');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const routes = require('./routes/index');
const users = require('./routes/users');

const todoRoutes = require('./routes/routes');
const app = express();






const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {


        substr: function (length, context, options) {
            if (context.length > length) {
                return context.substring(0, length) + "...";
            } else {
                return context;
            }
        },


        getTime: function () {
            var myDate = new Date()
            var hour = myDate.getHours()
            var minute = myDate.getMinutes()
            var second = myDate.getSeconds()
            if (minute < 10) {
                minute = '0' + minute
            }
            if (second < 10) {
                second = '0' + second
            }
            return (
                'Текущее время: ' + hour + ':' + minute + ':' + second
            )
        },


        connect: function (table) {
            let table2 = 'departments';
            //query = hbs.escapeExpression(query);      //экранирование выражения
            let query = ` SELECT * FROM `+table;
            const { Pool } = require('pg');
            const Cursor = require('pg-cursor');
            let mass = 'V';
            console.log(table + ' ж');

            const pool = new Pool({
                user: 'postgres',
                host: 'localhost',
                database: 'LNK',
                password: '4444',
                port: 5432,
            });

            (async () => {
                const client = await pool.connect();
                

                const cursor = await client.query(new Cursor(query));
                var pkjo = 0;
                function read(rws,cb) {
                    cursor.read(rws, (err, rows) => {
                        
                        console.log(rows);
                        mass = mass + rows[0,0];
                        if (rows != 0) {
                            
                            read(1,cb);
                        }
                        pkjo++;
                        /*console.log(Object.keys(cursor.rows?.[0]).join('ccc'));*/
                        
                    });
                    cb(pkjo,mass);
                    
                }
                console.log('dsf');
                function cons(str1,str2) {
                    
                        console.log(str1+'э');
                        console.log(str2 + ' (*_');                    
                }
                read(5, cons);                
            })();            
        }


    }
});






app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// view engine setup

app.set('views', 'views')
app.use(todoRoutes);

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});



