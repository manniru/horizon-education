import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles';
import Card, {CardMedia} from 'material-ui/Card';
import {NavLink} from 'react-router-dom'
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import PhoneIcon from 'material-ui-icons/Phone';
import AcademicsIcon from 'material-ui-icons/ModeEdit';
import DirectionsIcon from 'material-ui-icons/Directions';
import FaqIcon from 'material-ui-icons/QuestionAnswer';
import HomeIcon from 'material-ui-icons/Home';
import ComputerIcon from 'material-ui-icons/Computer';
import Toolbar from 'material-ui/Toolbar';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import {Button, Dialog} from "../../node_modules/material-ui/index";
import {add} from '../helpers/auth'


import {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "../../node_modules/material-ui/Dialog/index";
import TextField from "../../node_modules/material-ui/TextField/TextField";

const styles = theme => ({
    root: {
        marginTop: 0,
        width: '100%',
        backgroundColor:'#002147',
    },
    card: {
        maxWidth: 400,
    },
    media: {
        height: 300,
        marginBottom:20,
    },
    list: {
        width: 250,
        flex: 'initial',
    },
    listFull: {
        width: 'auto',
        flex: 'initial',
    },
    flex: {
        flex: 1,
        color: 'white',
        fontWeight: 'normal'
    },
    logoImage:{
        img: process.env.PUBLIC_URL + './icons/horizon-education.jpg',
    }

});

function TabContainer(props) {
    return <div style={{ padding: 20 }}>{props.children}</div>;
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function setErrorMsg(error) {
    return {
        registerError: error.message
    }
}
class SideBarItem extends Component {
    state = {
        open: {
            top: false,
            left: false,
            bottom: false,
            right: false,
        },
        openButton: false,
        person: {
            name: '',
            email: '',
            address: '',
            city: '',
            phoneNumber: '',
        },
        registerError: null,
        expanded: false
    };
    handleRequestClose = (e) => {
        this.setState({openButton: false});
    };
    handleClickOpen = () => {
        this.setState({openButton: true});
    };

    onEnrollClick = (e) => {
        e.preventDefault();
        console.log("when clicking, the form data is:");
        console.log(this.state.person);
        add(this.state.person);
        this.setState({openButton: false});
    };

    toggleDrawer = (side, open) => {
        const drawerState = {};
        drawerState[side] = open;
        this.setState({ open: drawerState });
    };
    handleChange = (event) => {
        event.persist(); // allow native event access (see: https://facebook.github.io/react/docs/events.html)
        this.setState((state) => state.person[event.target.name] = event.target.value);
    };
    handleExpandClick = () => {
        this.setState({ expanded: !this.state.expanded });
    };

    handleLeftOpen = () => this.toggleDrawer('left', true);
    handleLeftClose = () => this.toggleDrawer('left', false);


    render(){
        const classes = this.props.classes;

        const mailFolderListItems = (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.media}
                        image={process.env.PUBLIC_URL + 'icons/horizon-black.png'}
                        title="Contemplative Reptile"
                    />
                </Card>
                <NavLink activeClassName='active' exact to='/' >
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <div className={classes.sidebar}>
                           About
                        </div>
                    </ListItem>
                </NavLink>

                <NavLink activeClassName='active' exact to='academics'>
                    <ListItem button>
                        <ListItemIcon>
                            <AcademicsIcon />
                        </ListItemIcon>
                        <div className={classes.sidebar}>
                            Academics
                        </div>
                    </ListItem>
                </NavLink>

                <NavLink activeClassName='active' exact to='admissions'>
                    <ListItem button>
                        <ListItemIcon>
                            <PhoneIcon />
                        </ListItemIcon>
                        <div className={classes.sidebar}>
                            Admissions
                        </div>
                    </ListItem>
                </NavLink>

                <NavLink activeClassName='active' exact to='directions' >
                    <ListItem button>
                        <ListItemIcon>
                            <DirectionsIcon />
                        </ListItemIcon>
                        <div className={classes.sidebar}>
                            Directions
                        </div>
                    </ListItem>
                </NavLink>

                {/*
                <NavLink activeClassName='active' exact to='faculty'>
                    <ListItem button>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <div className={classes.sidebar}>
                            Faculty
                        </div>
                    </ListItem>
                </NavLink>
                */}

                <NavLink activeClassName='active' exact to='faq'>
                    <ListItem button>
                        <ListItemIcon>
                            <FaqIcon/>
                        </ListItemIcon>
                        <div className={classes.sidebar}>
                            FAQ
                        </div>
                    </ListItem>
                </NavLink>
            </div>
        );
        const otherMailFolderListItems = (
            <div>
                <ListItem button>
                    <ListItemIcon>
                        <ComputerIcon />
                    </ListItemIcon>
                    <ListItemText primary="Careers" />
                </ListItem>
            </div>
        );

        const sideList = (
            <div>
                <List className={classes.list} disablePadding>
                    {mailFolderListItems}
                </List>
                <Divider />
                <List className={classes.list} disablePadding>
                    {otherMailFolderListItems}
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <Toolbar>
                    <IconButton color="contrast" aria-label="Menu"  onClick={this.handleLeftOpen}>
                        <MenuIcon />
                    </IconButton>
                        <Drawer
                            open={this.state.open.left}
                            onRequestClose={this.handleLeftClose}
                            onClick={this.handleLeftClose}>
                            {sideList}
                        </Drawer>
                    <Typography type="title" className={classes.flex}>
                        Horizon Education
                    </Typography>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M2.001 9.352c0 1.873.849 2.943 1.683 3.943.031"/>
                    </svg>
                    <Button color="contrast" onClick={this.handleClickOpen}>Apply</Button>
                    <Dialog open={this.state.openButton} onRequestClose={this.handleRequestClose}>
                        <DialogTitle>{'Enroll'}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                To subscribe to our newsletter, please enter your information here. We will send
                                updates occasionally.
                            </DialogContentText>
                            <TextField
                                value={this.state.name}
                                onChange={this.handleChange}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="First Last Name"
                                type="name"
                                name="name"
                                fullWidth
                            />
                            <TextField
                                value={this.state.email}
                                onChange={this.handleChange}
                                autoFocus
                                margin="dense"
                                id="email"
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                            />
                            <TextField
                                value={this.state.address}
                                onChange={this.handleChange}
                                autoFocus
                                margin="dense"
                                id="address"
                                label="Address"
                                type="address"
                                name="address"
                                fullWidth
                            />
                            <TextField
                                value={this.state.city}
                                onChange={this.handleChange}
                                autoFocus
                                margin="dense"
                                id="city"
                                label="City, State, Zip"
                                type="city"
                                name="city"
                                fullWidth
                            />
                            <TextField
                                value={this.state.phoneNumber}
                                onChange={this.handleChange}
                                autoFocus
                                margin="dense"
                                id="phonenumber"
                                label="Phone Number"
                                type="phone"
                                name="phoneNumber"
                                fullWidth
                            />
                        </DialogContent>
                        {
                            this.state.registerError &&
                            <div className="alert alert-danger" role="alert">
                                        <span className="glyphicon glyphicon-exclamation-sign"
                                              aria-hidden="true"></span>
                                <span className="sr-only">Error:</span>
                                &nbsp;{this.state.registerError}
                            </div>
                        }
                        <DialogActions>
                            <Button onClick={this.handleRequestClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.onEnrollClick} color="primary">
                                Enroll
                            </Button>

                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </div>
        )
    }
}


SideBarItem.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBarItem);