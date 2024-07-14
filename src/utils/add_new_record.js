import React, { useEffect, useState } from 'react';
import { axiosInstance as axios } from '../axiosConfig';
import { Form, Button } from 'react-bootstrap';
import { formatDateForBackend } from '../utils/tools';

const defaultNewRecords = {
    Bills:  {
        CustomerProviderUtilityID: '',
        IssueDate: '',
        AmountBilled: '',
        AmountConsumed: '',
        PaymentDeadline: '',
        PaymentDate: '',
        Status: 'Unpaid',
        StartPeriod: '',
        EndPeriod: ''
    },
};

function NewRecord({ tableName }) {
    // const tableRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [record, setRecord] = useState([]);
    const [newRecord, setNewRecord] = useState(defaultNewRecords[tableName]);

    useEffect(() => {

        if (!defaultNewRecords[tableName]) {
            console.error(`Table ${tableName} is not defined in defaultNewRecords`);
            return;
        }

        const fetchTable = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/${tableName.toLowerCase()}`, { timeout: 10000, signal: AbortSignal.timeout(5000) });
                setRecord(response.data);
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

        fetchTable();
    }, [tableName]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Convert dates to the format required by the backend
        const formattedRecord = {
            ...newRecord,
            IssueDate: formatDateForBackend(newRecord.IssueDate),
            PaymentDeadline: formatDateForBackend(newRecord.PaymentDeadline),
            PaymentDate: newRecord.PaymentDate ? formatDateForBackend(newRecord.PaymentDate) : null,
            StartPeriod: formatDateForBackend(newRecord.StartPeriod),
            EndPeriod: formatDateForBackend(newRecord.EndPeriod),
        };
        console.log(formattedRecord.PaymentDate);
        
        try {
            const response = await axios.post(`/api/${tableName.toLowerCase()}`, formattedRecord, { timeout: 10000, signal: AbortSignal.timeout(5000) });
            setRecord([...record, response.data]);
            setNewRecord(defaultNewRecords[tableName]);
        } catch (error) {
            console.error(`Error adding new record in table ${tableName}:`, error);
        } finally {
            setLoading(false);
        }
    };

    if (!defaultNewRecords[tableName]) {
        return <div>Table {tableName} is not defined</div>;
    }

    return (
        <Form onSubmit={handleSubmit}>
            {Object.keys(defaultNewRecords[tableName]).map((field) => (
                <Form.Group className="mb-3" key={field}>
                    <Form.Label>{field}</Form.Label>
                    <Form.Control
                        type={(field.includes('Date') ||field.includes('Period') ||field.includes('Deadline'))  ? 'date' : field.includes('Amount') ? 'number' : 'text'}
                        name={field}
                        value={newRecord[field]}
                        onChange={handleInputChange}
                        required={field !== 'PaymentDate'}
                    />
                </Form.Group>
            ))}
            <Button variant="primary" type="submit" disabled={loading}>
                {loading ? 'Loading…' : 'Add Bill'}
            </Button>
        </Form>
    );
}

export default NewRecord;
