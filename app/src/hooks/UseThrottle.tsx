import _ from 'lodash';
import { useCallback, useEffect, useRef } from 'react';

export const useThrottle = (
  cb: Function,
  delay: number,
  options?: _.ThrottleSettings
) => {
  const cbRef = useRef(cb);
  // use mutable ref to make useCallback/throttle not depend on `cb` dep
  useEffect(() => {
    cbRef.current = cb;
  });
  return useCallback(
    _.throttle((...args) => cbRef.current(...args), delay, options),
    [delay]
  );
};
