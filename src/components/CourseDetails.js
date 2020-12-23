import React, {useState, useEffect}  from "react";
import {useLocation, Redirect} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { BsCheck, BsX } from 'react-icons/bs';
import {Link} from "react-router-dom";
import Moment from 'moment';
import axios from "axios";




function Details () {
    const [redirect, setRedirect] = useState(false);
    let location = useLocation();
    const isOpen = location.state.open;
    const courseInstructorsID = location.state.instructors;

    const [instructors, setInstructors] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:3001/instructors`)
        .then(res => {
            const instructors = res.data;
            setInstructors(instructors);
        });
    }, [])

    // filter the instructors array to pass only those who do the course
    const courseInstructors = instructors.filter(function(item){
        return !(courseInstructorsID.indexOf(item.id) === -1);
    });



    const [deleteModal, setDeleteModal] = useState(false);

    const handleDeleteModal = () => setDeleteModal(true);

    const handleClose = () => setDeleteModal(false);

 
    const handleDelete = (e) => {
        e.preventDefault();
        axios.delete(`http://localhost:3001/courses/` + location.state.id)
        .then(res => {
            setRedirect(true);
        });
    }

     //  REDIRECT TO ALL COURSES PAGE WHEN UPDATE IS CLICKED
     if (redirect) {
        return <Redirect to='/courses'/>;
     }

    return (
        <Container className="ml-2">
            <Row>
                <Col><h1>{location.state.title} ({location.state.id})</h1></Col>
            </Row>
            <br />
            <br />
            <Row>
                <Col>
                    <Image style={{ width: '30rem' }} src={location.state.imagePath} />
                </Col>
                <Col>   
                        <div style={{fontSize: '20px'}} className="mt-2">
                            <p dangerouslySetInnerHTML={ {__html: location.state.description}} />
                        </div>
                        <br />
                        <p style={{fontSize: '18px'}}>Price: {location.state.price.normal}€</p>
                        <p style={{fontSize: '18px'}}>Bookable: {isOpen ? <BsCheck /> : <BsX />}</p>
                        <p style={{fontSize: '18px'}}>Duration: {location.state.duration}</p>
                        <p style={{fontSize: '18px'}}>Dates: {Moment(location.state.dates.start_date).format('DD/MM/YYYY')} - {Moment(location.state.dates.end_date).format('DD/MM/YYYY')}</p>
                </Col>
            </Row>
            <br />
            <Row >
                <Col>
                     {/* EDIT COURSE BUTTON  */}
                     <Link to={
                                        {     
                                            pathname: '/editcourse',
                                            state: location.state
                                        }
                                    }> 
                                        <Button variant="primary" size="lg" >Edit</Button>{' '}
                    </Link>


                    {/* DELETE COURSE BUTTON */}
                    <Button variant="danger" size="lg" onClick={handleDeleteModal}>Delete</Button>
                    <Modal show={deleteModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Course</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete the {location.state.title} course?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                   
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
                <Col>
                    <h1>Instructors</h1>
                    <br />
                    {courseInstructors.map(instructor => {
                        return (
                            <div key={instructor.id}>
                                <h3>{instructor.name.first} {instructor.name.last} <span style={{fontWeight: "50"}}>({Moment(instructor.dob).format('DD/MM/YYYY')})</span></h3>
                                <p style={{fontSize: '18px'}}>Email: <a href={instructor.email}>{instructor.email}</a> | <a href={instructor.linkedin}>LinkedIn</a></p>
                                <p style={{fontSize: '18px'}}>{instructor.bio}</p>
                                <br />
                            </div>
                        )
                    })}
                    
                </Col>
            </Row>


            
        </Container>
    )
}



function CourseDetails () {
    return (
        <React.Fragment>
            <br />
            <Details />
        </React.Fragment>
    )
}

export default CourseDetails;