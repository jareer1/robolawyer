import React from "react";
import { motion } from "framer-motion";
import Jareer from "../Jareer.jpeg";
import Haris from "../20L-2067.jpg";
import Hamza from "../Hamza.jpeg";
import "./OurTeam.css";

const OurTeam = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <section>
        <div className="rowhead">
          <h1>Our Team</h1>
        </div>
        <div class="row">
          <div class="column">
            <div class="card teamCol">
              <div class="img-container">
                <img src={Jareer} width={250} height={300} alt="Jareer" />
              </div>
              <h3>Muhammad Jareer</h3>
              <div class="icons">
                <a href="https://www.linkedin.com/in/muhammad-haris-hassan/">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card teamCol">
              <div class="img-container">
                <img src={Haris} width={250} height={300} alt="Haris" />
              </div>
              <h3>Muhammad Haris Hassan</h3>
              <div class="icons">
                <a href="https://www.linkedin.com/in/muhammad-haris-hassan/">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="card teamCol">
              <div class="img-container">
                <img src={Hamza} width={250} height={300} alt="Hamza" />
              </div>
              <h3>Syed Hamza Ali</h3>
              <div class="icons">
                <a href="https://www.linkedin.com/in/muhammad-haris-hassan/">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default OurTeam;
