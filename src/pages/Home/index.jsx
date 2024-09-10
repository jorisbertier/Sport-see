import Asidebar from "../../components/Asidebar"
import Bodyweight from '../../assets/images/protein-icon.png';
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
    console.log(user?.keyData.calorieCount)


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
                            <img className="home__statistics__wrapper--icon"src={Bodyweight} alt="Icon bodyweight"/>
                            <div className="home__statistics__wrapper--text">
                                <h3>1930 kcal</h3>
                                <p>Calories</p>
                            </div>
                        </div>
                        <div className="home__statistics__wrapper">
                            <img className="home__statistics__wrapper--icon"src={Bodyweight} alt="Icon bodyweight"/>
                            <div>
                                <div>1930 kcal</div>
                                <div>Calories</div>
                            </div>
                        </div>
                        <div className="home__statistics__wrapper">
                            <img className="home__statistics__wrapper--icon"src={Bodyweight} alt="Icon bodyweight"/>
                            <div>
                                <div>1930 kcal</div>
                                <div>Calories</div>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Home