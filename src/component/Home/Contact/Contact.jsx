import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Contact.css";
import contactImg from "../../../Assets/contact.svg";
// import swal from 'sweetalert'
import Fade from "react-reveal/Fade";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();
    // swal("Thank You!", "We appreciate you contacting us!", "success");
  };
  return (
    <section id="contact">
      <Col md={11} className="mx-auto">
        <Row>
          <Col md={6}>
            <Fade duration={2000} left>
              <form onSubmit={handleSubmit} className="contactForm">
                <h4 className="miniTitle">Prenez un rendez-vous</h4>
                <h5 className="sectionTitle">En un seul click</h5>
                <Row>
                  <Col md={12} lg={6}>
                    <input placeholder="Votre NOM" type="text" required />
                  </Col>
                  <Col md={12} lg={6}>
                    <input placeholder="Votre EMAIL" type="email" required />
                  </Col>
                  <Col md={12}>
                    <input placeholder="Sujet" type="text" required />
                  </Col>
                  <Col md={12}>
                    <textarea
                      placeholder="Pourriez-vous nous'expliquer davantage la raison de votre visite"
                      required
                    ></textarea>
                  </Col>
                </Row>
                <button className="branBtn" type="submit">
                  Envoyer
                </button>
              </form>
            </Fade>
          </Col>
          <Col md={6}>
            <Fade duration={2000} right>
              <img src={`${contactImg}`} alt="" className="img-fluid" />
            </Fade>
          </Col>
        </Row>
      </Col>
    </section>
  );
};

export default Contact;
