import React, { useRef, useEffect, useState } from 'react';
import { axiosInstance as axios } from '../utils/axiosConfig';
import { Accordion, Container } from 'react-bootstrap';

import { LoadingPage, formatDate } from '../utils/tools';

function Utilities() {

    const utilitiesTableRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [utilities, setUtilities] = useState([]);

    useEffect(() => {
        const fetchUtilities = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/utilities', { timeout: 10000, signal: AbortSignal.timeout(5000) });
                setUtilities(response.data);
            } catch (error) {
                if (error.code === 'ECONNABORTED') {
                    console.error('Request timed out:', error);
                } else {
                    console.error('Error fetching utilities info:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUtilities();
    }, []);

    return (
        <Container>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div type ="button" className="btn btn-outline-primary">
                            Click here to see Utilities Details
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
                            {loading ? <LoadingPage/> : 
                                <table ref={utilitiesTableRef} className="table table-hover table-bordered">
                                    <thead className="table-info align-middle" data-bs-toggle="tooltip" data-bs-placement="left" title="Scroll left to see more information">
                                        <tr>
                                            <th> Name (ID) </th>
                                            <th> Units </th>
                                            <th> Last Update </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-light" data-bs-toggle="tooltip" data-bs-placement="left" title="Scroll down to see more data">
                                        {loading ? <LoadingPage/> :(utilities.map((utility) => (
                                        <tr key={utility.id}>

                                            <td> {utility.UtilityName}  ({utility.id} )</td>
                                            <td> {utility.UtilityUnits} </td>
                                            <td> {formatDate(utility.updatedAt).date} </td>
                                        </tr>
                                        )))}
                                    </tbody>
                                </table>
                            }
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                            <Accordion.Header>
                            <div type ="button" className="btn btn-outline-primary">Click here to add new bill</div>
                            </Accordion.Header>
                            <Accordion.Body>
                                WIP: Opens up form(ik) to add a new utility...
                            </Accordion.Body>
                        </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default Utilities;

