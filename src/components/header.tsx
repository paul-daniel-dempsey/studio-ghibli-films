const Header : React.FC<{ filmPage : number }> = ( { filmPage }) => 
    <header className="header__container">
      <h1 className="header__title">Films from the Ghibli Studio</h1>
      <p className="header__page-count ">[Film Page: {filmPage}]</p>
    </header>;
export default Header;