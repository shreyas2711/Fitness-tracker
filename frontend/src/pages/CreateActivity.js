import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createActivity } from '../redux/actions/activityAction';
import './CreateActivity.css'
import NavbarComp from '../components/NavbarComp';

export default function CreateActivity() {

const dispatch = useDispatch();

// const {loading, success,error} = useSelector((state)=>state.activities);


const [formData,setFormData] = useState({
  activityType:'',
  duration:'',
  caloriesBurned:'',
});

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};


const handleSubmit=(e)=>{

  e.preventDefault();
  dispatch(createActivity(formData));
  setFormData({
    activityType: '',
      duration: '',
      caloriesBurned: '',
  })
}

  return (
    <>
    {/* <NavbarComp/> */}
    <div className="create-task-body-act">
    <form className='form-act' onSubmit={handleSubmit}>
    <div>
        <label htmlFor="activityType">Activity:</label>
        <input style={{marginLeft:'67px',height:'28px',marginTop:'1rem',width:'21rem'}} className='enter-input' type="text" id="activityType" name="activityType" value={formData.activityType} onChange={handleInputChange} />
      </div>
    <div>
        <label htmlFor="duration">Duration:</label>
        <input style={{marginLeft:'58px',height:'28px',marginTop:'1rem',width:'21rem'}} className='enter-input'  type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} />
      </div>
    <div>
        <label htmlFor="caloriesBurned">Calories Burned:</label>
        <input style={{marginLeft:'9px',height:'28px',marginTop:'1rem',width:'21rem'}} className='enter-input'  type="text" id="caloriesBurned" name="caloriesBurned"   value={formData.caloriesBurned} onChange={handleInputChange} />
      </div>
      <button className='submit-class' type="submit" onClick={handleSubmit}>Submit</button>
      </form>

    </div>
    </>
  )
}
