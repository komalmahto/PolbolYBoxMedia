import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  TwitterIcon,FacebookIcon, WhatsappIcon,EmailIcon,TelegramIcon
} from "react-share";
import { Modal, Button } from 'antd';


const ShareModal = ({isShareModalVisible,setIsShareModalVisible,shareUrl}) => {
  
  const showModal = () => {
    setIsShareModalVisible(true);
  };

  const handleOk = () => {
    setIsShareModalVisible(false);
  };

  const handleCancel = () => {
    setIsShareModalVisible(false);
  };
  return (
    <Modal
    visible={isShareModalVisible}
    onOk={handleOk}
    onCancel={handleCancel}
  >
  <div>
  <p>Share on</p>
  </div>
  <FacebookShareButton style={{cursor:'pointer'}} url={shareUrl}><FacebookIcon/></FacebookShareButton>
  <TwitterShareButton style={{cursor:'pointer'}} url={shareUrl}><TwitterIcon/></TwitterShareButton>
  <WhatsappShareButton style={{cursor:'pointer'}} url={shareUrl}><WhatsappIcon/></WhatsappShareButton>
  <EmailShareButton style={{cursor:'pointer'}} url={shareUrl}><EmailIcon/></EmailShareButton>
  <TelegramShareButton style={{cursor:'pointer'}} url={shareUrl}><TelegramIcon/></TelegramShareButton>
  </Modal>
  )
}

export default ShareModal
