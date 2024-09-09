import Asidebar from "../../components/Asidebar"

function Home() {
    return (
        <div className="home">
            <Asidebar/>
            <div className="home__wrapper">
                <div className="home__wrapper--banner">
                    <h1>Bonjour Thomas</h1>
                    <span> Félicitation ! Vous avez explosé vos objectifs hier 👏 </span>
                    
                </div>
                <div className="home__wrapper--statistics">
                    <div className="home__chart"> Chart</div>
                    <div className="home__statistics"> Statistsique</div>
            </div>
            </div>
        </div>
    )
}

export default Home