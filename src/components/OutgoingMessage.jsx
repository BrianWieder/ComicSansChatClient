import React, { Component } from 'react';

class OutgoingMessage extends Component {
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
            <div className="outgoing_msg">
                <div className="sent_msg">
                    <p>{this.props.message}</p>
                    <span className="time_date">{dateString}</span>{' '}
                </div>
            </div>
        );
    }
}

export default OutgoingMessage;
