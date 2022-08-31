import axios from 'axios'
import { API_ROOT } from 'utilities/constants'

export const fetchBoardsDetail = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return request.data
}

export const updateBoard = async (boardId, boardData) => {
  const request = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, boardData)
  return request.data
}

export const createNewColumn = async (columnData) => {
  const request = await axios.post(`${API_ROOT}/v1/columns`, columnData)
  return request.data
}
//update or remove column
export const updateColumn = async (columnId, columnData) => {
  const request = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, columnData)
  return request.data
}

export const createNewCard = async (cardData) => {
  const request = await axios.post(`${API_ROOT}/v1/cards`, cardData)
  return request.data
}

export const updateCard = async (cardId, cardData) => {
  const request = await axios.put(`${API_ROOT}/v1/cards/${cardId}`, cardData)
  return request.data
}

