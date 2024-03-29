export default function handler(req, res) {

  if(req.method === 'POST') {
    // Process a POST request
    let data = req.body;
    res.status(200).json({ message: 'Received data', data });
  }
  else {
    // Handle any other HTTP method
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}