import React from "react";
// import { toggleNavbar } from "../../redux/modules/User/toggleSlice";
// import { useDispatch, useSelector } from "react-redux";



const MainSubHeader = () => {
  const menuData = [
    {
      label: "Brands",
      subItems: ["Amazon", "Flipkart", "Snapdeal"],
    },
    {
      label: "About",
      subItems: ["About Gift", "Terms and Conditions", "FAQ'S"],
    },
    {
      label: "Dining",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "Electronics",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "Fashion",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "Wellness",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "Gifting",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "Home Needs",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "E-Commerce",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "Entertainment",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
    {
      label: "Travel",
      subItems: [
        "Audio",
        "BT Speaker",
        "Soundbar",
        "Hair Dryer",
        "Groomer",
        "Hair Straightener",
        "Shaver",
        "Trimmer",
      ],
    },
  ];

//   const isNavbarOpen = useSelector((state) => state?.toggleReducer);
//   const dispatch = useDispatch();
//   console.log(isNavbarOpen);
//   const handleMobileMenuClose = () => {
//     dispatch(toggleNavbar());
//   };

//   useEffect(() => {
//     if (isNavbarOpen?.isOpen === true) {
//       document.querySelector(".menu-overlay").classList.add("active");
//       document.querySelector(".menu").classList.add("active");
//     } else {
//       document.querySelector(".menu-overlay").classList.remove("active");
//       document.querySelector(".menu").classList.remove("active");
//     }
//   }, [isNavbarOpen]);

//   const handleSubMenu = (index) => {
//     const subMenus = document.querySelectorAll(".sub-menu");
//     document.querySelector(".mobile-menu-head").classList.add("active");

//     subMenus.forEach((element, i) => {
//       if (i === index) {
//         element.classList.add("active");
//       }
//     });
//   };

//   const handleCloseSubMenu = () => {
//     document.querySelector(".sub-menu").classList.remove("active");
//     document.querySelector(".mobile-menu-head").classList.remove("active");
//   };
//   const handleCloseSub = () => {
//     const subMenu = document.querySelector(".sub-menu.active");

//     if (subMenu) {
//       subMenu.classList.remove("active");
//     }
//   };

  return (
    <>
      <header class="newheader user">
        <div class="container">
          <div class="row v-center kjk ">
            <div class="header-item item-center">
              <div className="menu-overlay"></div>
              <nav className="menu">
                <div
                  class="mobile-menu-head"
                //   onClick={() => handleCloseSubMenu()}
                >
                  <div class="go-back"
                //    onClick={() => handleCloseSub()}
                  >
                    <i class="fa fa-angle-left"></i>
                  </div>
                  <div class="current-menu-title"></div>
                  <div
                    class="mobile-menu-close"
                    // onClick={handleMobileMenuClose}
                  >
                    &times;
                  </div>
                </div>
                <ul class="menu-main text-center">
                  {menuData.map((menuItem, index) => (
                    <li key={index} className="menu-item-has-children magiccc">
                      {/* <a onClick={() => handleSubMenu(index)}> */}
                        {menuItem.label} <i className="fa fa-angle-down"></i>
                      {/* </a> */}
                      <div className="sub-menu mega-menu mega-menu-column-4">
                        <div className="list-item">
                          <h4 className="title">{menuItem.label}</h4>
                          <ul>
                            {menuItem.subItems.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <a href="#">{subItem}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div class="header-item item-right nne  d-none">
              <span class="clr-white">
                <i class="las la-caret-right"></i>Best Deal
              </span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default MainSubHeader;
