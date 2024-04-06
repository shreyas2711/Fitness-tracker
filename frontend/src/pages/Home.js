import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { nutritionLoadAction } from '../redux/actions/nutritionAction';
import { activityDeleteAction, activityLoadAction } from '../redux/actions/activityAction';
import './Home.css';
import NavbarComp from '../components/NavbarComp';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import { CiSun } from 'react-icons/ci';
import LoadingBox from '../components/LoadingBox';
import CreateActivity from './CreateActivity';
import AddActivity from '../components/AddActivity';
import { userSignOutAction } from '../redux/actions/authAction';

export default function Home() {
  const dispatch = useDispatch();
  let sumcalorie = 0;
  let sumprotein = 0;
  let sumcalorieburnt = 0;
  const { nutritions, loading: nutritionLoading } = useSelector((state) => state.nutritions);
  const { activities, loading: activityLoading } = useSelector((state) => state.activities);

  console.log(activities);
  console.log("this is nutritions:",nutritions);

  const today = new Date();
  const todayDateString = today.toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format

  useEffect(() => {
    console.log("Fetching nutritions...");
    dispatch(nutritionLoadAction());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetching activities...");
    dispatch(activityLoadAction());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched activities:", activities.activity);
  }, [activities]);

  useEffect(() => {
    console.log("Fetched nutritions:", nutritions.nutrition);
  }, [nutritions]);

  if (nutritionLoading || activityLoading) {
    return <LoadingBox />;
  }

  if (!nutritions || !nutritions.nutritions || nutritions.nutritions.length === 0) {
    return <div>No nutrition data available.</div>;
  }

  console.log("Today's date string:", todayDateString);

  let calories = [];
  let protein = [];

  nutritions.nutritions.forEach((nutrition) => {
    if (nutrition.date.split('T')[0] === todayDateString) {
      calories.push(nutrition.caloriesConsumed);
      protein.push(nutrition.protienIntake);
    }
  });

  console.log("Nutritions for today:", calories, protein);

  let calorielength = calories.length;

  for (let i = 0; i < calorielength; i++) {
    sumcalorie = calories[i] + sumcalorie;
    sumprotein = protein[i] + sumprotein;
  }

  console.log("Calories and protein for today:", sumcalorie, sumprotein);

  const caloriesburnt = [];

  console.log("Calories length:", calories.length);

  console.log("today date check:", todayDateString);

  activities.activity.forEach((activity) => {
    const activityDate = activity.date.split('T')[0];
    if (activityDate === todayDateString) {
      caloriesburnt.push(activity.caloriesBurned);
    }
  });

  console.log("Calories burnt for today:", caloriesburnt);

  for (let i = 0; i < caloriesburnt.length; i++) {
    sumcalorieburnt += caloriesburnt[i];
  }

  console.log("Total calories burnt for today:", sumcalorieburnt);

  let remainingcalories = 0;
  if (sumcalorie > 0) {
    remainingcalories = sumcalorie - sumcalorieburnt;
  }

  console.log("Remaining calories for today:", remainingcalories);

  const handleDelete = (activityId) => {
    dispatch(activityDeleteAction(activityId));
  };

  console.log("Activities are",activities);

  return (
    <>
      <NavbarComp />

      <div className="Home-comp">
      
        {/* {calories.length !== 0 ? ( */}
        <h1 style={{marginLeft:'8rem',marginBottom:'-3rem '}}>Overview</h1>
          <div className="first-section">
          <div className="box1">
        <img className='first-section-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEAK0nMixEpZp993ao4bHX9c3kw_4vmhZjd_rEiqlnLQ&s" alt="" />
          <div className="img-heading">
          <h1 style={{fontSize:'19px',fontWeight:'700'}}>Protein: {sumprotein}g</h1></div>
        </div>
        <div className="box2">
        <img className='first-section-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnXLgHHd0_gfiwGqhnuAmBYkzXNRpafzipE_ohrRyU0A&s" alt="" style={{width:'10rem',borderRadius:'10px',opacity:'0.8',height:'118px'}  } />
          <div className="img-heading2">
          <h1 style={{fontSize:'19px',fontWeight:'700',color:'white',fontFamily: 'system-ui'}}>Remaining calories: {remainingcalories}Kcal</h1></div>
        </div>
        <div className="box3">
        <img className='first-section-img' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3ybNvjWlarZ1qpYlP7nKGt620zDEHqksEAcODVQrzgg&s" alt="" style={{width:'10rem',borderRadius:'10px',opacity:'0.8',height:'118px'}  } />
          <div className="img-heading3">
          <h1 style={{fontSize:'19px',fontWeight:'700',color:'white'}}>Calories Consumed: {sumcalorie}Kcal</h1></div>
        </div>
        <div className="box4">
        <img className='first-section-img' src="https://wallpapercave.com/wp/wp3634878.png" alt="" style={{width:'10rem',borderRadius:'10px',opacity:'0.8',height:'118px'}  } />
          <div className="img-heading4">
          <h1 style={{fontSize:'19px',fontWeight:'700',color:'white'}}>Calories burned: {sumcalorieburnt}</h1></div>
        </div>
          </div>
        {/* ) : ( */}
          {/* <CreateNutrition /> */}
        {/* )} */}

        <div className="second-section">
        <div className="second-column" style={{order:'2'}}>
          <CreateActivity/>
        </div>
      
        <div className="first-column">
        <div className="second-heading">
            <h1>Recent activities</h1>
          </div>
          <div className="second-cards">
            {activities.activity.length !== 0 ? (
              activities.activity
                .filter((activity) => activity.date.split('T')[0] === todayDateString)
                .map((activity) => (
                  <div className="sec" key={activity._id}>
                    <button onClick={() => handleDelete(activity._id)}>&#128465;</button>
                    <div className="action">
                      <span className="action-name">{activity.activityType}</span>
                    </div>
                    <div className="active">
                      <AccessAlarmIcon style={{ fontSize: '17px', marginTop: '7px' }}></AccessAlarmIcon>
                      <span style={{ marginRight: '2rem' }}>{activity.duration}</span>
                      <CiSun style={{ fontSize: '17px', marginTop: '10px' }} />
                      <span>{activity.caloriesBurned} Kcal</span>
                    </div>
                  </div>
                ))
            ) : (
              <AddActivity/>
           
              
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
