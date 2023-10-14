const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');

// Check if the correct command line arguments are provided
if (process.argv.length !== 3) {
  console.error('Usage: node urls.js FILENAME');
  process.exit(1);
}

const fileName = process.argv[2];

// Read the list of URLs from the input file
try {
  const urls = fs.readFileSync(fileName, 'utf8').split('\n');
  urls.forEach(downloadAndSaveHtml);
} catch (err) {
  console.error('Error reading the input file:', err);
}

// Function to download and save HTML from a URL
function downloadAndSaveHtml(inputUrl) {
  if (!inputUrl) {
    return; // Skip empty lines
  }

  const parsedUrl = url.parse(inputUrl);
  const fileName = path.basename(parsedUrl.hostname);

  const protocol = parsedUrl.protocol === 'https:' ? https : http;
  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    method: 'GET',
  };

  const fileStream = fs.createWriteStream(fileName + '.txt');

  const req = protocol.request(options, (res) => {
    if (res.statusCode !== 200) {
      console.error(`Error: Unable to fetch ${inputUrl} - Status Code: ${res.statusCode}`);
      return;
    }

    res.on('data', (chunk) => {
      fileStream.write(chunk);
    });

    res.on('end', () => {
      fileStream.end();
      console.log(`Downloaded and saved ${inputUrl} as ${fileName}.txt`);
    });
  });

  req.on('error', (err) => {
    console.error(`Error: Unable to request ${inputUrl} - ${err}`);
  });

  req.end();
}
