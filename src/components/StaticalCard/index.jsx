function StaticalCard({dataNutriment, image, typeOfNutriment}) {
    return (
        <div className="home__statistics__wrapper">
            <img className="home__statistics__wrapper--icon"src={image} alt="Icon bodyweight"/>
            <div className="home__statistics__wrapper--text">
                <h3>{dataNutriment} kcal</h3>
                <p>{typeOfNutriment}</p>
            </div>
        </div>
    )
}

export default StaticalCard