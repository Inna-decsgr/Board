import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, setDoc, Timestamp, orderBy, query} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();


provider.setCustomParameters({
  prompt: "select_account",
});


  function getClock() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const hours = ('0' + today.getHours()).slice(-2);
    const minutes = ('0' + today.getMinutes()).slice(-2);
    const seconds = ('0' + today.getSeconds()).slice(-2);
  
    const dateString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return dateString
  }

  setInterval(getClock, 1000)


export function login() {
  signInWithPopup(auth, provider)
  .catch(console.error)
}

export function logout() {
  signOut(auth)
  .catch(console.error)
}

export async function onUserStateChange(callback) {
  onAuthStateChanged(auth, async(user) => {
    callback(user);
  })
}


export async function getBoardLists() { 
  const querySnapshot = await getDocs(query(collection(database, "board"), orderBy("timestamp", "desc")));
  return querySnapshot.docs.map((doc) => ({id:doc.id, ...doc.data()}))
}




export async function addNewBoard(user, board, url, userName, number) { 
  const { title, content} = board;

  const docRef = await addDoc(collection(database, "board"), {
    title:title,
    writer:`${userName.slice(0,1)}**`,
    content: content,
    date:getClock(),
    image:url ? url : null,
    modify:false,
    boardId: user.uid,
    listNumber: number+1,
    timestamp:Timestamp.now()
  })
  return docRef;
}

export async function updateBoard(comment, url, id, image, userName) { 
  const {title, content} = comment;

  return await setDoc(doc(database, "board", id), {
    ...comment,
    title,
    writer:`${userName.slice(0,1)}**`,
    content,
    date: getClock(),
    modify:true,
    image:url ? url : image
  })
  
}

export async function removeBoard(id) {  
  // 게시글 삭제
  return await deleteDoc(doc(database, "board", id))
}