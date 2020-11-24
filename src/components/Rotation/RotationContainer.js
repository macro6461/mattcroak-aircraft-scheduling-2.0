import {useSelector} from 'react-redux';
import Rotation from './Rotation';

const RotationContainer = () =>{

    const selectedAircraft = useSelector(state=>state.selectedAircraft);
    const currentDate = useSelector(state=>state.currentDate);

    //support for more than one aircraft and more than one date
    const rotations = useSelector(state => state.rotations).filter(x=>{
        return x.date === currentDate && x.aircraft === selectedAircraft.ident
    })

    return (
        <div className="rotation">
            {rotations.length > 0 
                ? rotations.map(rotation=>{
                    return <Rotation rotation={rotation} key={rotation.id + '-' + rotation.aircraft}/>
                })
                : <p>Nothing in rotation.</p>
            }
        </div>
    )
};

export default RotationContainer;