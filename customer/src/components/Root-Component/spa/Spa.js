// SpaListing.js
import React, { useState, useEffect } from "react";
import { Icon } from "react-icons-kit";
import { location2 } from "react-icons-kit/icomoon/location2";
import { heart } from "react-icons-kit/feather/heart";
import { share2 } from "react-icons-kit/feather/share2";
import { copy } from "react-icons-kit/feather/copy";
import { facebook } from "react-icons-kit/feather/facebook";
import { twitter } from "react-icons-kit/feather/twitter";
import { mail } from "react-icons-kit/feather/mail";
import { x } from "react-icons-kit/feather/x";
import axios from "../../../helpers/axios";
import { useNavigate } from "react-router-dom";
import ChatOpeningButton from "../Chat/ChatOpeningButton";
import Footer from "../Footer/Footer";
import "./SpaListing.css";

const SpaListing = () => {
  const [data, setData] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [showShareModal, setShowShareModal] = useState(false);
  const [currentSpaToShare, setCurrentSpaToShare] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getSpaList();
  }, []);

  const getSpaList = async () => {
    try {
      const response = await axios.get("/allSpaList");
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDotClick = (spaId, index) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [spaId]: index
    }));
  };

  const handleShareClick = (spa, e) => {
    e.stopPropagation(); // Prevent card click event
    setCurrentSpaToShare(spa);
    setShowShareModal(true);
  };

  const handleCloseShareModal = () => {
    setShowShareModal(false);
    setCopySuccess(false);
    setTimeout(() => {
      setCurrentSpaToShare(null);
    }, 300);
  };

  const getShareUrl = (spaId) => {
    return `${window.location.origin}`;
  };

  const copyToClipboard = () => {
    if (currentSpaToShare) {
      const url = getShareUrl(currentSpaToShare._id);
      navigator.clipboard.writeText(url)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        })
        .catch(err => console.error('Failed to copy: ', err));
    }
  };

  const shareToWhatsApp = () => {
    if (currentSpaToShare) {
      const url = getShareUrl(currentSpaToShare._id);
      const whatsappUrl = `https://api.whatsapp.com/send?text=Check out this amazing property: ${currentSpaToShare.name} ${url}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const shareToFacebook = () => {
    if (currentSpaToShare) {
      const url = getShareUrl(currentSpaToShare._id);
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      window.open(facebookUrl, '_blank');
    }
  };

  const shareToTwitter = () => {
    if (currentSpaToShare) {
      const url = getShareUrl(currentSpaToShare._id);
      const twitterUrl = `https://twitter.com/intent/tweet?text=Check out this amazing property: ${currentSpaToShare.name}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank');
    }
  };

  const shareByEmail = () => {
    if (currentSpaToShare) {
      const url = getShareUrl(currentSpaToShare._id);
      const emailSubject = `Check out this property: ${currentSpaToShare.name}`;
      const emailBody = `I found this amazing property I thought you might like: ${currentSpaToShare.name}. Check it out here: ${url}`;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.location.href = mailtoUrl;
    }
  };

  if (!data.length) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div className="spa-container">
        <h1 className="spa-title">Farm Houses</h1>
        
        <div className="spa-grid">
          {data.map((spa, index) => (
            <div  className="spa-card">
              <div className="image-containers">
                <img src={spa.imgUrl} alt={spa.name} className="spa-image" />
                
                <div className="card-buttons">
                  {/* <button className="favorite-button">
                    <Icon icon={heart} size={20} />
                  </button> */}
                  <button className="share-button" onClick={(e) => handleShareClick(spa, e)}>
                    <Icon icon={share2} size={20} />
                  </button>
                </div>
                
                <div className="navigation-dots">
                  {[...Array(5)].map((_, dotIndex) => (
                    <button
                      key={dotIndex}
                      className={`dot ${(activeImageIndex[spa._id] || 0) === dotIndex ? 'active' : ''}`}
                      onClick={() => handleDotClick(spa._id, dotIndex)}
                    />
                  ))}
                </div>
              </div>

              <div  className="spa-content ">
                <div className="spa-header">
                  <div className="spa-info">
                    <h3 className="spa-name">{spa.name}</h3>
                    <div className="location">
                      <Icon icon={location2} size={16} />
                      <span>755 KM</span>
                    </div>
                  </div>
                  <div className="rating">
                    <span>★</span>
                    <span>4.9</span>
                  </div>
                </div>
                
                <p className="spa-description">{spa.details}</p>
                
                <div className="spa-price">
                  <span className="amount">₹16000{spa.price}</span>
                  <span className="period">/ session</span>
                </div>
              </div>

              {/* <button
                className="card-overlays"
                onClick={() => navigate(`/spa-details/${spa._id}`)}
              /> */}
            </div>
          ))}
        </div>

        <div className="locations-section">
          <div className="locations-header">
            <Icon icon={location2} size={24} className="location-icon" />
            <h2>Maya Farms Property Locations</h2>
          </div>

          <div className="locations-grid">
            {[
              "Maya Farms BUNGALOWS",
              "CUBA PATNEM BEACH BUNGALOWS",
              "Maya Farms PREMIUM HUTS",
              "PALOLEM Farms RESORT",
              "Maya Farms"
            ].map((location, index) => (
              <div key={index} className="location-card">
                <h3>{location}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, eligendi?</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && currentSpaToShare && (
        <div className="share-modal-backdrop">
          <div className="share-modal">
            <div className="share-modal-header">
              <h3>Share this property</h3>
              <button className="close-button" onClick={handleCloseShareModal}>
                <Icon icon={x} size={20} />
              </button>
            </div>
            
            <div className="share-modal-property">
              <img src={currentSpaToShare.imgUrl} alt={currentSpaToShare.name} className="share-modal-image" />
              <div>
                <h4>{currentSpaToShare.name}</h4>
                <p className="share-modal-price">₹16000{currentSpaToShare.price} <span>/ session</span></p>
              </div>
            </div>
            
            <div className="share-options">
              <button className="share-option-button" onClick={shareToWhatsApp}>
                <div className="share-icon whatsapp-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                  </svg>
                </div>
                <span>WhatsApp</span>
              </button>
              
              <button className="share-option-button" onClick={shareToFacebook}>
                <div className="share-icon facebook-icon">
                  <Icon icon={facebook} size={24} />
                </div>
                <span>Facebook</span>
              </button>
              
              <button className="share-option-button" onClick={shareToTwitter}>
                <div className="share-icon twitter-icon">
                  <Icon icon={twitter} size={24} />
                </div>
                <span>Twitter</span>
              </button>
              
              <button className="share-option-button" onClick={shareByEmail}>
                <div className="share-icon email-icon">
                  <Icon icon={mail} size={24} />
                </div>
                <span>Email</span>
              </button>
            </div>
            
            <div className="copy-link-section">
              <div className="copy-link-input">
                <input 
                  type="text" 
                  value={getShareUrl(currentSpaToShare._id)}
                  readOnly
                />
                <button className="copy-button" onClick={copyToClipboard}>
                  <Icon icon={copy} size={20} />
                  {copySuccess ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <ChatOpeningButton />
      <Footer />
    </div>
  );
};

export default SpaListing;