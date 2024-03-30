import { getLink } from "@/backend/functions";

export default async function handler(req, res) {

  if(req.method === 'POST') {
    // Process a POST request
    let data = req.body;
    let url = data.url;


    if(!url) {
      res.status(400).json({ message: 'Missing url' });
      return;
    }
    else {
      let link = await getLink(url);
      res.status(200).json({ message: 'Link found', link: link});
      
    }


    
  }
  else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}