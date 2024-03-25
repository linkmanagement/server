// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// should make a request to the API route and display the IP address in the browser.
export default async function handler(req, res) {

  let ip = req.headers['x-real-ip'];

  const forwardedFor = req.headers['x-forwarded-for'];

  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? null;
    res.status(200).json({ ip: null, error: "No IP address detected!" });
  }
  else {
    // http://ip-api.com/json/103.239.252.50

    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city`);
    const data = await response.json();

    let isVpn = await fetch(`https://api.ipapi.is/?q=${ip}`);
    let vpnData = await isVpn.json();
    res.status(200).json({ ip, ...data, vpn: vpnData.is_vpn });
  }

}
