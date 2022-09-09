import React from 'react'
import '_setting.scss'
import './BoardBar.scss'

function BoardBar() {
    return (
        <nav className='boardbar'>
            <div className='boardbar__left'>
                <div className='boardbar__container-icon icon'>
                    <i className="fa fa-coffee"></i>
                    <div className='boardbar__container-text'>My Day, FromSunNews</div>
                </div>
                <div className='boardbar__container--saperate'></div>
                <div className='boardbar__container-icon '>
                    <div className='boardbar__container-text'>Private Workspace</div>
                </div>
                <div className='boardbar__container--saperate'></div>
                <div className='boardbar__avatar'>
                    <img src='http://mcvideomd1fr.keeng.net/playnow/images/channel/avatar/20190408/84947430634_20190408001343.jpg' className='boardbar__img' />
                </div>
                <div className='boardbar__avatar'>
                    <img src='http://mcvideomd1fr.keeng.net/playnow/images/channel/avatar/20190408/84947430634_20190408001343.jpg' className='boardbar__img' />
                </div>
                <div className='boardbar__avatar'>
                    <img src='http://mcvideomd1fr.keeng.net/playnow/images/channel/avatar/20190408/84947430634_20190408001343.jpg' className='boardbar__img' />
                </div>
                <div className='boardbar__avatar'>
                    <img src='http://mcvideomd1fr.keeng.net/playnow/images/channel/avatar/20190408/84947430634_20190408001343.jpg' className='boardbar__img' />
                </div>
                <div className='boardbar__avatar'>
                    <img src='http://mcvideomd1fr.keeng.net/playnow/images/channel/avatar/20190408/84947430634_20190408001343.jpg' className='boardbar__img' />
                </div>
                <div className='boardbar__avatar boardbar__number'>
                    <div className='boardbar__text'>+7</div>
                </div>
                <div className='boardbar__container-icon '>
                    <div className='boardbar__container-text'>Invite</div>
                </div>
            </div>
            <div className='boardbar__right'>
                <div className='boardbar__container-icon icon'>
                    <i className="fa fa-ellipsis-h mr-2"></i>
                    <div className='boardbar__container-text'>Show menu</div>
                </div>
            </div>

        </nav>
    )
}

export default BoardBar