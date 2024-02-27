import SubHeader from "../Common/Header/SubHeader";
import Box from "@mui/material/Box";
import {useRef} from "react";
import {GRAFANA_URL} from "../../api/apiService";
import Labels from "../../constants/Labels";


const Reports = () => {

    function getBoxStyles() {
        console.log("raporty");
        console.log(GRAFANA_URL);

        return {
            height: 800,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: '100',
            '& .blank': {
                backgroundColor: '#f1f1f1',
                color: '#f1f1f1',
            },
            '& .blank-delayed': {
                backgroundColor: '#F97A7A',
                '&:hover': {
                    backgroundColor: '#F97A7A',
                },
            },
            '& .blank-expired': {
                backgroundColor: '#E0E0E0',
                '&:hover': {
                    backgroundColor: '#E0E0E0',
                },
            }
        };
    }

    const iframeRef = useRef(null);

    // Function to hide the div inside the iframe
    const hideDivInIframe = () => {
        // Check if the iframeRef is not null
        if (iframeRef.current) {
            // Access the contentDocument of the iframe
            // @ts-ignore
            const iframeDocument = iframeRef.current.contentDocument;

            // Check if the iframeDocument is not null
            if (iframeDocument) {
                // Access and hide the div element inside the iframe
                const divInsideIframe = iframeDocument.querySelector('.css-11s8juy');
                if (divInsideIframe) {
                    divInsideIframe.style.display = 'none';
                }
            }
        }
    };

    return (

        <>
            <SubHeader title={Labels.REPORTS} />
            <Box sx={{width: '100%'}}>
                <Box sx={getBoxStyles()}>
                    <iframe
                        src={GRAFANA_URL}
                        width="100%"
                        height="750px"
                        frameBorder="0"
                        style={{marginTop: "-120px", zIndex: "-100"}}
                    >
                    </iframe>
                </Box>
            </Box>

        </>


    )
}

export default Reports;
