import React, { useEffect, useState } from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'

import { Container, Draggable } from 'react-smooth-dnd'

import Card from 'components/Card/Card'

import ConfirmModal from 'components/Common/ConfirmModal'
import { Dropdown } from 'react-bootstrap'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { Form } from 'react-bootstrap'
function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [newColumnTitle, setNewColumnTitle] = useState('')
    useEffect(() => {
        setNewColumnTitle(column.title)
    }, [column.title])
    console.log(column.title)
    const toggleShowConfirmModal = () => {
        setShowConfirmModal(!showConfirmModal)
    }
    const onConfirmModalAction = (type) => {
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = { ...column, _destroy: true }
            onUpdateColumn(newColumn)
        }
        toggleShowConfirmModal()
    }
    const handleColumnTitleBlur = () => {
        const newColumn = { ...column, title: newColumnTitle }
        onUpdateColumn(newColumn)
    }
    const saveContentAfterPressEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            e.target.blur()
        }
    }
    return (
        <div className='column'>
            <header className="column-drag-handle">
                <div className='column-title'>
                    <Form.Control
                        size='small'
                        type='text'
                        className='trello-content-editable'
                        value={newColumnTitle}
                        onChange={e => setNewColumnTitle(e.target.value)}
                        spellCheck='false'
                        onClick={e => e.target.select()}
                        onBlur={handleColumnTitleBlur}
                        onKeyDown={e => saveContentAfterPressEnter(e)}
                        onMouseDown={e => e.preventDefault()}
                    ></Form.Control>
                </div>
                <div className='column-dropdown-actions'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" size='sm' className='dropdown-btn' />
                        <Dropdown.Menu>
                            <Dropdown.Item>Add card...</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column</Dropdown.Item>
                            <Dropdown.Item>Move all cards in this column (beta)...</Dropdown.Item>
                            <Dropdown.Item>Archive all cards in this column (beta)...</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    groupName="col"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index =>
                        cards[index]
                    }
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) =>
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>
                    )}
                </Container>
            </div>
            <footer>
                <div className="footer-actions">
                    <i className='fa fa-plus icon' />Add another card
                </div>
            </footer>
            <ConfirmModal
                show={showConfirmModal}
                onAction={onConfirmModalAction}
                title="Remove column"
                content={`Are you sure you want to remove <strong>${column.title}</strong> <br />All related cards will be removed!`}
            />
        </div>
    )
}

export default Column