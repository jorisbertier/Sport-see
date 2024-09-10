import Asidebar from "../../components/Asidebar"
import proteins from '../../assets/images/protein-icon.png';
import calories from '../../assets/images/calories-icon.png';
import carbs from '../../assets/images/carbs-icon.png';
import fat from '../../assets/images/fat-icon.png';
import { useState, useEffect } from "react";

function Home() {

    let [user, setUser] = useState(null)

    useEffect(() => {
        fetch("http://localhost:3000/user/12")
        .then(response => response.json())
        .then(({data: { id, key, keyData, todayScore, userInfos}}) => {
            // console.log(data);
            setUser({ id, key, keyData, todayScore, userInfos});
        })
        .catch(err => console.log("Error fetch", err))
        
    },[])
    console.log(user)


    return (
        <div className="home">
            <Asidebar/>
            <div className="home__wrapper">
                <div className="home__wrapper--banner">
                    <h1>Bonjour <span>Thomas</span></h1>
                    <p> Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
                    
                </div>
                <div className="home__wrapper--statistics">
                    <div className="home__chart"> Chart</div>
                    <div className="home__statistics"> 
                        <div className="home__statistics__wrapper">
                            <img className="home__statistics__wrapper--icon"src={calories} alt="Icon bodyweight"/>
                            <div className="home__statistics__wrapper--text">
                                <h3>{user?.keyData.calorieCount} kcal</h3>
                                <p>Calories</p>
                            </div>
                        </div>
                        <div className="home__statistics__wrapper">
                            <img className="home__statistics__wrapper--icon"src={proteins} alt="Icon bodyweight"/>
                            <div className="home__statistics__wrapper--text">
                                <h3>{user?.keyData.proteinCount}g</h3>
                                <p>Protéines</p>
                            </div>
                        </div>
                        <div className="home__statistics__wrapper">
                            <img className="home__statistics__wrapper--icon"src={carbs} alt="Icon bodyweight"/>
                            <div className="home__statistics__wrapper--text">
                                <h3>{user?.keyData.carbohydrateCount}g</h3>
                                <p>Glucides</p>
                            </div>
                        </div>
                        <div className="home__statistics__wrapper">
                            <img className="home__statistics__wrapper--icon"src={fat} alt="Icon bodyweight"/>
                            <div className="home__statistics__wrapper--text">
                                <h3>{user?.keyData.lipidCount}g</h3>
                                <p>Lipides</p>
                            </div>
                        </div>
    
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Home