const speakeasy = require('speakeasy');

const axios = require('axios');

const base64 = require('base-64');
const utf8 = require('utf8');


const shareSecret = "gabeardenpetersen@gmail.comHENNGECHALLENGE003";

// generate token
const token = speakeasy.totp({
  secret: shareSecret,
  algorithm: 'sha512',
  digits: 10
});

// verify token
var tokenVerify = speakeasy.totp.verify({
  secret: shareSecret,
  token: token,
  algorithm: 'sha512',
  digits: 10
});
if(tokenVerify) {
  console.log("Token is Good!");
  console.log("Token: ", token);
}

// generate submission data
const submitData = {
  "github_url": "https://github.com/gabepetersen/hennge-challenge",
  "contact_email": "gabeardenpetersen@gmail.com"
}
const submitString = JSON.stringify(submitData);
console.log("submit string: ", submitString);

// generate authorization string
const authString = "gabeardenpetersen@gmail.com:" + token;
console.log("auth string: ", authString);

// convert to base64
const bytes = utf8.encode(authString);
const authConvert = base64.encode(bytes);
console.log("base64 string: ", authConvert);

const configuration = {
  headers: {
    'Content-Type': 'application/json',
    "Authorization": "Basic " + authConvert
  }
}

submitRequest = async() => {
  try {
    const result = await axios.post('https://api.challenge.hennge.com/challenges/003', submitString, configuration);
    console.log(result.data);
  } catch(err) {
    console.log(err);
  }
}

submitRequest();

