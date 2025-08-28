const {createClient}= require('redis');
require("dotenv").config();

const redisclient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'redis-19391.crce179.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 19391
    }
});
module.exports = redisclient;

