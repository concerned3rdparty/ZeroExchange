const deepstream = require('deepstream.io-client-js');
var client = deepstream('wss://013.deepstreamhub.com?apiKey=3d4b728c-d204-4c52-a50f-6c476615915b').login();
export default client;
