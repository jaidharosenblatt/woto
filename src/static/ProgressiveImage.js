import React from "react";
import { connect } from "react-redux";
import selectors from "../redux/selectors";
import {
  stopPageLoading,
  startPageLoading,
} from "../redux/status/actionCreators";
/**
 * @perjansson a low quality blurred image "preview" before displaying "image"
 * https://medium.com/@perjansson/a-progressive-image-loader-in-react-f14ae652619d
 */
class ProgressiveImage extends React.Component {
  componentDidMount() {
    this.props.startPageLoading();
  }
  render() {
    return (
      <img
        onLoad={() => this.props.stopPageLoading()}
        src={this.props.image}
        className={this.props.className}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: selectors.getPageLoading(state),
  };
}
export default connect(mapStateToProps, { stopPageLoading, startPageLoading })(
  ProgressiveImage
);
