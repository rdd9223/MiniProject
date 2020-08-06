const jwt = require("jsonwebtoken");
const resMessage = require("../util/responseMessage");
const statusCode = require("../util/statusCode");
const authUtil = require("../util/authUtil");
const secretOrPrivateKey = require("../../config/tokenSecretKey");

const options = {
  algorithm: "HS256",
  expiresIn: "7d",
  issuer: "rdd9223",
};

const refreshOptions = {
  algorithm: "HS256",
  expiresIn: "14d",
  issuer: "rdd9223",
};

const crypto = {
  sign: (user) => {
    const payload = {
      userId: user
    };
    const result = {
      token: jwt.sign(payload, secretOrPrivateKey, options),
    };
    return result;
  },
  publish: (payload) => {
    const token = jwt.sign(payload, secretOrPrivateKey, options);
    const refreshToken = jwt.sign(
      {
        refreshToken: payload,
      },
      secretOrPrivateKey,
      refreshOptions
    );
    return {
      token,
      refreshToken,
    };
  },
  verify: (token) => {
    let decoded;
    try {
      decoded = jwt.verify(token, secretOrPrivateKey);
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log("expired token");
        return -3;
      } else if (err.message === "invalid token") {
        console.log("invalid token");
        return -2;
      } else {
        console.log("invalid token");
        return -2;
      }
    }
    return decoded;
  },
  refresh: (user) => {
    const payload = {
      idx: user.idx,
    };
    return jwt.sign(payload, secretOrPrivateKey, options);
  },
  checkLogin: async (req, res, next) => {
    var token = req.headers.token;

    if (!token) {
      return res.json(authUtil.successFalse(statusCode.BAD_REQUEST, resMessage.EMPTY_TOKEN));
    } else {
      const user = crypto.verify(token);

      if (user == -3) {
        return res.json(authUtil.successFalse(statusCode.UNAUTHORIZED, resMessage.EXPIRED_TOKEN));
      } else if (user == -2) {
        return res.json(authUtil.successFalse(statusCode.UNAUTHORIZED, resMessage.INVALID_TOKEN));
      } else {
        req.decoded = user;
        next();
      }
    }
  },
};

module.exports = crypto;
