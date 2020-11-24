import { useDispatch, useSelector } from "react-redux";
import {getFlights} from '../../actions/index';
import Flight from './Flight';

const Flights = () =>{

    const dispatch = useDispatch();

    const flights = useSelector(state => state.flights);
    const offset = useSelector(state => state.offset);
    const limit = useSelector(state => state.limit);
    const total = useSelector(state => state.total);
    const isTheEnd = useSelector(state => state.isTheEnd);
    const prevOffset = useSelector(state => state.prevOffset);

    const next = () => {
        var nextVal = offset + 25 > total ? offset : offset + 25  
        dispatch(getFlights({offset: nextVal, limit}))
    };

    const prev = () => {
        var previous = offset - 25
        if (previous >= 0){
            dispatch(getFlights({offset: previous, limit}))
        }
    }

    var v2 = offset === 0 ? 25 : offset + 25

    var v1 = v2 - 25 < 0 ? 0 : v2 - 25

    var countStr = v1 + 1 +  '-' + v2 + ' of ' + total;
    
    if (isTheEnd){
        countStr = total - flights.length + '-' + total 
    }

    return (
        <div className="leftRight">
            <div>
                {flights.length > 0 
                    ? flights.map(flight=>{
                        return <Flight flight={flight} key={flight.id}/>
                    })
                    : <p>No flights found.</p>
                }
            </div>
            <div className="pagination">
                    <button onClick={prev}>
                        Previous
                    </button>
                    <p>{countStr}</p>
                    <button onClick={countStr.indexOf('of') > -1 ? next : undefined}>
                        Next
                    </button>
                </div>
        </div>
    )
};

export default Flights;