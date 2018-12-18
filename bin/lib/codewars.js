const axios = require('axios');

const username = 'jsv0';

module.exports = () => axios.get(`https://www.codewars.com/api/v1/users/${username}`, {
  withCredentials: false,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json;charset=utf-8'
  }
}).then(({ data: {
  honor: score = 0,
  leaderboardPosition: position = 0,
  ranks: { overall: { name: level = '' } = {} } = {},
  codeChallenges: { totalCompleted: total = 0 } = {} } = {}
}) => ({
  score,
  position,
  level,
  total
}));
