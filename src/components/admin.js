import React, { useState } from 'react';

const backend_api = process.env.REACT_APP_BACKEND_URL+':'+process.env.REACT_APP_BACKEND_PORT+process.env.REACT_APP_BACKEND_API_TRUNK;

const test_api = async() => {

    // Example using fetch API
    const backend_api = process.env.REACT_APP_BACKEND_URL+':'+process.env.REACT_APP_BACKEND_PORT+process.env.REACT_APP_BACKEND_API_TRUNK;
    // fetch(backend_api)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     });
    console.log('Backend API: ' + backend_api);

    fetch(backend_api)
        .then(response => response.json())
        .then(data => {
            const billsDiv = document.getElementById('bills');
            data.forEach(bill => {
                const billElement = document.createElement('div');
                billElement.innerText = `Utility: ${bill.UtilityID}, Amount: ${bill.AmountBilled}`;
                console.log(billElement);
                billsDiv.appendChild(billElement);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

function AddBill() {
    
    const addBill_url = backend_api + '/bills';

    const [formData, setFormData] = useState({
        UtilityID: '',
        IssueDate: '',
        AmountBilled: '',
        AmountConsumed: '',
        PaymentDeadline: '',
        PaymentDate: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(addBill_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <form onSubmit={handleSubmit}>
        <label htmlFor="UtilityID">Utility Type:</label>
        <input
            type="text"
            id="UtilityID"
            name="UtilityID"
            value={formData.UtilityID}
            onChange={handleChange}
        /><br/>

        <label htmlFor="IssueDate">Issue Date:</label>
        <input
            type="date"
            id="IssueDate"
            name="IssueDate"
            value={formData.IssueDate}
            onChange={handleChange}
        /><br/>

        <label htmlFor="AmountBilled">Amount Billed:</label>
        <input
            type="number"
            id="AmountBilled"
            name="AmountBilled"
            value={formData.AmountBilled}
            onChange={handleChange}
        /><br/>

        <label htmlFor="AmountConsumed">Amount Consumed:</label>
        <input
            type="number"
            id="AmountConsumed"
            name="AmountConsumed"
            value={formData.AmountConsumed}
            onChange={handleChange}
        /><br/>

        <label htmlFor="PaymentDeadline">Payment Deadline:</label>
        <input
            type="date"
            id="PaymentDeadline"
            name="PaymentDeadline"
            value={formData.PaymentDeadline}
            onChange={handleChange}
        /><br/>

        <label htmlFor="PaymentDate">Payment Date:</label>
        <input
            type="date"
            id="PaymentDate"
            name="PaymentDate"
            value={formData.PaymentDate}
            onChange={handleChange}
        /><br/>

        <button type="submit">Add Bill</button>
        </form>
    );
};

export default AddBill;
