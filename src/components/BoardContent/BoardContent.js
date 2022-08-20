import React from 'react'
import "_setting.scss";
import "./BoardContent.scss";
import Column from 'components/Column/Column';

function BoardContent() {
    return (
        <div className="board-contents">
            <Column />
            <Column />
            <Column />
            <Column />
            <Column />
        </div>
    )
}

export default BoardContent