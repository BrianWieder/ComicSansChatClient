import React, { Component } from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import Button from '@material-ui/core/Button';
import { Input } from '@material-ui/core';
import firebase from '../util/firebase';
import { BASE_URL } from '../util/settings';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250
    },
    input: {
        display: 'flex',
        padding: 0
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center'
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light'
                ? theme.palette.grey[300]
                : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue: {
        fontSize: 16
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0
    },
    divider: {
        height: theme.spacing.unit * 2
    }
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography
            className={props.selectProps.classes.singleValue}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return (
        <div className={props.selectProps.classes.valueContainer}>
            {props.children}
        </div>
    );
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper
            square
            className={props.selectProps.classes.paper}
            {...props.innerProps}
        >
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

class NewChat extends Component {
    state = {
        names: null,
        suggestions: [],
        chat_name: ''
    };
    handleChange = name => value => {
        this.setState({
            names: value
        });
    };

    componentDidMount() {
        fetch(`${BASE_URL}/api/users`)
            .then(res => {
                return res.json();
            })
            .then(json => {
                let users = [];
                for (let i = 0; i < json.length; i++) {
                    if (json[i].ID !== firebase.auth().currentUser.uid) {
                        users.push({ label: json[i].name, id: json[i].ID });
                    }
                }
                this.setState({
                    suggestions: users.map(suggestion => ({
                        value: suggestion.label,
                        label: suggestion.label,
                        id: suggestion.id
                    }))
                });
            });
    }

    handleChatNameChange(event) {
        this.setState({ chat_name: event.target.value });
    }

    render() {
        const { classes, theme } = this.props;

        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit'
                }
            })
        };
        return (
            <div style={{ marginTop: 60 }}>
                <Input
                    onChange={this.handleChatNameChange.bind(this)}
                    type="text"
                    value={this.state.chat_name}
                    placeholder="Chat Name"
                    style={{ marginBottom: 20 }}
                    fullWidth
                />

                <Select
                    classes={classes}
                    styles={selectStyles}
                    textFieldProps={{
                        label: 'Chat members',
                        InputLabelProps: {
                            shrink: true
                        }
                    }}
                    options={this.state.suggestions}
                    components={components}
                    value={this.state.multi}
                    onChange={this.handleChange('multi')}
                    placeholder="Select one or more people"
                    isMulti
                />
                <Button
                    variant="outlined"
                    style={{ marginTop: 10 }}
                    onClick={this.onCreateChatClicked.bind(this)}
                >
                    Create Chat
                </Button>
            </div>
        );
    }

    onCreateChatClicked() {
        if (this.state.chat_name) {
            firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(token => {
                    fetch(`${BASE_URL}/api/chats`, {
                        method: 'POST',
                        body: JSON.stringify({
                            chat_name: this.state.chat_name,
                            members: this.state.names
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: token
                        }
                    }).then(() => {
                        this.props.onNewChat();
                    });
                });
        }
    }
}

export default withStyles(styles, { withTheme: true })(NewChat);
