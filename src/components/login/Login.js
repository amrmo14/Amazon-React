import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";
import { UserContext } from "../context/userContext";
import { collection, query, orderBy, onSnapshot, doc, getDocs } from "firebase/firestore"
import { db } from "../firebase";
import { updateDoc } from "firebase/firestore";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useHistory();
    const { isUser, userId, setUserId, setIsUser } = useContext(UserContext);
    const [done, setDone] = useState(true)

    function GoHome() {
        navigate.push("/")
    }
    const fetchUsers = async () => {
        const response = collection(db, 'users');
        const data = await getDocs(response)
        data.docs.forEach(item => {
            const taskDocRef = doc(db, 'users', item.id)
            console.log("from useEffect")
            try {
                updateDoc(taskDocRef, {
                    id: item.id,
                    ...item.data()
                })

            } catch (err) {
                alert(err)
            }
        })

        if (loading) {
            return
        }
        if (user) {
            if (done) {
                const response = collection(db, 'users');
                const data = await getDocs(response)
                data.docs.forEach(item => {
                    // console.log(docc.id,docc.data())
                    if (user.uid == item.data().uid) {
                        console.log(item.id)
                        setUserId(item.id)
                        setDone(false)
                    }
                })
            }

        }

        setIsUser(true)

        GoHome()
        console.log("user", user)
        // setUserId('5xxvgWdGkQF0xtVn29kh')
    };

    useEffect(() => {


        fetchUsers()


    }, [user]);
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