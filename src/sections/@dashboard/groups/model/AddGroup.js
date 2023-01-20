import PropTypes from 'prop-types';

import AddGroupForm from './AddGroupForm';

AddGroup.propTypes = {
  onCancel: PropTypes.func,
};

export default function AddGroup({ onCancel }) {

  return (
    <>  
      <AddGroupForm onCancel={onCancel}/>
    </>
  );
}
