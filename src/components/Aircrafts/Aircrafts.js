import { useDispatch, useSelector } from "react-redux";
import Aircraft from './Aircraft';

const Aircrafts = () =>{

    const aircrafts = useSelector(state => state.aircrafts);

    return (
        <div className="leftRight">
            {aircrafts.length > 0 
                ? aircrafts.map(aircraft=>{
                    return <Aircraft aircraft={aircraft} key={aircraft.ident}/>
                })
                : <p>No aircrafts found.</p>
            }
        </div>
    )
};

export default Aircrafts;