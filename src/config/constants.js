export const BASE_API_PATH = process?.env?.REACT_APP_BASE_API_PATH ?? 'http://localhost:8081';

export const ORDER_STATUS = {
  OPEN: 'open',
  DELIVERED: 'delivered',
  CANCELED: 'canceled'
}