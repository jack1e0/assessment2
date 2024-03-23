module.exports.handler = async (event) => {
  const https = require('https');

  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 443, // default
    path: '/users'
  };


  // Perform API call
  function fetchUsers(options) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (resp) => {
        let content = "";
    
        resp.on('data', data => content += data);
        resp.on("end", () => {
          resolve(JSON.parse(content));
        });
      });
  
      req.on("error", (error) => {
        reject(error);
      });
  
      req.end();
    });
  }
  
  const users = await fetchUsers(options);
  
  const response = {
    statusCode: 200,
    body: JSON.stringify(users),
  };
  return response;
};
