import React, { useRef, useEffect, useState } from 'react';
import { axiosInstance as axios } from '../axiosConfig';
import { Accordion, Container } from 'react-bootstrap';

import { LoadingPage , formatDate } from '../utils/tools';

function Providers() {

    const providersTableRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [providersInfo, setProvidersInfo] = useState([]);

    useEffect(() => {
        const fetchMeters = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/providers', { timeout: 10000, signal: AbortSignal.timeout(5000) });
                setProvidersInfo(response.data);
            } catch (error) {
                if (error.code === 'ECONNABORTED') {
                    console.error('Request timed out:', error);
                } else {
                    console.error('Error fetching meters info:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMeters();
    }, []);

    return (
        <Container>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <div type ="button" className="btn btn-outline-primary">
                            Click here to see information about Utility Providers
                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
                            {loading ? <LoadingPage/> :
                                <table ref={providersTableRef} className="table table-hover table-bordered">
                                    <thead className="table-info align-middle" data-bs-toggle="tooltip" data-bs-placement="left" title="Scroll left to see more information">
                                        <tr>
                                            <th> Utility (ID) </th>
                                            <th> Provider Name </th>
                                            <th> Last Updated </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-light" data-bs-toggle="tooltip" data-bs-placement="left" title="Scroll down to see more data">
                                        {(providersInfo.map((meter) => (
                                            <tr key={meter.id}>
                                                <td> {meter.UtilityID} </td>
                                                <td> {meter.ProviderName} </td>
                                                <td> {formatDate(meter.updatedAt).date} </td>
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
                                WIP: Opens up form(ik) to add a new provider...
                            </Accordion.Body>
                        </Accordion.Item>
            </Accordion>
        </Container>
    );
}

export default Providers;

