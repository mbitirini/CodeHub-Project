import React, {useState, useEffect}  from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FcInfo } from 'react-icons/fc';
import { BsCheck, BsX } from 'react-icons/bs';
import Moment from 'moment';
import {Link} from "react-router-dom";

import axios from "axios";


const Welcome = () => {
    return (
        <Jumbotron className='mt-4'>
            <h1>Welcome to CodeHub Dashboard!</h1>
            <p style={{fontSize: "20px"}}>Manage everything and have fun!</p>    
        </Jumbotron>
    );
}

const Statistics = () => {
    const [stats, setStats] = useState([]);

        useEffect(() => {
            axios.get(`http://localhost:3001/stats`)
            .then(res => {
                const stats = res.data;
                setStats(stats);
            });
        }, [])

    return (
        <React.Fragment>
                <Row>
                <Col md={1}></Col> 
                {stats.map(stat => {
                    return (
                        <div key={stat.id}>
                          <Col md={1}></Col>      
                            <Col md={2}>
                              <Card style={{ width: '15rem' , height: '4rem'}} className="text-center">
                                    <Card.Body style={{ textTransform: 'uppercase'}}>{stat.title}: {stat.amount}</Card.Body>
                               </Card>
                            </Col>
                        </div>
                    )
                    })
                }
                </Row>
        </React.Fragment>
    );      
}

const Courses = () => {
    const [courses, setCourses] = useState([]);

        useEffect(() => {
            axios.get(`http://localhost:3001/courses`)
            .then(res => {
                const courses = res.data;
                setCourses(courses);
            });
        }, [])


        // if there are more than 5 courses, show the last 5 with slice
        // else, show them all
        if (courses.length > 5) {
            return (
                <div>
                    <h4 className="m-4">Last 5 Courses</h4>
                    <Table striped hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Bookable</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {courses.slice(courses.length - 5, courses.length).map(course => {
                        const isOpen = course.open;
                        return (
                            <tr key={course.id}>
                                <td><FcInfo /> </td>
                                <td>{course.title}</td>
                                <td>{isOpen ? <BsCheck /> : <BsX />}</td>
                                <td>{course.price.normal}</td>
                                <td> {Moment(course.dates.start_date).format('DD/MM/YYYY')} - {Moment(course.dates.end_date).format('DD/MM/YYYY')} </td>
                                <td>
                                    <Link to={
                                        {     
                                            pathname: '/coursedetails',
                                            state: course
                                        }
                                    }> 
                                        <Button variant="info">View details</Button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </Table>
                <div className="text-center mt-3"> 
                        <Link to="/courses">
                           <Button variant="primary" size="lg">View All Courses</Button>
                        </Link>  
                </div>  
                </div>
            )
        }
        else {
            return (
                <div>
                    <h4 className="m-4">Last 5 Courses</h4>
                    <Table striped hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Bookable</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {courses.map(course => {
                        const isOpen = course.open;
                        return (
                            <tr key={course.id}>
                                <td><FcInfo /> </td>
                                <td>{course.title}</td>
                                <td>{isOpen ? <BsCheck /> : <BsX />}</td>
                                <td>{course.price.normal} €</td>
                                <td>{Moment(course.dates.start_date).format('DD/MM/YYYY')} - {Moment(course.dates.end_date).format('DD/MM/YYYY')}</td>
                                <td>
                                    <Link to={
                                        {     
                                            pathname: '/coursedetails',
                                            state: course
                                        }
                                    }> 
                                        <Button variant="info">View details</Button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })
                    
                    }
                    </tbody>
                </Table>

                <div className="text-center mt-3"> 
                        <Link to="/courses">
                           <Button variant="primary" size="lg">View All Courses</Button>
                        </Link>  
                </div> 
            </div>   
            )
        }
}


function Dashboard () {
    return (
        <React.Fragment>
            <Welcome />
            <Statistics/>
            <br />
            <br />
            <br />
            <Courses />
         </React.Fragment>
    )
}

export default Dashboard