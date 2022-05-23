import React from 'react'
import {Container , Row ,Col} from "react-bootstrap"

function FormContainer({children}) {
  return (
    <Container className='signin'>
    <Row className='justify-content-md-center'>
      {/* 12 6 */}
    <Col xs={14} md={8}>
        {children}
    </Col>
    </Row>
    </Container>
  )
}

export default FormContainer