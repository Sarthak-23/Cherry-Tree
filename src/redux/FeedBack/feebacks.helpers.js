import { firestore } from '../../Firebase/utilis';
import firebase from 'firebase';

export const handleAddFeedback = feedback => {
    return new Promise((resolve,reject)=> {
        firestore
            .collection('feedbacks')
            .doc()
            .set(feedback)
            .then(()=> {
                resolve()
            })
            .catch(err=> {
                reject(err);
            })
    })
}

export const handleUpdateRating = feedback => {
    const { restaurantuid, rating } = feedback;
    return new Promise((resolve,reject)=> {
        var ref = firestore.collection('admin').doc(restaurantuid);
        ref.update({
            people: firebase.firestore.FieldValue.increment(1),
            star: firebase.firestore.FieldValue.increment(rating)
        })
        .then(()=> {
            resolve()
        })
        .catch(err=> {
            reject(err);
        })
    })
}

export const handleFetchFeedbacks = id => {
    // console.log(id);
    return new Promise((resolve,reject)=> {
        const ref = firestore.collection('feedbacks').orderBy('createDate')

        ref
        .where('restaurantuid', '==', id)
            .get()
            .then(snapshot => {
                const feedbackArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                });
                resolve(feedbackArray);
            })
            .catch(err => {
                reject(err);
            })
    })
}
