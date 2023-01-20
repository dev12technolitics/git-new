
import PropTypes from 'prop-types';
import GroupSelectAllfrom from './GroupSelectAllfrom';

GroupSelectAll.propTypes = {
  onCancel: PropTypes.func,
};

export default function GroupSelectAll({ onCancel, projectType, setProjectType }) {
  return (
    <>
      <GroupSelectAllfrom onCancel={onCancel} projectType={projectType} setProjectType={setProjectType} />
    </>
  );
}
