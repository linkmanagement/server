import { addAnalytics } from "@/backend/functions";

export default async function handler(req, res) {

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
    else {
      await addAnalytics(url, ip, country, countryCode);
      res.status(200).json({ message: 'Analytics added' });
    }


    
  }
  else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}