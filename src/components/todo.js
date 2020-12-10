import React from 'react';
import {makeStyles} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
const useStyle = makeStyles({
    root: {
        padding: '10px 15px',
        margin: '15px 0'
    },
    btn: {
        marginLeft: '15px'
    }
});

export const Todo = (props)=>{
    const { todo, onChangeTodo, onClickAdd} = props;
    const classes = useStyle();
    return(
        <Paper className={classes.root}>
            <Box display="flex" alignItems="center">
                <TextField value={todo} onChange={onChangeTodo} id="standard-basic" label="Standard" />
                <Box className={classes.btn}><Button variant="contained" color="primary" onClick={onClickAdd}>登録する</Button></Box>
            </Box>
        </Paper>
    )
}
