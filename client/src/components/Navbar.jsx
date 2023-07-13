import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = ({ currentPage, handlePageChange }) => {
  return (
    <ul className="navbar navbar-nav navbar-light bg-light">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">
            BeadSchemas
          </a>
        </div>
        <li className="nav-item">
          <a
            href="#home"
            onClick={() => handlePageChange('Home')}
            className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </a>
        </li>

        <li className="nav-item">
          <a
            href="#new-schema"
            onClick={() => handlePageChange('NewSchema')}
            className={
              currentPage === 'NewSchema' ? 'nav-link active' : 'nav-link'
            }
          >
            New Schema
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#about"
            onClick={() => handlePageChange('About')}
            className={currentPage === 'About' ? 'nav-link active' : 'nav-link'}
          >
            About
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#contact"
            onClick={() => handlePageChange('Contact')}
            className={
              currentPage === 'Contact' ? 'nav-link active' : 'nav-link'
            }
          >
            Contact
          </a>
        </li>
      </div>
    </ul>
  );
};

export default Navbar;
