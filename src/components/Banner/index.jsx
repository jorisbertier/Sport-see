function Banner({name}) {
    return(
        <header className="home__wrapper--banner">
            <h1>Bonjour <span>{name}</span></h1>
            <p> Félicitations ! Vous avez explosé vos objectifs hier 👏 </p>
        </header>
    )
}
//banner
export default Banner