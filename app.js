
const serverHandle = (req, res) => {

    // set res type
    res.setHeader('Content-type', 'application/json');

    const resData = {
        name: 'leo',
        site: 'master',
        env: process.env.NODE_ENV
    };

    res.end(JSON.stringify(resData));
};

module.exports = serverHandle