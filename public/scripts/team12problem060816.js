// team12problem060816.js
/* Hierarchy 
  - DateFormatter
    - DateInput
    - DateOutput
      - DateTableHeader
      - DateRow
*/
//https://facebook.github.io/react/docs/thinking-in-react.html
//https://github.com/johnnywendy/reacttutorial
//http://localhost:3000/
var DateFormatter = React.createClass({
  loadDatesFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleDateSubmit: function(Date) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: Date,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDatesFromServer();
    setInterval(this.loadDatesFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="dateFormatter">
        <h1>Dates</h1>
        <DateInput onDateSubmit={this.handleDateSubmit} />
        <DateOutput data={this.state.data} />
      </div>
    );
  }
});

var DateInput = React.createClass({
  getInitialState: function() {
    return {date: ''};
  },
  handleDateChange: function(e) {
    this.setState({date: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var date = this.state.date.trim();
    if (!date) {
      return;
    }
    this.props.onDateSubmit({date: date});
    this.setState({date: ''});
  },
  render: function() {
    return (
      <form className="dateInput" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Date Input"
          value={this.state.date}
          onChange={this.handleDateChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var DateOutput = React.createClass({
  render: function() {
    var dateNodes = this.props.data.map(function(date) {
      return (
        <Date date={date.date} key={date.id}>
          {date.text}
        </Date>
      );
    });
    return (
      <div className="dateOutput">
        {dateNodes}
      </div>
    );
  }
});

var Date = React.createClass({
  render: function() {
    return (
      <div className="date">
        <h2 className="dateOutput">
          {this.props.date}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

ReactDOM.render(
  <DateFormatter url="/api/team12problem060816" pollInterval={2000} />,
  document.getElementById('content')
);