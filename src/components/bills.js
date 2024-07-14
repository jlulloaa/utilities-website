
import React, { useRef, useEffect, useState } from 'react';
import { axiosInstance as axios } from '../axiosConfig';
import { Accordion, Container} from 'react-bootstrap';

import { LoadingPage, formatMoney, formatDate } from '../utils/tools';
import NewRecord from '../utils/add_new_record';

function Bills() {
    // Because the whole Bills table may get too big, avoid triggering re-rendering by storing it with a useRef hook
    const billsTableRef = useRef(null);

    const [loading, setLoading] = useState(false);
    const [bills, setBills] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/bills', { timeout: 10000, signal: AbortSignal.timeout(5000) });
                setBills(response.data);
            } catch (error) {
                if (error.code === 'ECONNABORTED') {
                    console.error('Request timed out:', error);
                } else {
                    console.error('Error fetching bills:', error);
                }
            } finally {
                setLoading(false);
            }
    };

        fetchBills();
    }, []);

    return (
        <Container>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                    <div type ="button" className="btn btn-outline-primary">
                        Click here to see Historical Bills
                    </div>
                    </Accordion.Header>
                    <Accordion.Body>
                        <div className="table-responsive table-wrapper-scroll-y my-custom-scrollbar">
                            {loading ? <LoadingPage/> : 
                                <table ref={billsTableRef} className="table table-hover table-bordered">
                                    <thead className="table-info align-middle" data-bs-toggle="tooltip" data-bs-placement="left" title="Scroll left to see more information">
                                        <tr>
                                            <th> Utility Name (tbd) </th>
                                            <th> Issue Date  </th>
                                            <th> Amount Billed ($) </th>
                                            <th> Status </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-light" data-bs-toggle="tooltip" data-bs-placement="left" title="Scroll down to see more data">
                                        {(bills.map((bill) => (
                                            <tr key={bill.id}>
                                                <td> {bill.CustomerProviderUtilityID} </td> 
                                                <td> {formatDate(bill.IssueDate).date} </td>
                                                <td> {formatMoney(bill.AmountBilled)} </td>
                                                <td> {bill.Status} </td>
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
                        <NewRecord tableName="Bills" />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};

export default Bills;
