import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore/lite';
const database = getFirestore(app);


async function addLink(linkUrl, linkTrackingUrl) {
    const docRef = await addDoc(collection(database, "links"), link);
    return docRef.id;
}

export {
    addLink
}