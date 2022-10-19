import { firestore } from '../../Firebase/utilis';

export const handleFetchRestaurants = () => {
    return new Promise((resolve, reject) => {
        firestore
            .collection('admin')
            .get()
            .then(snapshot => {
                const restaurantsArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                });
                resolve(restaurantsArray);
            })
            .catch(err => {
                reject(err);
            })
    })
}