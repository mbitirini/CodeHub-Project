import React, {useState, useEffect}  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsCheck, BsX } from 'react-icons/bs';
import {Link} from "react-router-dom";
import Moment from 'moment';
import axios from "axios";

function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/courses`)
        .then(res => {
            const courses = res.data;
            setCourses(courses);
        });
    }, [])

    return (
        <React.Fragment>
            <br/>
            <h1 className="ml-3">All Courses</h1>
            <br/>
            <Row className="ml-3 ml-lg-0">
            {courses.map(course => {
                const isOpen = course.open;
                return (
                    <div key={course.id}>
                        <Col md = {4}>
                         <Card style={{ width: '25rem' }} className="mb-5">
                            <Card.Header as="h5">{course.title}</Card.Header>
                            <Card.Body>
                                <Card.Img variant="top" src={course.imagePath} className="mb-3"/>
                                <Card.Text>
                                    Price: <span style={{fontWeight: "bold"}}>{course.price.normal}€ </span> 
                                    | Bookable: {isOpen ? <BsCheck /> : <BsX />}
                                </Card.Text>
                                <Card.Text>
                                    Duration: <span style={{fontWeight: "bold"}}>{course.duration}</span>
                                </Card.Text>
                                <Card.Text>
                                    Dates: <span style={{fontWeight: "bold"}}>{Moment(course.dates.start_date).format('DD/MM/YYYY')} - {Moment(course.dates.end_date).format('DD/MM/YYYY')}</span>
                                </Card.Text>
                                <Link to={
                                        {     
                                            pathname: '/coursedetails',
                                            state: course
                                        }
                                    }> 
                                    <Button variant="primary">View</Button>
                                </Link>
                            </Card.Body>
                          </Card>
                          </Col>
                          <Col md={1}></Col> 
                    </div>
                    
                );
            })}
            </Row>
        </React.Fragment>
       
    )
}



                              
                           
        

export default Courses;



