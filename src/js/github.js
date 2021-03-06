const axios = require('axios');
const logger = require('./logger');

const axiosConfig = {
    baseURL: 'https://api.github.com',
    auth: {
        username: process.env.GITHUB_LOGIN,
        password: process.env.GITHUB_TOKEN
    }
};

const getMember = async (memberLogin) => {
    logger.info(` + ${memberLogin}`)
    const response = await axios.get(`/users/${memberLogin}`, axiosConfig);
    logger.success(`  -> ${response.data.login}`);
    return response.data;
}

const getMembers = async (org) => {

    logger.info('Getting public members:');
    const response = await axios.get(`/orgs/${org}/public_members`, axiosConfig);

    var memberLogins = response.data.map(member => member.login);
    logger.success(memberLogins);

    return await Promise.all(
        memberLogins.map(async (login) => getMember(login)));
};

module.exports = {
    getMembers,
    getMember
}
