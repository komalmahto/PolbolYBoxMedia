import * as React from "react"
import { useHistory } from "react-router"
import { getSlug } from "../../helpers"
import styles from "./Petitions.module.css"
import PropTypes from "prop-types"
import {
  Grid,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core"
import useStyles from "./PetitionCard.js"
import LinearProgress from "@mui/material/LinearProgress"
import "./petition_card.css"
const OVERLAY = "linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.9))"

const OverallPetitions = ({ petitions, page }) => {
  const classes = useStyles()
  const history = useHistory()
  const [progress, setProgress] = React.useState(0)
  console.log(petitions)
  const getValue = (x, y) => {
    return (x / y) * 100
  }

  return (
    petitions.length > 0 &&
    petitions.slice(0, page * 6).map((petition, index) => (
      <>
        <main className="container experience-cards">
          <div
            onClick={() =>
              history.push(
                `/petition/${getSlug(petition.title)}/${petition._id}`
              )
            }
          >
            <div class="card card1">
              <div
                style={{
                  width: "30%",
                  height: "200px",
                  minWidth: "200px",
                }}
              >
                <img src={petition.image} class="featured-image" alt="" />
              </div>
              <div style={{ width: "70%" }}>
                <article class="card-body">
                  <header>
                    <p class="meta">
                      <span
                        style={{ fontWeight: "900" }}
                        class="pre-heading s_color"
                      >
                        {petition.title.slice(0, 30)}...
                      </span>
                      <br />
                      <span class="author">
                        {petition.description
                          ? petition.description.length > 150
                            ? petition.description.substring(0, 150) + "..."
                            : petition.description
                          : ""}
                        <LinearProgress
                          className="linearProgess"
                          style={{}}
                          variant="determinate"
                          value={getValue(
                            petition.signaturesReceived,
                            petition.expectedSignatures
                          )}
                          color="success"
                        />

                        <p>
                          <span style={{ fontWeight: "bold" }}>
                            {petition.signaturesReceived} signed of{" "}
                          </span>
                          {petition.expectedSignatures}
                        </p>
                      </span>
                    </p>
                  </header>
                </article>
              </div>
            </div>
          </div>
        </main>
        {/* <Grid
          item
          xs={12}
          md={12}
          lg={12}
          container
          style={{ gap: 15 }}
          direction="column"
          alignItems="center"
          justify="space-around"
          marginLeft="30px"
        >
          <Card className={classes.card} style={{ marginTop: 10 }}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={
                  "https://static.toiimg.com/thumb/msid-80067386,width-1070,height-580,imgsize-127229,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
                }
              />
            </CardActionArea>
            <CardActionArea>
              <div
                className={classes.details}
                style={{ border: "2px solid red", marginTop: "-20px" }}
              >
                <Typography
                  variant="h6"
                  style={{ color: "black", marginTop: "3px" }}
                  component="h2"
                  color="textSecondary"
                >
                  heading
                </Typography>
                <Typography
                  variant="body2"
                  component="h4"
                  color="textSecondary"
                  style={{ paddingTop: "10px" }}
                >
                  helloooo howwww areee youuuu dsabfdsfngndfbfbdbvbdvareee
                  youuuu dsabfdsfngndfbfbdsabfdsfngndfbfbdbvbdvareee youuuu
                  dsabfdsfngndfbfbdbvbdvdfbnbngchmjm
                </Typography>
                <LinearProgress
                  style={{
                    height: "20px",
                    borderRadius: "10px",
                    backgroundColor: "green",
                    paddingTop: "20px",
                  }}
                  variant="determinate"
                  value={progress}
                  color="secondary"
                />
              </div>
              {/* <CardActions
                className={classes.cardActions}
                style={{ marginTop: "10px" }}
              >
                <Button size="small" color="primary" href="#">
                  Learn More
                </Button>
                <Button size="small" color="primary" href="#">
                  click me
                </Button>
              </CardActions> 
            </CardActionArea>
          </Card>
        </Grid> */}
        {/* <div
          style={{ backgroundColor: "red" }}
          key={index}
          onClick={() =>
            history.push(`/petition/${getSlug(petition.title)}/${petition._id}`)
          }
          className={styles.petition}
        >
          <div className={styles.petitionSub}>
            <div
              className={styles.petitionImg}
              style={{
                backgroundImage: `${OVERLAY}, url("${petition.image}")`,
              }}
            ></div>
            <div className={styles.petition_container}>
              <p className={styles.petition_container_title}>
                {petition.title.slice(0, 30)}...
              </p>
              <p className={styles.petition_container_description}>
                {petition.description
                  ? petition.description.length > 150
                    ? petition.description.substring(0, 150) + "..."
                    : petition.description
                  : ""}
              </p>
            </div>
          </div>
          <div className={styles.petitionBtm}>
            <span className={styles.user}>
              {petition && petition.user.userName}
            </span>
            <h1>komal</h1>
            <span className={styles.supp}>
              <i className="fas fa-users"></i>
              <span className={styles.num}>
                {" "}
                {petition ? petition.signaturesReceived : 0}
              </span>{" "}
              supporters
            </span>
          </div> 
        </div>*/}
      </>
    ))
  )
}

OverallPetitions.propTypes = {
  petitions: PropTypes.array.isRequired,
}

export default OverallPetitions
