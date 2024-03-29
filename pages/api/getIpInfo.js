// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// how the api should work
// 1. get the ip address from the request headers
// 2. make a request to the ip-api.com/json/{ip} endpoint to get the country, countryCode, and city of the IP address
// 4. if the request fails, data should be { geolocation: false, country: null, countryCode: null, city: null }
// 5. if the request succeeds, data should be { geolocation: true, ...response.json data }  

// then try to get the vpn data from the ipapi.is api
// add the is_vpn field to the response data or set it to false if the request fails
// should handle the edge cases where the IP address is not detected or the request to the ip-api.com/json/{ip} endpoint fails

export default async function handler(req, res) {

  let ip = req.headers['x-real-ip'];

  const forwardedFor = req.headers['x-forwarded-for'];

  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? null;
    res.status(200).json({ ip: null, error: "No IP address detected!" });
  }
  else {
    // http://ip-api.com/json/
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city`);
      if (!response.ok) {
        res.status(500).json({ ip, country: null, countryCode: null, city: null, is_vpn: false, error: "geo" });
        return;
      }
      else {
        let data = await response.json();
        let isVpn = await fetch(`https://api.ipapi.is/?q=${ip}&key=46fc5d287960a8b2`);
        if (isVpn.ok) {
          let vpnData = await isVpn.json();
          res.status(200).json({ ip, ...data, is_vpn: vpnData.is_vpn });
        }
        else {
          res.status(500).json({ ip, ...data, is_vpn: false, error: "vpn" });
        }
      }


    } catch (error) {
      res.status(500).json({ ip, country: null, countryCode: null, city: null, error: "geo" });
    }
  }
}
