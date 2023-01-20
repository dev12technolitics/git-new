import { Box, Button, DialogActions, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import axios from "../../../utils/axios";
import AssociationallComponent from './AssociationallComponent';
import GroupallComponent from './GroupallComponent';

export default function MembersAddForm({ onCancel, projectType, setProjectType }) {
  const [designationsType, setDesignationsType] = useState([]);
  const [associationsalldata, setAssociationsalldata] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const [filterName, setFilterName] = useState('');

  const getassociationsdata = async () => {
    const response = await axios.get('/association/active/all');
    setAssociationsalldata(response?.data?.group);
  };
  const getGroupsdata = async () => {
    const response = await axios.get('/group/all');
    setDesignationsType(response.data.group);
  };

  useEffect(() => {
    getassociationsdata();
    getGroupsdata();
  }, []);

  useEffect(() => {
    setCheckedList(projectType)
  }, [projectType]);

  const handleFilterName = (filterName) => {
    setFilterName(filterName);
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedList([...checkedList, value]);
    } else {
      const filteredList = checkedList.filter((item) => item !== value);
      setCheckedList(filteredList);
    }
  };

  const onSubmit = () => {
    setProjectType(checkedList);
    onCancel();
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Box sx={{ p: 3 , mt:-3}}>
            {/* <div className="">
              <TextField
                fullWidth
                value={filterName}
                onChange={(event) => handleFilterName(event.target.value)}
                placeholder="Search by Groups Name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </div> */}
            <div className="" style={{ marginTop: '20px' }}>
              <div className="form-group">
                <h3>Management/Communication Groups</h3>
              </div>

              <Grid container spacing={3}>
                {designationsType.map((item, index) => (
                  <GroupallComponent handleSelect={handleSelect} key={index} projectType={projectType} item={item} index={index} />
                ))}
              </Grid>
            </div>

            <div className="" style={{ marginTop: '20px' }}>
              <div className="form-group">
                <h3>Assocition Groups</h3>
              </div>
              <Grid container spacing={3}>
                {associationsalldata?.map((item, index) => (
                  <AssociationallComponent handleSelect={handleSelect} key={index} projectType={projectType} item={item} index={index} />
                ))}
              </Grid>
            </div>
          </Box>
        </Grid>
      </Grid>

      <DialogActions>
        <Button variant="contained" onClick={() => onSubmit()}>
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
    </>
  );
}
