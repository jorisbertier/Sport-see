import Logo from '../../assets/images/logo.png';

function Navbar() {

    return(
        <nav>
            <div className='nav__wrapper--img'>
                <img src={Logo} alt='Logo du site'/>
            </div>
            <ul className='nav__wrapper--navlink'>
                <li>Accueil</li>
                <li>Profil</li>
                <li>Réglage</li>
                <li>Communauté</li>
            </ul>
        </nav>
    )
}

export default Navbar