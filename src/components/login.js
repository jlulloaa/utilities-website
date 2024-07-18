import { useState } from 'react';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';


function AuthComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Signed Up:', userCredential);
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Logged In:', userCredential);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('Google Sign In:', result);
        } catch (error) {
            console.error('Error with Google Sign In:', error);
        }
    };
    const handleGithubSignIn = async () => {
        const provider = new GithubAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log('GitHub Sign In:', result);
        } catch (error) {
            console.error('Error with Google Sign In:', error);
        }
    };

    return (
        <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
            <button onClick={handleGithubSignIn}>Sign In with GitHub</button>
        </div>
    );
}

export default AuthComponent;

