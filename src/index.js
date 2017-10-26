import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import PropTypes from 'prop-types';
import './index.css';

var testTweet = {
  message: 'Something about dogs.',
  gravatar: 'xyz',
  author: {
    handle: 'dogperson',
    name: 'IAMA Dog Person'
  },
  likes: 2,
  retweets: 17,
  timestamp: '2017-10-11 13:24:17'
};

const Time = ({ time }) => {
  const timeString = moment(time).fromNow();
  return <span className="time">{timeString}</span>;
};

Time.propTypes = {
  time: PropTypes.string.isRequired
};

const ReplyButton = () => <i className="fa fa-reply reply-button" />;

// function getRetweetCount(count) {
//   if (count > 0) {
//     return <span className="retweet-count">{count}</span>;
//   } else {
//     return null;
//   }
// }

function Count({ count }) {
  if (count > 0) {
    return <span className="retweet-count">{count}</span>;
  } else {
    return null;
  }
}

const RetweetButton = ({ count }) => (
  <span className="retweet-button">
    <i className="fa fa-retweet" />
    <Count count={count} />
  </span>
);

RetweetButton.propTypes = {
  count: PropTypes.number.isRequired
};

const LikeButton = ({ count }) => (
  <span className="like-button">
    <i className="fa fa-heart" />
    {count > 0 && <span className="like-count">{count}</span>}
  </span>
);

LikeButton.propTypes = {
  count: PropTypes.number.isRequired
};

// const LikeButton = ({ count }) => (
//   <span className="like-button">
//     <i className="fa fa-heart" />
//     <span className="like-count">{count ? count : null}</span>
//   </span>
// );

const MoreOptionsButton = () => <i className="fa fa-ellipsis-h more-options-button" />;

function Message({ text }) {
  return <div className="message">{text}</div>;
}

function NameWithHandle({ author }) {
  const { name, handle } = author;
  return (
    <span className="name-with-handle">
      <span className="name">{name}</span>
      <span className="handle">@{handle}</span>
    </span>
  );
}

NameWithHandle.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    handle: PropTypes.string.isRequired
  }).isRequired
};

function Avatar({ hash }) {
  var url = `https://www.gravatar.com/avatar/${hash}`;
  return <img src={url} className="avatar" alt="avatar" />;
}

function Tweet({ tweet }) {
  return (
    <div className="tweet">
      <Avatar hash={tweet.gravatar} />
      <div className="content">
        <NameWithHandle author={tweet.author} />
        <Time time={tweet.timestamp} />
        <Message text={tweet.message} />
        <div className="buttons">
          <ReplyButton />
          <RetweetButton count={tweet.retweets} />
          <LikeButton count={tweet.likes} />
          <MoreOptionsButton />
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Tweet tweet={testTweet} />, document.querySelector('#root'));
