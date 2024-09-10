import Asidebar from "../../components/Asidebar"
import proteins from '../../assets/images/protein-icon.png';
import calories from '../../assets/images/calories-icon.png';
import carbs from '../../assets/images/carbs-icon.png';
import fat from '../../assets/images/fat-icon.png';
import { useState, useEffect } from "react";
import StaticalCard from "../../components/StaticalCard";

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
    console.log(user?.userInfos)


    return (
        <div className="home">
            <Asidebar/>
            <div className="home__wrapper">
                <div className="home__wrapper--banner">
                    <h1>Bonjour <span>{user?.userInfos.firstName}</span></h1>
                    <p> Félicitation ! Vous avez explosé vos objectifs hier 👏 </p>
                </div>
                <div className="home__wrapper--statistics">
                    <div className="home__chart"> Chart</div>
                    <div className="home__statistics"> 
                        <StaticalCard dataNutriment={user?.keyData.calorieCount} typeOfNutriment="Calories" image={calories} unit=" kcal"/>
                        <StaticalCard dataNutriment={user?.keyData.proteinCount} typeOfNutriment="Protéines" image={proteins} unit="g"/>
                        <StaticalCard dataNutriment={user?.keyData.carbohydrateCount} typeOfNutriment="Glucides" image={carbs} unit="g"/>
                        <StaticalCard dataNutriment={user?.keyData.lipidCount} typeOfNutriment="Lipides" image={fat} unit="g"/>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Home