const redis = require("redis");
const config = require("../config");

let conf = {};
conf.host = config.systemconfig.redis.HOST;
conf.password = config.systemconfig.redis.AUTH;
const client = redis.createClient(conf);

client.on("error", function (error) {
  console.error(error);
});

const hexists = async (hash, key) => {
  return new Promise((resolve, reject) => {
    client.hexists(hash, key, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const exists = async (hash) => {
  return new Promise((resolve, reject) => {
    client.exists(hash, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const hmset = async (hash, key, value) => {
  return new Promise((resolve, reject) => {
    client.hmset(
      hash,
      key,
      typeof value === "string" ? value : JSON.stringify(value),
      (err, value) => {
        if (err) reject(err);
        else resolve(value);
      }
    );
  });
};

const hmget = async (hash, key) => {
  return new Promise((resolve, reject) => {
    client.hmget(hash, key, (err, value) => {
      if (err) reject(err);
      else {
        let data = {};
        try {
          data = JSON.parse(value);
        } catch (e) {
          data = value;
        }
        resolve(data);
      }
    });
  });
};

// const hgetall = async (hash) => {
//   return new Promise((resolve, reject) => {
//     client.hgetall(hash, (err, value) => {
//       if (err) reject(err);
//       else resolve(value);
//     });
//   });
// };

const hdel = async (hash, key) => {
  return new Promise((resolve, reject) => {
    client.hdel(hash, key, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const del = async (hash) => {
  return new Promise((resolve, reject) => {
    client.del(hash, (err, value) => {
      if (err) reject(err);
      else resolve(value);
    });
  });
};

const lpush = async (hash, key) => {
  return new Promise((resolve, reject) => {
    client.lpush(hash, key, (err, value) => {
      if (err) reject(err);
      else {
        let data = {};
        try {
          data = JSON.parse(value);
        } catch (e) {
          data = value;
        }
        resolve(data);
      }
    });
  });
};

const redisClient = async (hash) => {
  return new Promise((resolve, reject) => {
    resolve(client);
  });
};

module.exports = {
  hexists,
  hmset,
  hmget,
  hdel,
  del,
  exists,
  lpush,
  redisClient,
};
