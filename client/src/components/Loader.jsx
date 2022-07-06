import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loader() {
    return (
        <div style={{
            position: 'absolute',
            top: "50vh",
            left: "48vw"
        }}>

            <PropagateLoader color='white' />
        </div>
    )
}
