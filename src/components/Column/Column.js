import React, { useEffect, useState, useRef } from 'react'
import './Column.scss'
import { mapOrder } from 'utilities/sorts'

import { Container, Draggable } from 'react-smooth-dnd'

import Card from 'components/Card/Card'

import ConfirmModal from 'components/Common/ConfirmModal'
import { Dropdown } from 'react-bootstrap'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'
function Column(props) {
    const { column, onCardDrop, onUpdateColumn, onAddNewCardToColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const [newColumnTitle, setNewColumnTitle] = useState('')

    const [openNewCardForm, setOpenNewCardForm] = useState(false)

    const [newCardTitle, setNewCardTitle] = useState('')

    const toggleOpenNewCardForm = () => {
        setOpenNewCardForm(!openNewCardForm)
    }

    const newCardTextAreaRef = useRef(null)

    useEffect(() => {
        setNewColumnTitle(column.title)
    }, [column.title])

    useEffect(() => {
        if (newCardTextAreaRef && newCardTextAreaRef.current) {
            newCardTextAreaRef.current.focus()
            newCardTextAreaRef.current.select()
        }
    }, [openNewCardForm])

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
    const addNewCard = () => {
        if (!newCardTitle) {
            newCardTextAreaRef.current.focus()
            return
        }
        const newCardToAdd = {
            id: Math.random().toString(36).substring(2, 5),
            boardId: column.boardId,
            columnId: column.id,
            title: newCardTitle.trim(),
            cover: null

        }
        let newColumn = cloneDeep(column)
        newColumn.cards.push(newCardToAdd)
        newColumn.cardOrder.push(newCardToAdd.id)

        onAddNewCardToColumn(newColumn)

        setNewCardTitle('')
        toggleOpenNewCardForm()
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
                            <Dropdown.Item onClick={toggleOpenNewCardForm}>Add card...</Dropdown.Item>
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
                {openNewCardForm &&
                    <div className="card-new-card-area">
                        <Form.Control
                            size='small'
                            as='textarea'
                            rows={3}
                            placeholder='Enter content this card...'
                            className='input-enter-new-card'
                            ref={newCardTextAreaRef}
                            value={newCardTitle}
                            onChange={e => setNewCardTitle(e.target.value)}
                            onKeyDown={e => (e.key === 'Enter') && addNewCard()}
                        />
                    </div>
                }

            </div>
            <footer>
                {openNewCardForm ?
                    <div className="card-new-card-actions">
                        <Button variant="success" size='small' onClick={addNewCard}>Add card</Button>
                        <span className='cancel-icon' onClick={toggleOpenNewCardForm}>
                            <i className='fa fa-trash icon' />
                        </span>
                    </div>
                    :
                    <div className="footer-actions" onClick={toggleOpenNewCardForm}>
                        <i className='fa fa-plus icon' />Add another card
                    </div>
                }
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