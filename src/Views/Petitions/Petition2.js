import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { convertFromRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import {stateToHTML} from 'draft-js-export-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styles from "./Petition.module.css";
import { GiHorizontalFlip } from "react-icons/gi";
import "draft-js/dist/Draft.css";
import "./Editor.css";
import { connect } from "react-redux";
import { updatestateProblem, updatestateRelink } from "../../redux/Actions";

function Petition2(props) {
  const history = useHistory();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [url, setUrl] = useState("");
  const [convertedContent, setConvertedContent] = useState(null);
  const [showdata,setShowdata]=useState(null);
 
  var html;
  if(showdata!=null){
  const contentState = convertFromRaw(showdata);
  html=stateToHTML(contentState);
  }

  // useEffect(()=>{
  //   setUrl(props.reflinkstate?props.reflinkstate:"")

  // },[])
  
  const handleClick = () => {
    props.updatestateProblem(convertedContent);
    props.updatestateRelink(url);

    history.push("/petition3");
  };
  const handlePrevClick = () => {
    history.push("/petition1");
  };
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToRaw();
  };
  const convertContentToRaw = () => {
    let currentContentAsRaw = convertToRaw(editorState.getCurrentContent());
    setConvertedContent(currentContentAsRaw);
  };
  
  useEffect(() => {
    setUrl(props.reflinkstate);
    setShowdata(props.problemstate)

    if(props.problemstate){
    const contentState = convertFromRaw(props.problemstate);

    setEditorState(    EditorState.createWithContent(contentState)
    
    )
    }
   
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, []);
  let val = null;
  if (convertedContent != null && convertedContent.blocks != null) {
    convertedContent.blocks.map((data) => {
      val += data.text.length;
    });
  }
  console.log(convertedContent);
  return (
    <div>
      <div className={styles.header}>
        <p className={styles.pHeading}>PETITION</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus,
          neque.
        </p>
      </div>
      <div className={styles.steps}>
        <div className={styles.circle}>
          <p className={styles.text}>1</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>2</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={`${styles.circle} ${styles.active}`}>
          <p className={styles.text}>3</p>
        </div>
        <GiHorizontalFlip className={styles.icon} />
        <div className={styles.circle}>
          <p className={styles.text}>4</p>
        </div>
      </div>
      <div className={styles.body}>
        <p className={styles.ques}>Explain the problem you want to solve</p>
        <p className={styles.qtext}>
          People are more likely to support your petition if it’s clear why you
          care. Explain how this change will impact you, your family, or your
          community.
        </p>
      </div>
      <div className={styles.area}>
        <div className={styles.empty}></div>
        <div className={styles.input}>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            placeholder="Write here"
          />
        </div>
      </div>

<div className={styles.pad}>
      <p className={styles.message}>
      <i className="fas fa-check-circle"></i>
        Great — you’ve started writing your petition. We recommend adding
        another {val ? 1000 - val : 1000} more characters before you finish.
      </p>
     
      <p className={styles.reftext}>Provide Any Reference Link</p>
      <input
        className={styles.tbox}
        placeholder="You can give any reference link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      ></input>
       
       <div className={styles.actions}>
      <button className={styles.btn} onClick={handlePrevClick}>
        Previous
      </button>
      <button className={styles.btn} onClick={handleClick}>
        Continue
      </button>
      </div>
      </div>
      <div className={styles.desc}>
        <p className={styles.head}>Keep it short and to the point</p>
        <p className={styles.sub}>
          Example: "Buy organic, free-range eggs for your restaurants"
        </p>
        <p className={styles.head}>Keep it short and to the point</p>
        <p className={styles.sub}>
          Example: "Buy organic, free-range eggs for your restaurants"
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    problemstate: state.pet.problem,
    reflinkstate: state.pet.reflink,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatestateProblem: (problem) => dispatch(updatestateProblem(problem)),
    updatestateRelink: (reflink) => dispatch(updatestateRelink(reflink)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Petition2);
