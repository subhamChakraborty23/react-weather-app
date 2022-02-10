import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Figure,
  Badge,
} from "react-bootstrap";

const SearchPage = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [forecasts, setForecasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(latitude, longitude);

    try {
      const response = await axios.get(
        `https://api.weather.gov/points/${latitude},${longitude}`
      );
      console.log(response.data.properties.forecast);
      const response2 = await axios.get(response.data.properties.forecast);
      console.log(response2.data.properties.periods);
      setForecasts(response2.data.properties.periods);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h3>Search weather information using location coordinates</h3>
          </Col>
        </Row>
      </Container>
      <>
        <Form>
          <Row>
            <Col>
              <Form.Control
                id="lat"
                placeholder="Latitude"
                onChange={(e) => {
                  setLatitude(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Form.Control
                id="long"
                placeholder="Longitude"
                onChange={(e) => {
                  setLongitude(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Forecast
              </Button>
            </Col>
          </Row>
        </Form>
      </>
      {isLoading ? (
        <></>
      ) : (
        <Container fluid>
          <Row>
            <Col>
              <h1>Forecasts</h1>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col></Col>
            <Col md="auto">
              <ListGroup>
                {forecasts.map((forecast, index) => {
                  return (
                    <ListGroup.Item
                      key={index}
                      className="d-flex justify-content-between align-items-start"
                    >
                      <Container>
                        <Row>
                          <Col>
                            <h3>{forecast.name}</h3>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Figure>
                              <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src={forecast.icon}
                              />
                              <Figure.Caption>
                                {forecast.shortForecast}
                              </Figure.Caption>
                            </Figure>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>Description : {forecast.detailedForecast}</p>
                            <p>
                              Temperature : {forecast.temperature}{" "}
                              {forecast.temperatureUnit}
                            </p>
                            <p>
                              Wind Speed : {forecast.windSpeed} Wind Direction :{" "}
                              {forecast.windDirection}
                            </p>
                            <p>
                              {" "}
                              Start Time : {forecast.startTime} End Time :{" "}
                              {forecast.endTime}
                            </p>
                          </Col>
                        </Row>
                      </Container>

                      {/* "number": 1,
                        "name": "Today",
                        "startTime": "2022-02-10T07:00:00-06:00",
                        "endTime": "2022-02-10T18:00:00-06:00",
                        "isDaytime": true,
                        "temperature": 55,
                        "temperatureUnit": "F",
                        "temperatureTrend": null,
                        "windSpeed": "5 to 20 mph",
                        "windDirection": "W",
                        "icon": "https://api.weather.gov/icons/land/day/sct?size=medium",
                        "shortForecast": "Mostly Sunny",
                        "detailedForecast": "Mostly sunny, with a high near 55. West wind 5 to 20 mph, with gusts as high as 30 mph." */}
                      <hr />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default SearchPage;
