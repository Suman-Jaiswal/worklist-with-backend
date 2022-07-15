import React from 'react'
import PropagateLoader from "react-spinners/PropagateLoader";

export default function Loader() {
    return (
        <div style={{
            width: "100%",
            marginTop: 150,
            textAlign: "center"
        }}>
            <PropagateLoader color='white' />
        </div>
    )
}
