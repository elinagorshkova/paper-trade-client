import React from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const FormO = ({ user, alert, handleChange, handleSubmit, ticker, volume, price, side, balance }) => (
  <div>
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col lg={3}>
          <Form.Group controlid="ticker">
            <Form.Label>Ticker</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ticker"
              name="ticker"
              onChange={handleChange}
              value={ticker}
              required
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group controlid="volume">
            <Form.Label>Volume</Form.Label>
            <Form.Control
              type="number"
              placeholder="Volume"
              name="volume"
              onChange={handleChange}
              value={volume}
              required
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group controlid="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleChange}
              value={price}
              required
            />
          </Form.Group>
        </Col>
        <Col lg={3}>
          <Form.Group controlid="side">
            <Form.Label>Side</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              type="text"
              name="side"
              required
              value={side}
            >
              <option>{'Long'}</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button varian="primary" type="submit">Submit</Button>
    </Form>
  </div>
)

export default FormO
