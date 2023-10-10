import React from "react"
import { Link } from "react-router-dom";

export default function Home() {
    // useEffect(() => {
    //     for(let x=0; x < 5; x++)
    //     {
    //         console.log(x);
    //     }
    // },[])
    return (
        <div className="container">
            <h1 className="text-center">Home Page</h1>
            <div className="text-center">
            <Link className="btn-home" to={"/login"}>Login</Link>
            </div>
        </div>
    );
}