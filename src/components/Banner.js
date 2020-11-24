import {useSelector} from 'react-redux';
import { FaPlaneDeparture, FaClock,FaMapMarkedAlt } from 'react-icons/fa';


const Banner = () => {

    const selectedAircraft = useSelector(state => state.selectedAircraft);

    return (
        <>
            <div className="leftRight banner">
                <p>Aircrafts <FaPlaneDeparture/></p>
            </div>
            <div className="rotation banner"  >
                <p>{selectedAircraft ? 'Rotation ' + selectedAircraft.ident : 'No Rotation Available'} <FaClock/></p>
                <hr/>
            </div>
            <div className="leftRight banner" >
                <p>Flights <FaMapMarkedAlt/></p>
            </div>
        </>
    )
};

export default Banner;