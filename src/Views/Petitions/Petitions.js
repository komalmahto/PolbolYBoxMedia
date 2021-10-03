import { useEffect, useState } from "react";
import { petitionCategories } from "../../data";
import { useHistory } from "react-router-dom";
import FilteredPetitions from "./FilteredPetitions/FilteredPetitions";
import * as api from "../../api";
import Multiselect from "multiselect-react-dropdown";
import styles from "./Petitions.module.css";
import OverallPetitons from "./OverallPetitions";
import Modal from "../../Components/Modal/Modal"
import { connect } from "react-redux";
import { AiFillPlusCircle } from "react-icons/ai";
import Noty from 'noty';  
import "noty/lib/noty.css";  
import "noty/lib/themes/mint.css";  

const Petitions = () => {
  // const [polls, setPolls] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [active, setActive] = useState(true);
  const [activePetitions, setActivePetitions] = useState([]);
  const [expiredPetitions, setExpiredPetitions] = useState([]);
  const [activePetitionsTotal, setActivePetitionsTotal] = useState(0);
  const [expiredPetitionsTotal, setExpiredPetitionsTotal] = useState(0);

  const history=useHistory(null);

  useEffect(() => {
    setCategories([...petitionCategories.splice(0, 4)]);
    getActivePetitions();
    // getExpiredPetitions();
  }, []);

  useEffect(() => {
    // getFilteredPetitions();
  }, [selectedCategories, active]);

  const getActivePetitions = async () => {
    try {
      const { data } = await api.getActivePetitions();
      setActivePetitionsTotal(data.payload.length);
      setActivePetitions(data.payload.payload);
    } catch (error) {
      console.log(error);
    }
  };
  // const getExpiredPetitions = async () => {
  //   try {
  //     const { data } = await api.getExpiredPetitions();
  //     setExpiredPetitionsTotal(data.payload.totalExpired);
  //     setExpiredPetitions(data.payload.payload);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleCategoryClick = (category) => {
    if (!selectedCategories.includes(category))
      setSelectedCategories([...selectedCategories, category]);
    else
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
  };

  // const getFilteredPetitions = async () => {
  //   try {
  //     let mode = active ? "active" : "expired";
  //     let categories = selectedCategories.join(",");

  //     // const { data } = await api.getFilteredPetitions(mode, categories);

  //     // if (active) {
  //       // setActivePetitionsTotal(data.payload.length);
  //       // setActivePetitions([...data.payload.payload]);
  //     // } else {
  //     //   // setExpiredPollsTotal(data.payload.length);
  //     //   setExpiredPetitions([...data.payload.payload]);
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onSelect = (selectedList, selectedItem) => {
    setSelectedCategories([...selectedCategories, selectedItem.name]);
  };

  const onRemove = (selectedList, selectedItem) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category !== selectedItem.name)
    );
  };
  
  const createPetitionhandler=()=>{
    new Noty({
      type:'alert',
      layout: 'topLeft',
      text: 'Please login',
      timeout:1000,
      theme:'sunset',
      modal:true
  }).show();
      // history.push('/petition');
  }
  return (
    <div className="container">

      <div className={styles.header}>
        <p className={styles.pHeading}>Petitions</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <AiFillPlusCircle className={styles.cpetition} onClick={createPetitionhandler}/>
      <div className={styles.categories}>
        <span
          className={
            selectedCategories.length === 0
              ? `${styles.category} ${styles.selected}`
              : styles.category
          }
          onClick={() => setSelectedCategories([])}
        >
          Overall
        </span>
        {categories.map((category, index) => (
          <span
            key={index}
            className={
              selectedCategories.includes(category)
                ? `${styles.category} ${styles.selected}`
                : styles.category
            }
            onClick={(_) => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}
        <div
          style={{
            width: "250px",
            fontSize: "0.8rem",
            margin: "15px 0",
          }}
        >
          <Multiselect
            style={{ height: "100%" }}
            options={petitionCategories.map((category) => ({ name: category }))}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            placeholder="View All Categories"
            showArrow
          />
        </div>
      </div>
      <div
        className={`${
          active
            ? `${styles.types} ${styles.active}`
            : `${styles.types} ${styles.expired}`
        }`}
      >
        <div onClick={() => setActive(true)}>
          ACTIVE <span>{activePetitionsTotal}</span>
        </div>
        <div onClick={() => setActive(false)}>
          EXPIRED <span>{expiredPetitionsTotal}</span>
        </div>
      </div>
      {active ? (
        selectedCategories.length === 0 ? (
          <div className={styles.petitions}>
            <OverallPetitons petitions={activePetitions} />
          </div>
        ) : (
          <FilteredPetitions mode="active" petitions={activePetitions} />
        )
      ) : selectedCategories.length === 0 ? (
        <div className={styles.petitions}>
          <OverallPetitons petitions={expiredPetitions} />
        </div>
      ) : (
        <FilteredPetitions mode="expired" petitions={expiredPetitions} />
      )}
   
    </div>
  );
};

export default Petitions;
