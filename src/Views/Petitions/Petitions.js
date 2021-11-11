import { useEffect, useState } from "react"
import { petitionCategories } from "../../data"
import { useHistory } from "react-router-dom"
import FilteredPetitions from "./FilteredPetitions/FilteredPetitions"
import * as api from "../../api"
import Multiselect from "multiselect-react-dropdown"
import styles from "./Petitions.module.css"
import OverallPetitons from "./OverallPetitions"
import Modal from "../../Components/Modal/Modal"
import { connect } from "react-redux"
import { AiFillPlusCircle } from "react-icons/ai"
import Noty from "noty"
import "noty/lib/noty.css"
import "noty/lib/themes/mint.css"
import { isAuthenticated } from "../../api/index"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "../../axios"

const Petitions = ({ auth: { user, token } }) => {
  // const [polls, setPolls] = useState([]);
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [active, setActive] = useState(true)
  const [activePetitions, setActivePetitions] = useState([])
  const [expiredPetitions, setExpiredPetitions] = useState([])
  const [activePetitionsTotal, setActivePetitionsTotal] = useState(0)
  const [expiredPetitionsTotal, setExpiredPetitionsTotal] = useState(0)
  const [myPet, setMyPet] = useState(false)
  const [userPet, setUserPet] = useState([])

  const history = useHistory(null)
  const [page, setPage] = useState({
    activeNonfiltered: 1,
    activeFiltered: 1,
    expiredNonfiltered: 1,
    expiredFiltered: 1,
  })

  const loadMorePage = (type) => {
    if (type === "ANF") {
      let pos = window.scrollY
      console.log(pos, "poss")
      setY(pos)
      setPage((prevState) => ({
        ...prevState,
        activeNonfiltered: prevState.activeNonfiltered + 1,
      }))
      console.log("len")
    }
    if (type === "AF") {
      let pos = window.scrollY
      console.log(pos, "poss")
      setY(pos)
      setPage((prevState) => ({
        ...prevState,
        activeFiltered: prevState.activeFiltered + 1,
      }))
      console.log("len")
    }
    if (type === "ENF") {
      let pos = window.scrollY
      console.log(pos, "poss")
      setY(pos)
      setPage((prevState) => ({
        ...prevState,
        expiredNonfiltered: prevState.expiredNonfiltered + 1,
      }))
      console.log("len")
    }
    if (type === "EF") {
      let pos = window.scrollY
      console.log(pos, "poss")
      setY(pos)
      setPage((prevState) => ({
        ...prevState,
        expiredFiltered: prevState.expiredFiltered + 1,
      }))
      console.log("len")
    }
  }
  const [y, setY] = useState(0)

  useEffect(() => {
    setCategories([...petitionCategories])
    getActivePetitions()
    // getExpiredPetitions();
  }, [])

  useEffect(() => {
    if (token) {
      getMyPetitons()
    }
  }, [token])

  const getMyPetitons = async () => {
    let data
    try {
      const data = await axios.get(`petitions/myPetition`, {
        headers: {
          Authorization: `bearer ${JSON.parse(token)}`,
        },
      })
      console.log(data, "my pet")
      setUserPet(data.data.payload)
    } catch (error) {}
  }

  useEffect(() => {
    getFilteredPetitions()
  }, [selectedCategories])

  const getActivePetitions = async () => {
    try {
      const { data } = await api.getActivePetitions()
      setActivePetitionsTotal(data.payload.length)
      setActivePetitions(data.payload.payload)
    } catch (error) {
      console.log(error)
    }
  }
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
      setSelectedCategories([...selectedCategories, category])
    else
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      )
  }

  const getFilteredPetitions = async () => {
    try {
      let mode = active ? "active" : "expired"
      let categories = selectedCategories.join(",")

      const { data } = await api.getFilteredPetitions(categories)

      if (active) {
        setActivePetitionsTotal(data.payload.length)
        setActivePetitions([...data.payload.payload])
      } else {
        setExpiredPetitionsTotal(data.payload.length)
        setExpiredPetitions([...data.payload.payload])
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSelect = (selectedList, selectedItem) => {
    setSelectedCategories([...selectedCategories, selectedItem.name])
  }

  const onRemove = (selectedList, selectedItem) => {
    setSelectedCategories(
      selectedCategories.filter((category) => category !== selectedItem.name)
    )
  }

  const createPetitionhandler = () => {
    if (isAuthenticated()) {
      history.push("/petition")
    } else {
      toast("Please login to create petition")
    }
  }
  return (
    <div className={styles.container}>
      <ToastContainer />

      <div className={styles.header}>
        <p className={styles.pHeading}>Petitions</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      {/* <AiFillPlusCircle className={styles.cpetition} onClick={createPetitionhandler}/> */}
      <center>
        <span className={styles.add} onClick={createPetitionhandler}>
          <span className={styles.addPet}>Start a Petition</span>
        </span>
      </center>

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
              selectedCategories.includes(category.name)
                ? `${styles.category} ${styles.selected}`
                : styles.category
            }
            onClick={(_) => handleCategoryClick(category.name)}
          >
            {category.name}
          </span>
        ))}
        <div>
          {/* <Multiselect
            style={{ height: "100%" }}
            options={petitionCategories.map((category) => ({ name: category }))}
            onSelect={onSelect}
            onRemove={onRemove}
            displayValue="name"
            placeholder="View All Categories"
            showArrow
          /> */}
        </div>
      </div>
      <div className={styles.petitions}>
        <h1>komal</h1>
        <div
          className={`${
            !myPet && active
              ? `${styles.types} ${styles.active}`
              : !myPet
              ? `${styles.types} ${styles.expired}`
              : `${styles.types} ${styles.myPet}`
          }`}
        >
          <div
            onClick={() => {
              setActive(true)
              setMyPet(false)
            }}
          >
            ACTIVE <span>{activePetitionsTotal}</span>
          </div>
          <div
            onClick={() => {
              setActive(false)
              setMyPet(false)
            }}
          >
            EXPIRED <span>{expiredPetitionsTotal}</span>
          </div>
          {/* <div onClick={() => setActive(false)}>
            My petitions <span>{expiredPetitionsTotal}</span>
          </div> */}
          {token && (
            <div onClick={() => setMyPet(true)}>
              My Petitions <span>{userPet && userPet.length}</span>
            </div>
          )}
        </div>
      </div>
      {!myPet && active ? (
        selectedCategories.length === 0 ? (
          <>
            <div className={styles.petitions}>
              <OverallPetitons
                page={page.activeNonfiltered}
                petitions={activePetitions}
              />
            </div>
            <div>
              {activePetitions.length > page.activeNonfiltered * 6 && (
                <center className={styles.loadmore}>
                  <span onClick={() => loadMorePage("ANF")}>Load more</span>
                </center>
              )}
            </div>
          </>
        ) : (
          <div className={styles.petitions}>
            <FilteredPetitions
              page={page.activeFiltered}
              mode="active"
              petitions={activePetitions}
            />
            {activePetitions.length > page.activeFiltered * 6 && (
              <center className={styles.loadmore}>
                <span onClick={() => loadMorePage("AF")}>Load more</span>
              </center>
            )}{" "}
          </div>
        )
      ) : !myPet ? (
        selectedCategories.length === 0 ? (
          <>
            <div className={styles.petitions}>
              <OverallPetitons
                page={page.expiredNonfiltered}
                petitions={expiredPetitions}
              />
            </div>
            <div>
              {" "}
              {expiredPetitions.length > page.expiredNonfiltered * 6 && (
                <center className={styles.loadmore}>
                  <span onClick={() => loadMorePage("ENF")}>Load more</span>
                </center>
              )}
            </div>
          </>
        ) : (
          <div className={styles.petitions}>
            <FilteredPetitions
              page={page.expiredFiltered}
              mode="expired"
              petitions={expiredPetitions}
            />
            {expiredPetitions.length > page.expiredFiltered * 3 && (
              <center className={styles.loadmore}>
                <span onClick={() => loadMorePage("EF")}>Load more</span>
              </center>
            )}
          </div>
        )
      ) : selectedCategories.length === 0 ? (
        <>
          <div className={styles.petitions}>
            <OverallPetitons
              page={page.expiredNonfiltered}
              petitions={userPet}
            />
          </div>
          <div>
            {" "}
            {expiredPetitions.length > page.expiredNonfiltered * 6 && (
              <center className={styles.loadmore}>
                <span onClick={() => loadMorePage("ENF")}>Load more</span>
              </center>
            )}
          </div>
        </>
      ) : (
        <div className={styles.petitions}>
          <FilteredPetitions
            page={page.expiredFiltered}
            mode="expired"
            petitions={userPet}
          />
          {expiredPetitions.length > page.expiredFiltered * 3 && (
            <center className={styles.loadmore}>
              <span onClick={() => loadMorePage("EF")}>Load more</span>
            </center>
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Petitions)
