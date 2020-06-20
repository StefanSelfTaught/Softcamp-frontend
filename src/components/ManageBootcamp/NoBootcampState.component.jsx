import React from 'react';

import useLocalStorage from 'hooks/useLocalStorage.hook';
import NoBootcampFound from 'components/ManageBootcamp/NoBootcampFound.component';
import CreateBootcamp from 'components/ManageBootcamp/CreateBootcamp.component';

const NoBootcampState = () => {
  const [createBootcamp, setCreateBootcamp] = useLocalStorage(
    'createBootcampState',
    false,
  );

  const handleDontCreateBootcamp = () => {
    setCreateBootcamp(false);
  };

  const handleCreateBootcamp = () => {
    setCreateBootcamp(true);
  };

  return createBootcamp ? (
    <CreateBootcamp dontCreateBootcamp={handleDontCreateBootcamp} />
  ) : (
    <NoBootcampFound createBootcamp={handleCreateBootcamp} />
  );
};

export default NoBootcampState;
