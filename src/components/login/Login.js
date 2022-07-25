import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { UserContext } from "../context/userContext";
import { collection, query, orderBy, onSnapshot, doc, getDoc } from "firebase/firestore"
import { db } from "../firebase";
import { updateDoc } from "firebase/firestore";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useHistory();
    const { isUser, userId, setUserId, setIsUser } = useContext(UserContext);

    function GoHome() {
        navigate.push("/")
    }
    useEffect(() => {
        const q = query(collection(db, 'users'))
        
        onSnapshot(q, (querySnapshot) => {
            // console.log(querySnapshot.docs[0].id)
          querySnapshot.docs.map(docc => {
            // console.log(docc.id,docc.data())
            const taskDocRef = doc(db, 'users', docc.id)
            try{
               updateDoc(taskDocRef, {
                id: docc.id,
                ...docc.data()
              })
             
            } catch (err) {
              alert(err)
            }    
        })
        })
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            onSnapshot(q, (querySnapshot) => {
                // console.log(querySnapshot.docs[0].id)
              querySnapshot.docs.map(docc => {
                // console.log(docc.id,docc.data())
                if(user.uid==docc.data().uid){
                    console.log(docc.id)
                    setUserId(docc.id)
                }
            })
            })
            
            setIsUser(true)
            
            GoHome() 
            console.log("user",user)
            setUserId('5xxvgWdGkQF0xtVn29kh')
        };
    }, [user, loading]);
    return (
        <div className="login row my-5">


            <div className="login__container col-3 p-5">
                <img className="logo__link" src={require("./../../assets/amazon_white.png")} />
                <h2>Sing-In</h2>

                <input
                    type="text"
                    className="login__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login__textBox"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login__btn"
                    onClick={() => logInWithEmailAndPassword(email, password)}
                >
                    Signin
                </button>
                <button className="login__btn login__google" onClick={signInWithGoogle}>
                    Login with Google
                </button>

                <div>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}
export default Login;