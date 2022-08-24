export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: [
                'column-1',
                'column-3',
                'column-2',
                'column-4'
            ],
            columns: [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'To do column',
                    cardOrder: ['card-3', 'card-1', 'card-2'],
                    cards: [
                        { id: 'card-1', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 1 of col 1', cover: 'https://kynguyenlamdep.com/wp-content/uploads/2022/06/anh-gai-xinh-cuc-dep.jpg' },
                        { id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 2 of col 1', cover: null },
                        { id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title of card 3 of col 1', cover: null }
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'In Progress column',
                    cardOrder: ['card-4', 'card-5', 'card-6', 'card-7', 'card-8', 'card-9'],
                    cards: [
                        { id: 'card-4', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 4 of col 2', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCTzNfO1e6zY9Jsb_Q2kdWOMeuwe8ZGZ3XFgZByKiO2QRxded7q6eiDORfV7NG4djNJfw&usqp=CAU' },
                        { id: 'card-5', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 5 of col 2', cover: null },
                        { id: 'card-6', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 6 of col 2', cover: null },
                        { id: 'card-7', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 7 of col 2', cover: null },
                        { id: 'card-8', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 8 of col 2', cover: null },
                        { id: 'card-9', boardId: 'board-1', columnId: 'column-2', title: 'Title of card 9 of col 2', cover: null },
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done column',
                    cardOrder: ['card-10', 'card-11', 'card-12', 'card-13', 'card-14'],
                    cards: [
                        { id: 'card-10', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 10 of col 3', cover: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm9luhfGFbX5nSXW4bHqgp7R_GThxdttFK6S_wRdEMj9nH8IGf0dAPpjoRMjBhlrVVQro&usqp=CAU' },
                        { id: 'card-11', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 11 of col 3', cover: null },
                        { id: 'card-12', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 12 of col 3', cover: null },
                        { id: 'card-13', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 13 of col 3', cover: null },
                        { id: 'card-14', boardId: 'board-1', columnId: 'column-3', title: 'Title of card 14 of col 3', cover: null },
                    ]
                }
                ,
                {
                    id: 'column-4',
                    boardId: 'board-1',
                    title: 'Hi column',
                    cardOrder: ['card-15', 'card-16'],
                    cards: [
                        { id: 'card-15', boardId: 'board-1', columnId: 'column-4', title: 'Title of card 15 of col 4', cover: null },
                        { id: 'card-16', boardId: 'board-1', columnId: 'column-4', title: 'Title of card 16 of col 4', cover: null }
                    ]
                }
            ]
        }
    ]
}