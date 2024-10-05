import Asidebar from "../../components/Asidebar"
import proteins from '../../assets/images/protein-icon.png';
import calories from '../../assets/images/calories-icon.png';
import carbs from '../../assets/images/carbs-icon.png';
import fat from '../../assets/images/fat-icon.png';
import { useState, useEffect } from "react";
import StaticalCard from "../../components/StaticalCard";
import Banner from "../../components/Banner";
import Barchart from "../../components/Chart/BartChart";
import Areachart from "../../components/Chart/AreaChart";
import Radarchart from "../../components/Chart/RadarChart";
import Piechart from "../../components/Chart/PieChart";

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


    return (
        <div className="home">
            <Asidebar/>
            <div className="home__wrapper">
                <Banner name ={user?.userInfos.firstName} />
                <div className="home__wrapper--statistics">
                    <div className="home__chart">
                        <Barchart/>
                        <div className="home__chart__container">
                                <Areachart />
                                <Radarchart />
                                <Piechart />
                                {/* <div style={{height : '100px', width: '100px', background : 'red'}}></div> */}
                        </div>
                    </div>
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