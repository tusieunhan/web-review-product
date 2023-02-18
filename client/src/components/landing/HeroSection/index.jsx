import styles from "./HeroSection.module.css";
import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className={styles["hero-section"]}>
      <div>
        <h1 className={styles.title}>
          <span className="text-pink-500">Social Review</span> - Đánh giá sản phẩm
        </h1>
        <div className={styles.subtitle}>
        Đánh giá sản phẩm tốt nhất cho bạn
        </div>
        <Link
          to="/signUp"
          className="bg-pink-500 pink-500 px-6 py-3 rounded-md shadow font-semibold text-white"
        >
          Join us now
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
