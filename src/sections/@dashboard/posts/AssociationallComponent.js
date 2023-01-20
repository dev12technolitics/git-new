
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

AssociationallComponent.propTypes = {
    onCancel: PropTypes.func,
};
export default function AssociationallComponent({ handleSelect, index, item, projectType }) {
    const [isCheck, setIsCheck] = useState(false)

    useEffect(()=>{
        if (projectType?.filter((v) => v == item._id)[0] == item._id) {
            setIsCheck(true)
        } else {
            setIsCheck(false)
        }
    },[])

    const onSelect = ()=>{
        if (isCheck == false) {
            setIsCheck(true)
        } else {
            setIsCheck(false)
        }
    }

    return (
        <>
            <Grid item xs={12} md={4} key={index}>
                <div key={item.id} className="checkbox-container">
                    <input
                        type="checkbox"
                        name="languages"
                        value={item?._id}
                        checked={isCheck}
                        onChange={handleSelect}
                        onClick={() => onSelect()}
                    />
                    <label style={{ marginLeft: '7px' }}>{item.name}</label>
                </div>
            </Grid>
        </>
    );
}
