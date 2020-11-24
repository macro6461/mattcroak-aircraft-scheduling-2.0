import {useDispatch} from 'react-redux';
import {removeFromRotation} from '../../actions/index';
import { FaWindowClose, FaExclamationCircle,FaLongArrowAltRight } from 'react-icons/fa';


const Rotation = ({rotation}) =>{

    const {
        id,
        readable_departure,
        readable_arrival,
        origin,
        destination
    } = rotation;

    const dispatch = useDispatch();

    const handleClick = () =>{
        dispatch(removeFromRotation(rotation))
    };

    return (
        <div key={id} className=' item rot' style={{cursor: 'default'}} >
            <div>
                <p>Flight: {rotation.id}</p>
                    {!rotation.destMatch 
                        ? <div  style={{position: 'absolute', top: 5, left: '50%'}}>
                            <div className="tooltip">
                                <FaExclamationCircle color="red"  style={{cursor: 'pointer'}}/>
                                <span class="tooltiptext">Origin does not match previous destination</span>
                            </div> 
                        </div>
                        : null
                    }
                <div className="flightInner">
                <div>
                    <p>{origin}</p>
                    <p>{readable_departure}</p>
                </div>
                <FaLongArrowAltRight style={{fontSize: 50}}/>
                <div>
                    <p>{destination}</p>
                    <p>{readable_arrival}</p>
                </div>
                <div style={{position: 'absolute', top: 5, right: 10}}>
                <div className="tooltip">
                    <FaWindowClose onClick={handleClick} style={{cursor: 'pointer'}}/>
                    <span class="tooltiptext">Remove from rotation</span>
                </div>
            </div>
            </div>
            </div> 
        </div>
    )
};

export default Rotation;