import { takeLatest, call , all , put} from 'redux-saga/effects';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess , resetPasswordSuccess ,userError} from './user.actions';
import { auth, handleUserProfile, handleAdminProfile, getCurrentUser, GoogleProvider } from '../../Firebase/utilis';
import { handleResetPasswordAPI } from './user.helpers'

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try{
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        // console.log(userRef);
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id:snapshot.id,
                ...snapshot.data()
            })
        );

    } catch(err){
        console.log(err);
        return false;
    }
};

export function* getSnapshotFromAdminAuth(admin, additionalData = {}) {
    try{
        const userRef = yield call(handleAdminProfile, { userAuth: admin, additionalData });
        // console.log(userRef);
        const snapshot = yield userRef.get();
        yield put(
            signInSuccess({
                id:snapshot.id,
                ...snapshot.data()
            })
        );

    } catch(err){
        console.log(err);
    }
};

export function* emailSignIn({ payload: {email, password} }) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user)

    } catch (err) {
        const error = [err.message];
        yield put(
            userError(error)
        );
        console.log(err);
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* emailAdminSignIn({ payload: {email, password} }) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromAdminAuth(user)

    } catch (err) {
        const error = [err.message];
        yield put(
            userError(error)
        );
        console.log(err);
    }
}

export function* onEmailAdminSignInStart() {
    yield takeLatest(userTypes.EMAIL_ADMIN_SIGN_IN_START, emailAdminSignIn);
}

export function* isUserAuthenticated() {
    try{
        const userAuth = yield getCurrentUser();
        // console.log(userAuth);
        if(!userAuth) return;
        const userReff = yield getSnapshotFromUserAuth(userAuth);
        if(userReff === false)
        {
            yield getSnapshotFromAdminAuth(userAuth);
        }
    } catch(err) {
        console.log(err);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION,isUserAuthenticated);
}



export function* signOutUser() {
    try{
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
    } catch(err){
        console.log(err);
    }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START,signOutUser );
}

export function* signUpUser({ payload: {
    name,
    email,
    password,
    cpassword
} }) {
    if(!name || !email || !password || !cpassword)
    {
        const err = ['Please Fill all the fields'];
        yield put(
            userError(err)
        );
        return;
    }
    if(password !== cpassword) {
        const err = ['Password Dont\'t Match'];
        yield put(
            userError(err)
        );
        return;
    }

    try{
        const { user } = yield auth.createUserWithEmailAndPassword(email,password);
        const additionalData = { name}
        yield getSnapshotFromUserAuth(user,additionalData );
    } catch(err) {
        const error = [err.message];
        yield put(
            userError(error)
        );
        // console.log(err.message);
        // console.log(err);
        return;
    }
}

export function* onSignUpUserStart() {
   yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* signUpAdmin({ payload: {
    name,
    type,
    email,
    phone,
    address,
    password,
    cpassword,
    duration,
    charge,
    url
} }) {
    if(!name || !email || !type || !phone || !address || !duration || !charge || !url || !password || !cpassword)
    {
        const err = ['Please Fill all the fields'];
        yield put(
            userError(err)
        );
        return;
    }
    if(password!==cpassword) {
        const err = ['Password Don\'t Match'];
        yield put(
            userError(err)
        );
        return;
    }

    try{
        const { user } = yield auth.createUserWithEmailAndPassword(email,password);
        // console.log(user);
        const additionalData = { name, type, phone, address, duration, charge, url }
        yield getSnapshotFromAdminAuth(user, additionalData);
    } catch(err) {        
        const error = [err.message];
        yield put(
            userError(error)
        );
        // console.log(err.message);
        // console.log(err);
        return;
    }
}

export function* onSignUpAdminStart() {
    yield takeLatest(userTypes.SIGN_UP_ADMIN_START, signUpAdmin);
}

export function* resetPassword({ payload: {email} }) {
    try{
        yield call(handleResetPasswordAPI, email);
        yield put(
            resetPasswordSuccess()
        );

    }catch (err) {
        yield put(
            userError(err)
        )
    }
}


export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword );
}

export function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(GoogleProvider)
        // console.log(user);
        yield getSnapshotFromUserAuth(user);

    } catch(err) {
        console.log(err);
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(userTypes.GOOGLE_SIGN_iN_START, googleSignIn );
}

export default function* userSagas() {
    yield all([
        call(onEmailSignInStart), 
        call(onEmailAdminSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutUserStart),
        call(onSignUpUserStart),
        call(onSignUpAdminStart),
        call(onResetPasswordStart),
        call(onGoogleSignInStart)
    ])
}