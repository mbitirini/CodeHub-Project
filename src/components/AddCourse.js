import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Redirect} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';



function AddCourse() {

  const [redirect, setRedirect] = useState(false);

  const [course, setCourse] = useState(
    {
      "id": "",
      "title": "",
      "imagePath": "",
      "price": {
        "normal": 0,
        "early_bird": 0
      },
      "dates": {
        "start_date": "",
        "end_date": ""
      },
      "duration": "",
      "open": false,
      "instructors": [],
      "description": ""
    }
  );
  
  const handleChange = (event) => {
        setCourse({...course, [event.target.id]: event.target.value})
  };
  
  const handleChangeOpen = (event) => {
        setCourse({...course, 
          [event.target.id]: event.target.checked})
  
  };
  
  
  const handleChangeInstructors = (event) => {
       const options = course.instructors
  
        if (event.target.checked){
             options.push(event.target.value)
        }
        else {
          let index = options.indexOf(event.target.value);
          options.splice(index, 1);
        }
        setCourse({...course,
          [event.target.id]: options })
  };

  const handleChangeDates = (event) => {
		const dates = course.dates;
		const dates_id = "dates";
		dates[event.target.id] = event.target.value;
		setCourse({...course, 
		[dates_id]: dates})
	};

	const handleChangePrice = (event) => {
		const price = course.price;
		const price_id = "price";
		price[event.target.id] = parseInt(event.target.value);
		setCourse({...course, 
		[price_id]: price})
	};
  
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/courses`, course)
        .then(res => {
            //console.log(res);
            //console.log(res.data);
            setRedirect(true);
        });
    };


    //  REDIRECT TO DASHBOARD WHEN ADD COURSE IS CLICKED
    if (redirect) {
      return <Redirect to='/'/>;
    }
  
    return (
      <React.Fragment>
          <Form onSubmit={handleSubmit} className='p-5 mb-4' style={{backgroundColor: '#f1f1f1'}}>
  
           <h3>Add Course</h3>
  
            <Form.Group onChange={handleChange} controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control placeholder="Title"/>
            </Form.Group>    
  
            <Form.Group onChange={handleChange} controlId="duration">
              <Form.Label>Duration:</Form.Label>
              <Form.Control placeholder="Duration"/>
            </Form.Group>  
  
            <Form.Group onChange={handleChange} controlId="imagePath">
              <Form.Label>Image path:</Form.Label>
              <Form.Control placeholder="Image path"/>
            </Form.Group>  
  
            <Form.Group  controlId="open" onChange={handleChangeOpen} checked={course.open}>
               <Form.Check type="checkbox" label="Bookable" />
            </Form.Group>
  
            <hr/>
  
            <h3>Instructors</h3>
  
            <Form.Group controlId="instructors" onChange={handleChangeInstructors} checked={course.instructors}>
               <Form.Check type="checkbox" label="John Tsevdos" name="01" value="01"  />
               <Form.Check type="checkbox" label="Yannis Nikolakopoulos" name="02" value="02" />
            </Form.Group>
           
            <hr/>
  
            <Form.Group onChange={handleChange} controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control placeholder="" as="textarea" rows="2"/>
            </Form.Group>  
  
            <hr/>
  
            <h3>Dates</h3>
  
            <Form.Group onChange={handleChangeDates} controlId="start_date">
              <Form.Label>Start date:</Form.Label>
              <Form.Control placeholder="Start date"/>
            </Form.Group>  
  
            <Form.Group onChange={handleChangeDates} controlId="end_date">
              <Form.Label>End date:</Form.Label>
              <Form.Control placeholder="End date"/>
            </Form.Group> 
  
            <hr/>
  
            <Form.Group onChange={handleChangePrice} controlId="early_bird">
              <Form.Label>Early Bird:</Form.Label>
              <Form.Control placeholder="0"/>
            </Form.Group>  
  
            <Form.Group onChange={handleChangePrice} controlId="normal">
              <Form.Label>Normal Price:</Form.Label>
              <Form.Control placeholder="0"/>
            </Form.Group> 
  
            <hr/>
  
            <Form.Group>
               <Button type="submit" className="btn btn-primary float-right"> Add Course</Button>
            </Form.Group>
            
  
          
          </Form>
      </React.Fragment>
    );
     
            
}
  
  export default AddCourse;