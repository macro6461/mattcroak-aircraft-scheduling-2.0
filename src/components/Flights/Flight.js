import {useDispatch, useSelector} from 'react-redux';
import {addToRotation, removeFromRotation} from '../../actions/index';

const Flight = ({flight}) =>{

    const {
        id,
        departuretime,
        arrivaltime,
        readable_departure,
        readable_arrival,
        origin,
        destination
    } = flight;

    const inRotation = useSelector(state=>state.inRotation);
    const rotations = useSelector(state=>state.rotations);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (!inRotation[id]){
            dispatch(addToRotation(flight))
        }
    };

    var isEligible = true

    if (!inRotation[id]){
        for (var i = 0; i < rotations.length; ++i){
              //1200 20 mins times 60 seconds. Check if arrival time plus 20 mins is after departure time. 
            if (rotations[i].arrivaltime + 1200 > departuretime){
                isEligible = false
                break
            }
        }
    }

    return (
        <div key={'flight-' + id} className={inRotation[id] ? "item chosen" : 'item'} onClick={isEligible ? handleClick : undefined} style={{
            borderBottom: `solid 1px ${inRotation[id] ? 'white' : '#001f3d'}`
            }}>
                <div className="flightMask" style={{display: !isEligible ? 'block' : 'none'}}/>
            <p>{id}</p>
            <div className="flightInner">
                <div>
                    <p>{origin}</p>
                    <p>{readable_departure}</p>
                </div>
                <div>
                    <p>{destination}</p>
                    <p>{readable_arrival}</p>
                </div>
            </div>
        </div>
    )
};

export default Flight;