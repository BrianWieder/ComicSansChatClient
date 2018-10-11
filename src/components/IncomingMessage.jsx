import React, { Component } from 'react';
import { Avatar } from '@material-ui/core';

class IncomingMessage extends Component {
    render() {
        const date = this.props.date;

        var hour = date.getHours();
        var amOrPM = 'AM';

        var months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        if (hour > 12) {
            hour = hour % 12;
            amOrPM = 'PM';
        }

        const dateString = ` ${date.getHours()}:${date.getMinutes()} ${amOrPM} | ${
            months[date.getMonth()]
        } ${date.getDate()}`;

        return (
            <div className="incoming_msg">
                <div className="incoming_msg_name">
                    <p>{this.props.name}</p>
                </div>
                <div className="incoming_msg_img">
                    {' '}
                    <Avatar src={this.props.profilePicture} alt="sunil" />{' '}
                </div>
                <div className="received_msg">
                    <div className="received_withd_msg">
                        <p>{this.props.message}</p>
                        <span className="time_date">{dateString}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default IncomingMessage;
