import './App.css';
import React, { useState,  Fragment } from 'react'
import DraggableModal from './common/DraggableModal/DraggableModal'

function App() {
  const [isModalOpen, setModalOpen] = useState(false)

  // click event to open modal
  const onClickButton = () => {
    setModalOpen(true)
  }
  
  return (
    <div className="App">
      <Fragment>
        <div className="container">
          <p>To display the modal, click on the open modal button. You can drag the modal in page to any extent</p>
          <pre>{`
            <DraggableModal 
               title="your title"
               isOpen={false}
               modalId="modalDraggable"
               contentLabel="my test modal"
               closeController={()=>{}}
            >
               <p>Modal using react modal adding drag and drop to the component</p>
            </DraggableModal>
          `}
          </pre>
          <button type="button" onClick={onClickButton}>Open modal</button>
          {isModalOpen && 
            <DraggableModal 
              title="My test modal"
              isOpen
              modalId="modalDraggable"
              contentLabel="my test modal"
              closeController={ () => { setModalOpen(false)}}
              contentWidth="100%"
            >
              <p>Modal using react modal adding drag and drop to the component</p>
            </DraggableModal>
          }
        </div>
        <p><u>Note: Test cases not implemeneted</u></p>
      </Fragment>
    </div>
  );
}

export default App;
