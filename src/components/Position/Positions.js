import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import apiUrl from './../../apiConfig'
import { ListGroup, Col, Row, Button } from 'react-bootstrap'

const Positions = ({ user, alert, match, portfolio }) => {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${apiUrl}/portfolios`,
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(responseData => {
        setPositions(responseData.data.portfolios[0].positions)
      })
      .catch(() => {
        alert({
          heading: 'Oops',
          message: 'Something went wrong',
          variant: 'danger'
        })
      })
  })

  const positionsJsx = positions.map(position => (
    <ListGroup.Item as="li" key={position.id}>
      <Row>
        <Col sm={6} md={3}>
          <p>{position.ticker}</p>
        </Col>
        <Col sm={6} md={3}>
          <Row>
            {position.volume}
          </Row>
        </Col>
        <Button variant="danger"
          onClick={() => {
            const total = (parseInt(position.price) * parseInt(position.volume))
            axios({
              method: 'DELETE',
              url: `${apiUrl}/positions/${position.id}`,
              headers: {
                'Authorization': `Token token=${user.token}`
              }
            })
              .then(() => {
                alert({
                  heading: 'Good',
                  message: 'The position is closed',
                  variant: 'success'
                })
              })
              .then(() => {
                axios({
                  method: 'GET',
                  url: `${apiUrl}/portfolios/${portfolio.id}`,
                  headers: {
                    'Authorization': `Token token=${user.token}`
                  }
                })
                  .then((res) => {
                    const balance = res.data.portfolio.balance
                    const newBalance = (balance + total)
                    axios({
                      url: `${apiUrl}/portfolios/${portfolio.id}`,
                      method: 'PUT',
                      headers: {
                        'Authorization': `Token token=${user.token}`
                      },
                      data: {
                        'portfolio': {
                          'name': portfolio.name,
                          'balance': newBalance
                        }
                      }
                    })
                  })
              })
              .catch(() => {
                alert({
                  heading: 'Oops',
                  message: 'Something went wrong',
                  variant: 'danger'
                })
              })
          }}>
        Sell
        </Button>
      </Row>
    </ListGroup.Item>
  ))

  return (
    <div>
      <Link to={'/positions'}>
        <Button>Details</Button>
      </Link>
      <ListGroup as="ul">
        <ListGroup.Item as="li">
          <Row>
            <Col sm={6} md={3}>
              <p>Ticker</p>
            </Col>
            <Col sm={6} md={3}>
              <p>Size</p>
            </Col>
          </Row>
        </ListGroup.Item>
        {positionsJsx}
      </ListGroup>
    </div>
  )
}
export default Positions
