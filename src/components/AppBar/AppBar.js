import React from 'react'
import './AppBar.scss'
import { Form } from 'react-bootstrap'
import { useState } from 'react'
function AppBar() {
    const [input, setInput] = useState('')
    return (
        <nav className='navbar'>
            <div className='navbar__left'>
                <div className='navbar__container-icon'>
                    <i className='fa fa-th icon' />
                </div>
                <div className='navbar__container-icon'>
                    <i className='fa fa-home icon' />
                </div>
                <div className='navbar__container-icon'>
                    <i className='fa fa-columns icon' />
                    <div className='navbar__container-text'>Boards</div>
                </div>
                <div className='navbar__container-icon'>
                    <Form.Control
                        size='small'
                        type='text'
                        placeholder='Jump to...'
                        className='navbar__container-input'
                        // ref={newColumnInputRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    // onKeyDown={e => (e.key === 'Enter') && addNewColumn()}
                    ></Form.Control>
                    <i className='fa fa-search icon' />
                </div>
            </div>
            <div className='navbar__logo'>FromSunNews</div>
            <div className='navbar__right'>
                <div className='navbar__container-icon'>
                    <i className='fa fa-plus-square-o icon' />
                </div>
                <div className='navbar__container-icon'>
                    <i className='fa fa-info-circle icon' />
                </div>
                <div className='navbar__container-icon'>
                    <i className='fa fa-bell-o icon' />
                </div>
                <div className='navbar__avatar'>
                    <img src='http://mcvideomd1fr.keeng.net/playnow/images/channel/avatar/20190408/84947430634_20190408001343.jpg' className='navbar__img' />
                </div>
            </div>
        </nav>
    )
}

export default AppBar