import Yoga from '../../assets/images/yoga.png';
import Bodyweight from '../../assets/images/bodyweight.png';
import Swimming from '../../assets/images/swimming.png';
import Bicycle from '../../assets/images/bicycle.png';

function Asidebar() {
    return (
        <aside>
            <div className='aside__wrapper'>
                <img src={Yoga} alt=''/>
                <img src={Swimming} alt=''/>
                <img src={Bicycle} alt=''/>
                <img src={Bodyweight} alt=''/>
            </div>
            <small>Copyright SportSee 2020 ©</small>
        </aside>
    )
}

export default Asidebar