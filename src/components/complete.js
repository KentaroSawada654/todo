import React from 'react';
import {makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
        paddingTop: '15px',
        marginTop:'15px'
    },
    table: {

    },
    td: {
        width: '70px',
    },
    title: {
        fontSize: '18px',
        textAlign: 'center',
        marginBottom:'15px'
    }
});

export const Complete = (props) => {
    const classes = useStyles();
    const {onClickBack,complete} = props;
    return (
        <Paper className={classes.root}>
            <Typography className={classes.title} variant="h2" gutterBottom>完了のタスク</Typography>
            <Table className={classes.table} aria-label="simple table">
            {
                complete.map((item,index) => {
                    return(
                        <TableRow key={item}>
                            <TableCell component="th" scope="row">{item}</TableCell>
                            <TableCell className={classes.td}>
                                <Button className={classes.btn} onClick={() => { onClickBack(index) }} variant="contained" color="primary">戻す</Button>
                            </TableCell>
                        </TableRow>
                    )
                })
            }
            </Table>
        </Paper>
    )
}