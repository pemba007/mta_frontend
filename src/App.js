import { useState } from "react";
import Modal from "react-modal";
import "./App.css";
import Cards from "./Components/Cards";
import Payments from "./Components/Payments";
import AddBalance from "./modals/AddBalance";
import BalanceCheck from "./modals/BalanceCheck";
import IssueMetro from "./modals/IssueMetro";
import SwipeDebit from "./modals/SwipeDebit";
import SwipeMetro from "./modals/SwipeMetro";

const App = () => {
  const [issueMetro, setIssueMetro] = useState(false);

  const [addBalance, setAddBalance] = useState(false);

  const [checkBalance, setCheckBalance] = useState(false);

  const [swipeDebit, setSwipeDebit] = useState(false);

  const [swipeMetro, setSwipeMetro] = useState(false);

  const [shouldUpdate, setShouldUpdate] = useState(false);

  const contentStyles = {
    // top: "50%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
    // height: "auto",
    overlay: {
      background: "#f3d2c1",
    },
    // backgroundColor: "#f3d2c1",
  };

  const afterChange = () => {
    setShouldUpdate(!shouldUpdate);
  };

  return (
    <main className='main-body'>
      <div className='center-box'>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "50px" }}>
            MTA Database Project : Pemba Rinzi Sherpa
          </h1>
          <div className='buttons-grid'>
            <div className='button-1 btn'>
              <button className='button' onClick={() => setIssueMetro(true)}>
                Issue Metro Card
              </button>
              <Modal
                isOpen={issueMetro}
                onRequestClose={() => setIssueMetro(false)}
                contentLabel='Issue Metro Card'
                style={contentStyles}
                ariaHideApp={false}
              >
                <IssueMetro onChange={afterChange} />
              </Modal>
            </div>
            <div className='button-2 btn'>
              <button className='button' onClick={() => setAddBalance(true)}>
                Add Balance
              </button>
              <Modal
                isOpen={addBalance}
                onRequestClose={() => setAddBalance(false)}
                contentLabel='Add Balance'
                ariaHideApp={false}
              >
                <AddBalance onChange={afterChange} />
              </Modal>
            </div>
            <div className='button-3 btn'>
              <button className='button' onClick={() => setCheckBalance(true)}>
                Check Balance
              </button>
              <Modal
                isOpen={checkBalance}
                onRequestClose={() => setCheckBalance(false)}
                contentLabel='Check Balance'
                ariaHideApp={false}
              >
                <BalanceCheck onChange={afterChange} />
              </Modal>
            </div>
            <div className='button-4 btn'>
              <button className='button' onClick={() => setSwipeDebit(true)}>
                Swipe Debit Card
              </button>
              <Modal
                isOpen={swipeDebit}
                onRequestClose={() => setSwipeDebit(false)}
                contentLabel='Swipe Debit Card'
                ariaHideApp={false}
              >
                <SwipeDebit onChange={afterChange} />
              </Modal>
            </div>
            <div className='button-5 btn'>
              <button className='button' onClick={() => setSwipeMetro(true)}>
                Swipe Metro Card
              </button>
              <Modal
                isOpen={swipeMetro}
                onRequestClose={() => setSwipeMetro(false)}
                contentLabel='Swipe Metro Card'
                ariaHideApp={false}
              >
                <SwipeMetro onChange={afterChange} />
              </Modal>
            </div>
          </div>
        </div>
        <div className='cards-payment'>
          <Cards shouldUpdate={shouldUpdate} />
          <Payments shouldUpdate={shouldUpdate} />
        </div>
      </div>
    </main>
  );
};

export default App;
