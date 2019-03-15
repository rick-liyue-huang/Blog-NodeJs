
const serverHandle = (req, res) => {
  
  res.setHeader('Content-ype', 'application/json');

  const resData = {
    name: 'rickhuang',
    content: 'good',
    env: process.env.NODE_ENV // dev when run npm run dev
  };

  res.end(JSON.stringify(resData));
};

module.exports = serverHandle;