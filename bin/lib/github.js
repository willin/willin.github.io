const assert = require('assert');
const axios = require('axios');

const username = 'willin';
const token = process.env.GH_TOKEN;
assert.notDeepEqual(token, undefined, 'Invalid GH_Token');

const gql = `{
  user(login: "${username}") {
    followers {
      totalCount
    }
    repositories {
      totalCount
    }
    repositoriesContributedTo {
      totalCount
    }
    starredRepositories {
      totalCount
    }
    projects: repositories(first: 6, isFork: false, privacy: PUBLIC, orderBy: {field: UPDATED_AT, direction: DESC}) {
      nodes {
        name
        description
        url
        primaryLanguage {
          name
          color
        }
        stargazers {
          totalCount
        }
        forks {
          totalCount
        }
      }
    }
  }
}`;

module.exports = () => axios.post('https://api.github.com/graphql', { query: gql }, {
  withCredentials: false,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json;charset=utf-8',
    Authorization: `bearer ${token}`
  }
}).then(({ data: { data: { user } } }) => ({
  count: {
    followers: user.followers.totalCount,
    starred: user.starredRepositories.totalCount,
    repositories: user.repositories.totalCount,
    contributed: user.repositoriesContributedTo.totalCount
  },
  projects: user.projects.nodes.map(({ name, description, url, primaryLanguage, stargazers, forks }) => ({
    name,
    description,
    url,
    primaryLanguage,
    stargazers: stargazers.totalCount,
    forks: forks.totalCount
  }))
}));
