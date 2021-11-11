import { render } from "react-dom"

import React, { Component } from "react"
import autosize from "autosize"

class TextArea extends Component {
  componentDidMount() {
    this.textarea.focus()
    autosize(this.textarea)
  }

  render() {
    const handletextChange = (e) => {
      this.props.setComments(e.target.value)
    }
    const style = {
      resize: "none",
      padding: "9px",
      boxSizing: "border-box",
      fontSize: "15px",
    }
    return (
      <div>
        Textarea autosize <br />
        <br />
        <textarea
          style={style}
          ref={(c) => (this.textarea = c)}
          placeholder="type some text"
          rows={1}
          onChange={handletextChange}
          defaultValue=""
        />
      </div>
    )
  }
}

export default TextArea
