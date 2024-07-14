import React, { useRef, useEffect, useState } from 'react';
import { axiosInstance as axios } from '../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Accordion, Button, ButtonGroup, Dropdown, Table } from 'react-bootstrap';

import { LoadingPage , formatMoney, formatDate } from '../utils/tools';
import { Chart } from 'chart.js/auto'; // Importing Chart.js

// Get list of Utilities:
function Dashboard() {

    const navigate = useNavigate();
    const [utilitySel, setUtility] = useState("Select Utility");
    const [utilityID, setUtilityID] = useState(-1);
    const [customerProviderUtilityID, setCustomerProviderUtilityID] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [utilitiesTable, setUtilities] = useState([]);
    const [bills, setBills] = useState([]);
    const billsTableRef = useRef(null);
    const chartRef = useRef(null);
    let amountBilledChart = useRef(null);

    useEffect(() => {
        const fetchUtilitiesTable = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/utilities', { timeout: 10000, signal: AbortSignal.timeout(5000) });
                setUtilities(response.data);
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
        fetchUtilitiesTable();
    }, []);

    useEffect(() => {
        if (utilityID > 0) {
            const fetchCustomerProviderUtilityID = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`/api/customerproviderutility?UtilityID=${utilityID}`, { timeout: 10000, signal: AbortSignal.timeout(5000) });
                    if (response.data.length > 0) {
                        setCustomerProviderUtilityID(response.data[0].id);
                    } else {
                        setCustomerProviderUtilityID(-1);
                    }
                } catch (error) {
                    if (error.code === 'ECONNABORTED') {
                        console.error('Request timed out:', error);
                    } else {
                        console.error('Error fetching CustomerProviderUtilityID:', error);
                    }
                } finally {
                    setLoading(false);
                }
            };
            fetchCustomerProviderUtilityID();
        }
    }, [utilityID]);

    useEffect(() => {
        if (customerProviderUtilityID > 0) {
            const fetchBills = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`/api/bills?CustomerProviderUtilityID=${customerProviderUtilityID}`, { timeout: 10000, signal: AbortSignal.timeout(5000) });
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
        }
    }, [customerProviderUtilityID]);

    // Render the graph. Require bills to be defined:
    useEffect(() => {
        if (amountBilledChart.current) {
            amountBilledChart.current.destroy();
        }
        if (bills.length > 0 && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            amountBilledChart.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: bills.map(bill => formatDate(bill.IssueDate).date), // Formatting dates for labels
                    datasets: [{
                        label: 'Amount Billed',
                        data: bills.map(bill => bill.AmountBilled),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: true,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Amount Billed Over Time'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    }, [bills]);

   
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <h1>Dashboard</h1>
            </section>
            <section className="content">
                <Dropdown as={ButtonGroup}>
                    <Button variant="primary">{utilitySel}</Button>
                    <Dropdown.Toggle split variant="primary" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                        {(utilitiesTable.map((utility) => (
                            <Dropdown.Item key={utility.id} onClick={() => {   
                                setUtility(utility.UtilityName); 
                                setUtilityID(utility.id);
                                }}>
                                {utility.UtilityName}
                            </Dropdown.Item>
                        )))}
                    </Dropdown.Menu>
                </Dropdown>
            </section>
            {utilityID > 0 && (<>
            <section className='content'>
                {loading ? <LoadingPage /> : <canvas id="amountBilledChart" ref={chartRef}></canvas>}
            <hr/>
            </section>
            <section className='content'>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <div type ="button" className="btn btn-outline-primary">
                                    Click to open historical {utilitySel} bills
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                {loading ? <div><LoadingPage /></div>: (
                                    <Table ref={billsTableRef} striped bordered hover>
                                        <thead>
                                            <tr>
                                                {/* <th>CustomerProviderUtilityID</th> */}
                                                <th>Issue Date</th>
                                                <th>Amount Billed</th>
                                                <th>Amount Consumed (units)</th>
                                                <th>Payment Deadline</th>
                                                <th>Payment Date</th>
                                                <th>Status</th>
                                                <th>Start Period</th>
                                                <th>End Period</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bills.map((bill) => (
                                                <tr key={bill.id}>
                                                    {/* <td>{bill.CustomerProviderUtilityID}</td> */}
                                                    <td>{formatDate(bill.IssueDate).date}</td>
                                                    <td>{formatMoney(bill.AmountBilled)}</td>
                                                    <td>{bill.AmountConsumed} ({utilitiesTable.find(item => item.id === utilityID).UtilityUnits})</td>
                                                    <td>{formatDate(bill.PaymentDeadline).date}</td>
                                                    <td>{bill.PaymentDate ? formatDate(bill.PaymentDate).date : 'N/A'}</td>
                                                    <td>{bill.Status}</td>
                                                    <td>{formatDate(bill.StartPeriod).date}</td>
                                                    <td>{formatDate(bill.EndPeriod).date}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
            </section>
            </>)}
            <section>
            <hr/>
            <Button variant="primary" onClick={() => {navigate('/admin')}}>
                Click here to manage your utilities
            </Button>
            </section>
        </div>
    );
}


export default Dashboard;
