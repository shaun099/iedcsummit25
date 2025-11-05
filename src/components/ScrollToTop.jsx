import { useScrollToTop } from '../hooks/useScrollToTop';

export const ScrollToTop = ({ children }) => {
  useScrollToTop();
  return children;
};
