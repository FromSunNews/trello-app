import React, { useState, useEffect } from 'react'
import '_setting.scss'
import './BoardContent.scss'
import Column from 'components/Column/Column'

import { mapOrder } from 'utilities/sorts'
import { applyDrag } from 'utilities/dragDrop'

import { initialData } from 'actions/initialData'
import { isEmpty } from 'lodash'

import { Container, Draggable } from 'react-smooth-dnd'
import { flushSync } from 'react-dom'


function BoardContent() {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id == 'board-1')
        if (boardFromDB) {
            setBoard(boardFromDB)

            //sort column
            // boardFromDB.columns.sort((a, b) => {
            //     return (boardFromDB.columnOrder.indexOf(a.id) - boardFromDB.columnOrder.indexOf(b.id))
            // })

            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
        }
    }, [])
    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' }}>Board not found!</div>
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(column => column.id)
        newBoard.columns = newColumns
        setColumns(newColumns)
        setBoard(newBoard)
        console.log(newBoard)
    }
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns]
            let currentColumn = newColumns.find(column => column.id === columnId)
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)
            currentColumn.cardOrder = currentColumn.cards.map(c => c.id)
            flushSync(() => {
                setColumns(newColumns)
            })
        }
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
                        <Column column={column} onCardDrop={onCardDrop} />
                    </Draggable>)
                )}
                <div className='add-new-column'>
                    <i className='fa fa-plus icon' /> Add Another Column
                </div>
            </Container>

        </div>
    )
}

export default BoardContent