import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';
const database = getFirestore(app);

// adds to the links collection an object {url, tracking, analytics: []} if no link with the same url exists
async function addLink(linkUrl, linkTrackingUrl) {
    const timestamp = Date.now();
    const linksCollection = collection(database, 'links');
    const linksSnapshot = await getDocs(linksCollection);
    const links = linksSnapshot.docs.map(doc => doc.data());
    const linkExists = links.some(link => link.url === linkUrl);
    if (linkExists) {
        return false;
    }
    await addDoc(linksCollection, { url: linkUrl, tracking: linkTrackingUrl, timestamp, blocked: [] });
    return true;
}

async function getLinks() {
    const linksCollection = collection(database, 'links');
    const linksSnapshot = await getDocs(linksCollection);
    return linksSnapshot.docs.map(doc => doc.data());
}


async function deleteLink(linkUrl) {
    const linksCollection = collection(database, 'links');
    const querySnapshot = await getDocs(query(linksCollection, where('url', '==', linkUrl)));
    const doc = querySnapshot.docs[0];
    await deleteDoc(doc.ref);
}

async function getLink(linkUrl) {
    const linksCollection = collection(database, 'links');
    const querySnapshot = await getDocs(query(linksCollection, where('url', '==', linkUrl)));
    const doc = querySnapshot.docs[0];
    return doc.data();
}

async function updateLinkTrackingUrl(linkUrl, trackingLinkUrl) {
    const linksCollection = collection(database, 'links');
    const querySnapshot = await getDocs(query(linksCollection, where('url', '==', linkUrl)));
    const doc = querySnapshot.docs[0];
    let link = doc.data();
    link.tracking = trackingLinkUrl;
    await updateDoc(doc.ref, link);

}

async function updateBlocked(linkUrl, blocked) {
    const linksCollection = collection(database, 'links');
    const querySnapshot = await getDocs(query(linksCollection, where('url', '==', linkUrl)));
    const doc = querySnapshot.docs[0];
    let link = doc.data();
    link.blocked = blocked;
    await updateDoc(doc.ref, link);
}

// returns the differecne to days ago or hours ago or minutes ago based on the appropiate difference
function timeDifferenceInText(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) {
        return `${days} days ago`;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) {
        return `${hours} hours ago`;
    }
    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minutes ago`;
}


async function getAnalytics(linkUrl) {
    const analyticsCollection = collection(database, 'analytics');
    const querySnapshot = await getDocs(query(analyticsCollection, where('url', '==', linkUrl)));
    const doc = querySnapshot.docs;
    return doc.map(doc => doc.data());
}

async function addIpToVpnList(ip) {
    const vpnCollection = collection(database, 'vpn');
    await addDoc(vpnCollection, { ip: ip });
}

async function addAnalytics(linkUrl, ip, country, countryCode) {
    const analyticsCollection = collection(database, 'analytics');
    let x = await addDoc(analyticsCollection, { url: linkUrl, ip, country, countryCode, timestamp: Date.now() });
    return x;
}


async function isIpInVpnList(ip) {
    const vpnCollection = collection(database, 'vpn');
    const querySnapshot = await getDocs(query(vpnCollection, where('ip', '==', ip)));
    return querySnapshot.docs.length > 0;
}

export {
    addLink,
    getLinks,
    timeDifferenceInText,
    deleteLink,
    updateLinkTrackingUrl,
    updateBlocked,
    addAnalytics,
    getAnalytics,
    addIpToVpnList,
    isIpInVpnList,
    getLink
}