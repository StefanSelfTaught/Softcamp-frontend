import React from 'react';

import { Button } from 'antd';

import axios from '../../utils/axiosInstance';

const ManageBootcamp = ({ bootcampId, bootcampName }) => {
  const handleDelete = async () => {
    await axios.delete(`/bootcamps/${bootcampId}`);
  };

  return (
    <>
      <h2>{bootcampName}</h2>
      <Button onClick={handleDelete} type='primary' danger>
        Delete Bootcamp
      </Button>
    </>
  );
};

export default ManageBootcamp;
