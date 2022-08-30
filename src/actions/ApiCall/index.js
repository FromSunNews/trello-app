import axios from 'axios'
import { API_ROOT } from 'utilities/constants'
export const fetchBoardsDetail = async (boardId) => {
  const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return request.data
}