import firebase from 'firebase/app';
import 'firebase/storage'
import 'firebase/firestore';
import 'firebase/auth';
import { firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'}); 


export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if(!userAuth)   return;
    
    // console.log(userAuth);
    const { uid } = userAuth;
    // console.log(uid);
    const userReff = firestore.doc(`admin/${uid}`);
    const snapshott = await userReff.get();
    if(snapshott.exists)
    {
        return false;
    }
    else
    {
        const userRef = firestore.doc(`users/${uid}`);
        const snapshot = await userRef.get();

        if(!snapshot.exists) {
            const {email} = userAuth;
            const timestamp = new Date();
            const userRoles = ['user'];
            try{
                await userRef.set({
                    email,
                    createDate:timestamp,
                    userRoles,
                    ...additionalData
                });
            }catch(err) {
                console.log(err);
                return false;
            }
        }
        // console.log(userRef);
        return userRef;
    }
};

export const handleAdminProfile = async ({ userAuth, additionalData }) => {
    // console.log(userAuth);
    if(!userAuth)  return;

    // console.log(userAuth);
    const { uid } = userAuth;
    // console.log(uid);
    const userRef = firestore.doc(`admin/${uid}`);
    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const {name, type, phone, address, duration, charge, email,url} = userAuth;
        // const {name, type, phone, address, duration, charge} = additionalData;
        const timestamp = new Date();
        const userRoles = ['admin','user'];

        try {
            await userRef.set({
                email,
                name,
                type,
                phone,
                address,
                duration,
                charge,
                url,
                createDate: timestamp,
                star:0,
                people:0,
                userRoles,
                ...additionalData
            });
        } catch(err) {
            console.log(err);
        }
    }
    // console.log(userRef);
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve,reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        },reject);
    })
}