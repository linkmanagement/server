export default function handler(req, res) {

  if(req.method === 'POST') {
    // Process a POST request
    let data = req.body;

    let url = data.url;
    let ip = data.ip;
    let country = data.country;
    let countryCode = data.countryCode;

    if(!url) {
      res.status(400).json({ message: 'Missing url' });
      return;
    }

    
    
  }
  else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}