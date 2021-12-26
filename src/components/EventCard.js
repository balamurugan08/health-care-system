import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const styles = theme => ({
    root: {
        minWidth: 275,
        marginRight: 64,
    marginTop: 48,
    backgroundColor:'aliceblue'
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
        fontWeight: 700
      },
      pos: {
        marginBottom: 12,
      },
});

class EventCard extends React.Component {

  state={
    showCard:true
  }

  handleButtonOnclick=(eventDetailsData)=>{
    this.setState({showCard:false})
    this.props.isDisplayCard(false,eventDetailsData);

  }
  handleBack=()=>{
    this.setState({showCard:true})
  }
  render() {
    const { classes } = this.props;
    const {showCard} = this.state;
    const eventDetailsData = this.props.eventDetails;
    return (
      <div>
       {showCard?
         <Card className={classes.root} variant="outlined">
    <CardContent>
      <Typography className={classes.title}  gutterBottom>
      Event ID : {eventDetailsData.id}
      </Typography>
      <Typography className={classes.title}  gutterBottom>
      Event Name : {eventDetailsData.name}
      </Typography>
      <Typography className={classes.title}  gutterBottom>
        Event Location:{eventDetailsData.location}
      </Typography>
      <Typography className={classes.title}  gutterBottom>
        Date:{eventDetailsData.date}
      </Typography>
      <Typography className={classes.title}  gutterBottom>
        Time:{eventDetailsData.time}
      </Typography>
     
     
    </CardContent>
    <CardActions style={{backgroundColor:'lavender'}}>
      <Button size="small" onClick={e=>this.handleButtonOnclick(eventDetailsData)}>View Participants</Button>
    </CardActions>
  </Card>:
  <div style={{'margin-top': 36}}>
    <Button style={{'padding':1,'margin-bottom':6}} onClick={this.handleBack}>Back</Button>
  <TableContainer component={Paper}>
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Participant Name</StyledTableCell>
        <StyledTableCell align="center">Event ID</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {eventDetailsData.participants.map((row) => (
        <StyledTableRow key={row.name}>
          <StyledTableCell component="th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="center">{row.eventId}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
</div>
  
  }
  </div>
  );
     
        
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventCard);