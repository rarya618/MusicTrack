import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";
import { Track } from "../dataTypes/Track";

// add data
const add = async (data: {}, collectionName: string) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// add a new track
const addTrack = async (data: {}) => {
  await add(data, "tracks")
};

// get all data
const getAll = async (collectionName: string) => {
  let data: [] = [];
  const querySnapshot = await getDocs(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    let tempData = {id: doc.id, ...doc.data()};
    // @ts-ignore
    data = [...data, {...tempData}]
  })

  return data;
}

// get all tracks
const getTracks = async () => {
  return await getAll("tracks");
}

// get all dates
const getDates = async () => {
  return await getAll("dates");
}

// get specific doc from specific collection
const get = async (collectionName: string, id: string) => {
  let docRef = doc(db, "/" + collectionName + "/" + id)

  const dataSnapshot = await getDoc(docRef)
  return {id: dataSnapshot.id, ...dataSnapshot.data()};
}

// get a single track
const getTrack = async (trackId: string) => {
  return await get("tracks", trackId);
}

// add an entry to track
const addEntry = async (trackId: string, data: {date: string, count: number}) => {
  let docRef = doc(db, "/tracks/" + trackId)
  let tempDoc = await getTrack(trackId);

  if (tempDoc) {
    try {
      // @ts-ignore
      let finalData = {...tempDoc.data}
      finalData[data.date] = data.count

      await updateDoc(docRef, {
        data: finalData
      })

      await setDoc(doc(db, "/dates/" + data.date), {exists: true})
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  }
}

export {
  add, addTrack, 
  getAll, getTracks, getDates,
  get, getTrack,
  addEntry
}