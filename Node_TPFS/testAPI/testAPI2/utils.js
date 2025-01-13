// src/utils.js
function generateRandomString(length = 18) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  }
  
  module.exports = { generateRandomString };
  