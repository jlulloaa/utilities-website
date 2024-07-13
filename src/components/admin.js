import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import Bills from './bills';
import Utilities from './utilities';
import Meters from './meters';
import Providers from './providers';

const SpacedBadge = styled(Badge)`
  margin-bottom: 10px;
`;

function Admin() {
    
    const navigate = useNavigate();

    return (
        <>
            <h1> Admin Tab </h1>
            <Container>
                <Stack gap={3} className="col-md-5 mx-auto">
                    <Row>
                        <hr/>
                        <Col>
                            <SpacedBadge bg="secondary">Bills</SpacedBadge>
                            <Bills />
                        </Col>
                        <Col>
                            <SpacedBadge bg="secondary">Utilities</SpacedBadge>
                            <Utilities />
                        </Col>
                    </Row>
                    <Row>
                        <hr/>
                        <Col>
                            <SpacedBadge bg="secondary">Meters</SpacedBadge>
                            <Meters />
                        </Col>
                        <Col>
                            <SpacedBadge bg="secondary">Providers</SpacedBadge>
                            <Providers />
                        </Col>
                    </Row>
                    <Row>
                        <hr/>
                        <Col>
                            <Button variant="primary" onClick={() => {navigate('/dashboard')}}>
                                Click here to access the dashboard
                            </Button>
                        </Col>
                    </Row>
                </Stack>
            </Container>
        </>
    )
}
export default Admin;
