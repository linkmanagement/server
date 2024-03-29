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
    await addDoc(linksCollection, { url: linkUrl, tracking: linkTrackingUrl, analytics: [], timestamp });
    return true;
}

async function getLinks() {
    const linksCollection = collection(database, 'links');
    const linksSnapshot = await getDocs(linksCollection);
    return linksSnapshot.docs.map(doc => doc.data());
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


async function deleteLink(linkUrl) {
    const linksCollection = collection(database, 'links');
    const querySnapshot = await getDocs(query(linksCollection, where('url', '==', linkUrl)));
    const doc = querySnapshot.docs[0];
    await deleteDoc(doc.ref);
}

export {
    addLink,
    getLinks,
    timeDifferenceInText,
    deleteLink
}