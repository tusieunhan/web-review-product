import React, { useEffect } from "react";
import SectionContainer from "../SectionContainer";
import styles from "./CallToAction.module.css";
import { ImGoogle } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";

const CallToAction = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
    Aos.refresh();
  }, []);
  return (
    <section data-aos={"fade-right"}>
      <SectionContainer>
       
      </SectionContainer>
    </section>
  );
};

export default CallToAction;
