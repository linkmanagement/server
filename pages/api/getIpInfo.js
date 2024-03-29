// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { addIpToVpnList, isIpInVpnList } from "@/backend/functions";

// how the api should work
// 1. get the ip address from the request headers
// 2. make a request to the ip-api.com/json/{ip} endpoint to get the country, countryCode, and city of the IP address
// 4. if the request fails, data should be { geolocation: false, country: null, countryCode: null, city: null }
// 5. if the request succeeds, data should be { geolocation: true, ...response.json data }  

// then try to get the vpn data from the ipapi.is api
// add the is_vpn field to the response data or set it to false if the request fails
// should handle the edge cases where the IP address is not detected or the request to the ip-api.com/json/{ip} endpoint fails
export default async function handler(req, res) {
  try {
    let ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for']?.split(",")[0] || null;

    if (!ip) {
      return res.status(200).json({ ip: null, error: "No IP address detected!" });
    }

    const response = await fetch(`http://ip-api.com/json/${ip}?fields=country,countryCode,city`);

    if (!response.ok) {
      return res.status(500).json({ ip, country: null, countryCode: null, city: null, is_vpn: false, error: "geo" });
    }

    const data = await response.json();
    const is_vpn = await isIpInVpnList(ip);

    if (is_vpn) {
      return res.status(200).json({ ip, ...data, is_vpn });
    }

    const isVpnResponse = await fetch(`https://api.ipapi.is/?q=${ip}&key=46fc5d287960a8b2`);
    if (!isVpnResponse.ok) {
      return res.status(500).json({ ip, ...data, is_vpn: false, error: "vpn" });
    }

    const vpnData = await isVpnResponse.json();
    if (vpnData.is_vpn) {
      await addIpToVpnList(ip);
    }

    return res.status(200).json({ ip, ...data, is_vpn: vpnData.is_vpn });
  } catch (error) {
    return res.status(500).json({ ip: null, country: null, countryCode: null, city: null, error: "geo" });
  }
}