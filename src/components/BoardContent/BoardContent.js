import React, { useState, useEffect, useRef } from 'react'
import '_setting.scss'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { isEmpty } from 'lodash'

import { Container, Draggable } from 'react-smooth-dnd'
import { flushSync } from 'react-dom'
import { fetchBoardsDetail, createNewColumn } from 'actions/ApiCall'

import { Container as BootstrapContainer, Col, Row, Form, Button } from 'react-bootstrap'
function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
    const toggleOpenNewColumnForm = () => {
        setOpenNewColumnForm(!openNewColumnForm)
    }

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const newColumnInputRef = useRef(null)

    useEffect(() => {
        const boardId = '630e7cb18078f85a78f8406f'
        fetchBoardsDetail(boardId).then(board => {
            console.log(board)
            setBoard(board)
            setColumns(mapOrder(board.columns, board.columnOrder, '_id'))
        })
    }, [])

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [openNewColumnForm])
    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' }}>Board not found!</div>
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(column => column._id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
    }
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(column => column._id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(c => c._id)
            flushSync(() => {
                setColumns(newColumns)
            })
        }
    }

    const addNewColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }
        const newColumnToAdd = {
            boardId: board._id,
            title: newColumnTitle.trim()
        }
        //call api
        createNewColumn(newColumnToAdd).then(column => {
            let newColumns = [...columns]
            newColumns.push(column)

            let newBoard = { ...board }
            newBoard.columnOrder = newColumns.map(column => column._id)
            newBoard.columns = newColumns
            setColumns(newColumns)
            setBoard(newBoard)

            setNewColumnTitle('')
            setOpenNewColumnForm(!openNewColumnForm)
        })
    }
    const onUpdateColumnState = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate._id
        let newColumns = [...columns]

        const columnIndexToUpdate = newColumns.findIndex(column => column._id === columnIdToUpdate)
        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(columnIndexToUpdate, 1)

        } else {
            //update column
            newColumns.splice(columnIndexToUpdate, 1, newColumnToUpdate)

        }
        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(column => column._id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
    }
    const onAddNewCardToColumn = (newColumn) => {
        onUpdateColumnState(newColumn)
    }
    return (
        <div className="board-contents">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index =>
                    columns[index]
                }
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index} >
                        <Column column={column} onCardDrop={onCardDrop} onUpdateColumnState={onUpdateColumnState} onAddNewCardToColumn={onAddNewCardToColumn} />
                    </Draggable>)
                )}
            </Container>
            <BootstrapContainer className="trello-container">
                {!openNewColumnForm ?
                    <Row>
                        <Col className='add-new-column' onClick={toggleOpenNewColumnForm}>
                            <i className='fa fa-plus icon' /> Add another column
                        </Col>
                    </Row> :
                    <Row>
                        <Col className='enter-new-column'>
                            <Form.Control
                                size='small'
                                type='text'
                                placeholder='Enter column title...'
                                className='input-enter-new-column'
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={e => setNewColumnTitle(e.target.value)}
                                onKeyDown={e => (e.key === 'Enter') && addNewColumn()}
                            ></Form.Control>
                            <Button variant="success" size='small' onClick={addNewColumn}>Add column</Button>
                            <span className='cancel-icon'>
                                <i className='fa fa-trash icon' onClick={toggleOpenNewColumnForm} />
                            </span>
                        </Col>
                    </Row>
                }

            </BootstrapContainer>
        </div>
    )
}

export default BoardContent