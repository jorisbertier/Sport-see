import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Asidebar from "../../components/Asidebar";
import proteins from '../../assets/images/protein-icon.png';
import calories from '../../assets/images/calories-icon.png';
import carbs from '../../assets/images/carbs-icon.png';
import fat from '../../assets/images/fat-icon.png';
import StaticalCard from "../../components/StaticalCard";
import Banner from "../../components/Banner";
import Barchart from "../../components/Chart/BartChart";
import Areachart from "../../components/Chart/AreaChart";
import Radarchart from "../../components/Chart/RadarChart";
import Piechart from "../../components/Chart/PieChart";
import Data from '../../../src/datas/DataUser.json'

function Home() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [userId, setUserId] = useState()

    const useMock = true;

    useEffect(() => {
        if (useMock) {
            console.log('Contenu de Data :', Data);

            if (Data) {
                setUser(Data);
                setUserId(Data.id);
                setLoading(false);
            } else {
                navigate("/error");
            }
        } 
        else {
            fetch(`http://localhost:3000/user/${id}`)
            .then(response => response.json())
            .then(({data: { id, key, keyData, todayScore, userInfos }}) => {
                setUser({ id, key, keyData, todayScore, userInfos });
                setUserId(id)
                setLoading(false); 
            })
            .catch(() => (
                navigate("/error")
            ));
        }
    }, [id, navigate, useMock]);


    if(loading) {
        return (
        <div className="loading">
            <h2>Loading ...</h2>
        </div>
        )
    }

    return (
        <div className="home">
            <Asidebar />
            <div className="home__wrapper">
                <Banner name={user?.userInfos.firstName || Data.userInfos.firstName} />
                <div className="home__wrapper--statistics">
                    <div className="home__chart">
                        <Barchart id={userId} mock={useMock} dataMock={Data.sessions}/>
                        <div className="home__chart__container">
                            <Areachart id={userId} mock={useMock} dataMock={Data}/>
                            <Radarchart id={userId} mock={useMock} dataMock={Data.additionalData}/>
                            <Piechart id={userId} />
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
    );
}

export default Home;
