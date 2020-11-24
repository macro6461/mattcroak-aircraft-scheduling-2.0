import {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import {getAircrafts, getFlights, sortRotation} from '../actions/index';
import Flights from './Flights/Flights';
import RotationContainer from './Rotation/RotationContainer';
import Aircrafts from './Aircrafts/Aircrafts';
import Banner from './Banner';
import DateControl from './DateControl';
import Timeline from './Timeline';

const FlightStuff = () => {

    const dispatch = useDispatch();

    const limit = useSelector(state=>state.limit)
    const offset = useSelector(state=>state.offset)
    
    useEffect(() => {
        dispatch(getAircrafts())
        dispatch(getFlights({offset, limit}))
    }, []);

    return (
        <div>
            <DateControl/>
            <div className="flexed">
                <Banner/>
            </div>
            <div className="flexed flightStuff">
                <Aircrafts/>
                <RotationContainer/>
                <Flights/>
            </div>
            <div style={{width: 720, display: 'block', margin: 'auto', overflow: 'auto'}}>
                <Timeline/>
            </div>
        </div>
    );
};

export default FlightStuff;