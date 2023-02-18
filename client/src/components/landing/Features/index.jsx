import React, { useEffect } from "react";
import SectionContainer from "../SectionContainer";
import SectionHeader from "../SectionHeader";
import FeatureItem from "./FeatureItem";
import styles from "./Features.module.css";
import Aos from "aos";
import "aos/dist/aos.css";
import "aos/dist/aos.js";

const Features = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
    Aos.refresh();
  }, []);
  return (
    <div data-aos={"fade-down"}>
      
    </div>
  );
};

export default Features;
