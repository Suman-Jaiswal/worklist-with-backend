import React from "react";

function Icon({ para }) {

    return (
        <>
            {
                para === 1 ?
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        enableBackground="new 0 0 512 512"
                        version="1.1"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        fill='#fff'
                        height='40'
                    >
                        <path d="M256 0c-23.9 0-40.8 16.9-49.1 37.9H47.4V512h417.2V37.9H305.1C296.8 16.9 279.9 0 256 0zm0 37.9c10.4 0 19 8.5 19 19v19h56.9v37.9H180.1V75.9H237v-19c0-10.4 8.6-19 19-19zm-170.7 38h56.9v75.9h227.6V75.9h56.9v398.2H85.3V75.9zm38 132.7v37.9h37.9v-37.9h-37.9zm75.8 0v37.9h189.6v-37.9H199.1zm-75.8 75.8v37.9h37.9v-37.9h-37.9zm75.8 0v37.9h189.6v-37.9H199.1zm-75.8 75.9v37.9h37.9v-37.9h-37.9zm75.8 0v37.9h189.6v-37.9H199.1z"></path>
                    </svg>
                    :
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        fill="gray"
                        enableBackground="new 0 0 512 512"
                        version="1.1"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        width='200'
                        height={300}
                    >
                        <g transform="matrix(1, 0, 0, 1, 72.149995, 0)">
                            <path d="M111.7 55.9 L0 55.9 0 512 367.7 512 367.7 55.9 256 55.9 256 71.7 351.9 71.7 351.9 496.2 15.8 496.2 15.8 71.7 111.7 71.7z"></path>
                            <path d="M216 40L224.3 40 224.3 0 144.3 0 144.3 31.7 113.6 31.7 94 111.7 274.6 111.7 254.1 31.7 216 31.7 216 40 224.3 40 216 40 216 48.4 242 48.4 254.1 95.9 114.5 95.9 126.6 48.4 160.1 48.4 160.1 15.8 207.6 15.8 207.6 48.4 216 48.4z"></path>
                        </g>
                    </svg>
            }
        </>
    );
}

export default Icon;