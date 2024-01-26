import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNutrition } from '../redux/actions/activityAction';
import './CreateNutrition.css';
import NavbarComp from '../components/NavbarComp';

export default function CreateNutrition() {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.activities);

  const [formData, setFormData] = useState({
    foodItem: '',
    quantity: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add form validation here

    dispatch(createNutrition(formData));
    setFormData({
      foodItem: '',
      quantity: '',
    });
  };

  return (
    <>
      {/* <NavbarComp/> */}
      <div className="create-task-body">
      
        <form className='form-nut'  onSubmit={handleSubmit}>
        {/* <div className="nut-head"> */}
       
        {/* </div> */}
          <div>
            <label htmlFor="foodItem">Food Item:</label>
            <input 
              style={{ marginLeft: '44px', height: '28px', marginTop: '1rem',width:'21rem' }}
              className="enter-input"
              type="text"
              id="foodItem"
              name="foodItem"
              value={formData.foodItem}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              style={{ marginLeft: '58px', height: '28px', marginTop: '1rem',width:'21rem'  }}
              className="enter-input"
              type="text"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className="submit-class" type="submit">
            Submit
          </button>
        </form>

        {loading && <p>Loading...</p>}
        {success && <p>Nutrition created successfully!</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
}
