import React from 'react'
import ReactModal from 'react-modal'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './DraggableModal.css'

ReactModal.setAppElement('body')


// properties that used to modal drag
const dragMapping = {
  selectedElement: null,
  xPos: 0,
  yPos: 0,
  xElemOffset: 0,
  yElemOffset: 0,
  ariaDragging: false,
}

/**
 * dragInit
 * @param {*} elem
 * Will be called when user starts dragging an element
 */
const dragInit = elem => {
  // Store the object of the element which needs to be moved
  dragMapping.selectedElement = elem
  dragMapping.xElemOffset =
    dragMapping.xPos - dragMapping.selectedElement.offsetLeft
  dragMapping.yElemOffset =
    dragMapping.yPos - dragMapping.selectedElement.offsetTop
}

/**
 * moveElement
 * Will be called when user dragging an element
 * @param {*} e
 */
const moveElement = e => {
  dragMapping.xPos = document.all ? window.event.clientX : e.pageX
  dragMapping.yPos = document.all ? window.event.clientY : e.pageY
  dragMapping.ariaDragging = true
  if (dragMapping.selectedElement !== null) {
    dragMapping.selectedElement.style.left = `${dragMapping.xPos -
      dragMapping.xElemOffset}px`
    dragMapping.selectedElement.style.top = `${dragMapping.yPos -
      dragMapping.yElemOffset}px`
    dragMapping.selectedElement.style.position = 'absolute'
  }
}

// Destroy the object when we are done
const destroy = () => {
  dragMapping.selectedElement = null
  dragMapping.ariaDragging = false
}

/**
 * Will be called once modal opens
 * addListeners
 * @param {*} stats
 */
function DraggableModal({
  children,
  title,
  contentLabel,
  getAppElement,
  onRequestClose,
  isOpen,
  gutterless,
  contentRef,
  wide,
  style,
  fullScreen,
  closeController,
  fullHeight,
  modalId,
  contentWidth,
}) {
  const innerContentClass = gutterless
    ? 'gutterless'
    : 'ReactModal__InnerContent'
  const modalClass = classNames(
    'ReactModal__Content',
    styles.HelpModalContent,
    {
      wideContent: wide,
    },
    { fullScreenModal: fullScreen },
    { normalScreenModal: !fullScreen }
  )
  const titleClass = fullScreen ? 'fullScreenTitle' : styles.title
  const TagName = fullScreen ? 'span' : 'h2'

  /**
   * onAfterOpen
   * on open after modal add events to the element
   */
  const onAfterOpen = () => {
    const element = document.getElementById(modalId)
    element.onmousedown = () => {
      dragInit(element)
      return false
    }
    document.onmousemove = moveElement
    document.onmouseup = destroy
  }
  return (
    <ReactModal
      className={modalClass}
      contentLabel={contentLabel}
      ariaHideApp={false}
      isOpen={isOpen}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}
      closeController={closeController}
      getAppElement={getAppElement}
      closeTimeoutMS={300}
      key={contentLabel}
      contentRef={contentRef}
      style={style}
      shouldCloseOnOverlayClick={false}
      aria={{
        labelledby: 'heading fulldescription',
      }}
    >
      <div
        className={classNames(
          'ReactModal__InsideContent',
          styles.HelpModalInsideContent,
        )}
        style={{ maxWidth: contentWidth }}
        draggable
        id={modalId}
        aria-grabbed={dragMapping.ariaDragging}
      >
        <div
          className={classNames('ReactModal__Header', {
            fullScreenHeader: fullScreen,
          })}
        >
          <TagName id="heading" className={titleClass}>
            {title}
          </TagName>
          <div
            className={classNames('fullScreenCloseButton', {
              normalCloseButton: !fullScreen,
            })}
          >
            <span onClick={closeController}>X</span>
          </div>
        </div>
        {fullScreen && <hr />}
        <div
          id="fulldescription"
          className={classNames(innerContentClass, styles.innerContent)}
        >
          {children}
        </div>
      </div>
    </ReactModal>
  )
}

DraggableModal.defaultProps = {
  isOpen: false,
  onRequestClose: () => {},
  getAppElement: () => document.getElementById('root'),
  gutterless: false,
  wide: false,
  contentRef: () => {},
  style: {
    content: {
      pointerEvents: 'all',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      pointerEvents: 'none',
    },
  },
  fullScreen: false,
  fullHeight: false,
  closeController: () => {},
  contentWidth: '600px',
}

DraggableModal.propTypes = {
  /**
   * to display modal
   */
  isOpen: PropTypes.bool,
  /**
   *  call back on close of modal
   */
  onRequestClose: PropTypes.func,
  /**
   * to get the app element for modal
   */
  getAppElement: PropTypes.func,
  /**
   * react model css
   */
  gutterless: PropTypes.bool,
  /**
   * to render modal widely 
   */
  wide: PropTypes.bool,
  /**
   * containes css of model and overlay
   */
  contentRef: PropTypes.func,
  /**
   * custom style object
   */
  style: PropTypes.shape({
    content: PropTypes.any,
    overlay: PropTypes.shape({
        backgroundColor: PropTypes.string,
        pointerEvents: PropTypes.string,
    }),
  }),
  /**
   * title of model
   */
  title: PropTypes.node.isRequired,
  /**
   *  content label
   */
  contentLabel: PropTypes.string.isRequired,
  /**
   * children, anythinh u can pass
   */
  children: PropTypes.node.isRequired,
  /**
   * open popup in polltip
   */
  fullScreen: PropTypes.bool,

  /**
   * close controller, on close of model
   */
  closeController: PropTypes.func,
  /**
   * to fix the height of model
   */
  fullHeight: PropTypes.bool,
  /**
   * mpdelId for car
   */
  modalId: PropTypes.node.isRequired,
  /**
   * Need more help link on modal if we use More help button
   */
  needMoreHelpLink: PropTypes.string,
  /**
   * width of content
   */
  contentWidth: PropTypes.string,
}

export default DraggableModal