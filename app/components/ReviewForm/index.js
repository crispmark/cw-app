import React from 'react';
import ReactStars from 'react-stars';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.onStarChange = this.onStarChange.bind(this);
    this.onReviewChange = this.onReviewChange.bind(this);
    this.onReviewSubmit = this.onReviewSubmit.bind(this);
    this.stars = this.props.stars;
    this.review = this.props.review;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.review !== nextProps.review) {
      this.review = nextProps.review;
    }
    if (this.props.stars !== nextProps.stars) {
      this.stars = nextProps.stars;
    }
  }

  onStarChange(e) {
    this.stars = e;
  }

  onReviewChange(e) {
    this.review = e.target.value;
  }

  onReviewSubmit(e) {
    e.persist();
    e.preventDefault();
    this.props.onReviewSubmit(this.review, this.stars, this.props.reviewId);
  }

  render() {
    if (!this.props.loggedIn) {
      return <h1>Not logged in!</h1>;
    }
    return (
      <Row id="study-tabs">
        <Col md={12}>
          {
            this.props.reviewIsLoading ? null :
            <form onSubmit={this.onReviewSubmit}>
              <ReactStars
                count={5}
                half={false}  // can't do half-star ratings with current db schema
                value={this.props.stars}
                onChange={this.onStarChange}
              />
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
                  Add Your Review
                </ControlLabel>
                <FormControl
                  componentClass="textarea"
                  defaultValue={this.props.review}
                  placeholder="Add your review"
                  onChange={this.onReviewChange}
                />
              </FormGroup>
              <Row>
                <Col md={12} className="text-right">
                  <Button type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </form>
          }
        </Col>
      </Row>
    );
  }
}

ReviewForm.propTypes = {
  onReviewSubmit: React.PropTypes.func.isRequired,
  loggedIn: React.PropTypes.bool,
  stars: React.PropTypes.any,
  review: React.PropTypes.string,
  reviewId: React.PropTypes.number,
  reviewIsLoading: React.PropTypes.bool,
};

ReviewForm.defaultProps = {
  stars: '0',
  review: '',
};

export default ReviewForm;
