import React from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import EventCard from "./EventCard";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

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

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  root_input: {
    paddingLeft: "8px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid grey",
    borderRadius: "5px",
    font: "normal normal 300 17px/35px Roboto",
    color: "grey",
    height: "40px",
    marginRight: "18px",
  },
});

const eventBaseUrl = "http://localhost:8080/sports/events";

class OngoingEvents extends React.Component {
  state = {
   eventDetails: [],
   isShowCard:true,
   newEventDetails: [],
  };

  componentWillMount(){
    axios.get(eventBaseUrl).then((res) => {
      this.setState({eventDetails:res.data})
    });

  }

  handleDisplayValue=(value,data)=>{
    this.setState({
      isShowCard:value,
      newEventDetails:data
    })
  }

  handleBack=()=>{
    this.setState({isShowCard:true,newEventDetails:[]})
  }

  render() {
    const {
      eventDetails,isShowCard,newEventDetails
    } = this.state;
    const { classes } = this.props;
    
    return (
      <div className="flex justify-center" >
          {isShowCard ? <div style={{flexWrap:'wrap',display:'flex',justifyContent:'center'}}>
             {eventDetails.map((data)=>(data.eventType==='ONGOING'?
         <EventCard eventDetails={data} isDisplayCard={this.handleDisplayValue}/>:''
        ))}</div>:
        <div style={{'margin-top': 36}}>
    <Button style={{'padding':1,'margin-bottom':6}} onClick={this.handleBack}>Back</Button>
    {newEventDetails.participants.length>0 ?
           <TableContainer component={Paper}>
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Participant Name</StyledTableCell>
        <StyledTableCell align="center">Event ID</StyledTableCell>
        <StyledTableCell align="center">Event Name</StyledTableCell>
        <StyledTableCell align="center">Event Location</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {newEventDetails.participants.map((row) => (
        <StyledTableRow key={row.name}>
          <StyledTableCell component="th">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="center">{row.eventId}</StyledTableCell>
          <StyledTableCell align="center">{newEventDetails.name}</StyledTableCell>
          <StyledTableCell align="center">{newEventDetails.location}</StyledTableCell>

        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>:<h1>No participants</h1>}
        </div> }
       
      </div>
    );
  }
}

export default withStyles(styles)(OngoingEvents);
