import { firestore } from '../../Firebase/utilis';

export const handleAddProduct = product => {
    return new Promise((resolve,reject) => {
        firestore
            .collection('products')
            .doc()
            .set(product)
            .then(()=>{
                resolve()
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleEditProduct = product => {
    return new Promise((resolve,reject) => {
        let ref = firestore.collection('products')
            // .doc(product.documentID)
        ref
            .doc(product.documentID)
            .set(product)
            .then(()=>{
                resolve()
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleFetchProducts = id => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('products').orderBy('createDate')

        ref
        .where('productAdminUserUID', '==', id)
            .get()
            .then(snapshot => {
                const productsArray = snapshot.docs.map(doc => {
                    return {
                        ...doc.data(),
                        documentID: doc.id
                    }
                });
                resolve(productsArray);
            })
            .catch(err => {
                reject(err);
            })
    })
}

export const handleDeleteProduct = documentID => {
    return new Promise((resolve, reject) => {
        firestore
        .collection('products')
        .doc(documentID)
        .delete()
        .then(() => {
            resolve();
        })
        .catch(err=> {
            reject(err);
        })
    });
}