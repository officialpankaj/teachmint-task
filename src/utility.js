import userIcon1 from "./assets/user-icon1.svg";
import userIcon2 from "./assets/user-icon2.svg";
import userIcon3 from "./assets/user-icon3.svg";
import userIcon4 from "./assets/user-icon4.svg";
import userIcon5 from "./assets/user-icon5.svg";
import userIcon6 from "./assets/user-icon6.svg";
import userIcon7 from "./assets/user-icon7.svg";
import userIcon8 from "./assets/user-icon8.svg";
import userIcon9 from "./assets/user-icon9.svg";
import userIcon0 from "./assets/user-icon0.svg";

export const getUserImage = () => {
  const profileIcons = [userIcon1, userIcon2, userIcon3, userIcon4, userIcon5, userIcon6, userIcon7, userIcon8, userIcon9, userIcon0];
  console.log(Math.floor(Math.random() * 10));
  return profileIcons[Math.floor(Math.random() * 10)];
};
