import React from 'react';
import TopItems from '../TopItems/TopItems'


const createTopItems = WrappedComponent => {
  return props => <WrappedComponent {...props} />
}
export const ReuseTopItems = createTopItems(TopItems)
