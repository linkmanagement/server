// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// should make a request to the API route and display the IP address in the browser.
export default function handler(req, res) {

  let ip = req.headers['x-real-ip'];

  const forwardedFor = req.headers['x-forwarded-for'];

  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  res.status(200).json({ ip: ip })
}
