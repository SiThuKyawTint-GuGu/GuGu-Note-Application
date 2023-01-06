import React from 'react'

const Spinner = () => {
  return (
    <div className='d-flex justify-content-center align-item-center'>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner