import React from 'react';
import { Link } from 'react-router-dom'; 
import "../assets/css/Footer.css";

export default function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="/" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>
                BookNest
              </h6>
              <p>
                Discover a world of knowledge with BookVault, your ultimate destination for e-books.
                Explore our vast collection of genres, from fiction to non-fiction, and find your next great read.
                Dive into the digital age of reading with ease and convenience.
              </p>
            </div>

            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">User</h6>
              <p>
                <a href="#!" className="text-reset">
                  Angular
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  React
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Vue
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Laravel
                </a>
              </p>
            </div>

            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <Link to="/" className="text-reset"> 
                  Pricing
                </Link>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i className="fas fa-home me-2"></i>
                LJ Campus, LJ University Rd, off Sarkhej.
              </p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                booknest@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3"></i> + 91 9537273071
              </p>
              <p>
                <i className="fas fa-print me-3"></i> + 9537273071
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2021 Copyright
        <a className="text-reset fw-bold" href="/">
          BookNest E-Book Selling
        </a>
      </div>
    </footer>
  );
}