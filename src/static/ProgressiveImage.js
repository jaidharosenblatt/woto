import React, { Component } from "react";

/**
 * @perjansson a low quality blurred image "preview" before displaying "image"
 * https://medium.com/@perjansson/a-progressive-image-loader-in-react-f14ae652619d
 *
 * Modified to use cloudinary for low image
 */
export default class ProgressiveImage extends Component {
  constructor(props) {
    super(props);
    //Cloudinary specific url modification to get low quality image
    const split = props.image.split("/upload");
    const lowRes = split[0] + "/upload/c_scale,w_10" + split[1];
    this.state = {
      currentImage: lowRes,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchImage(this.props.image);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.image !== this.props.image) {
      this.setState({ currentImage: nextProps.preview, loading: true }, () => {
        this.fetchImage(nextProps.image);
      });
    }
  }

  componentWillUnmount() {
    if (this.loadingImage) {
      this.loadingImage.onload = null;
    }
  }

  fetchImage = (src) => {
    const image = new Image();
    image.onload = () =>
      this.setState({ currentImage: this.loadingImage.src, loading: false });
    image.src = src;
    this.loadingImage = image;
  };

  style = (loading) => {
    return {
      transition: "0.5s filter linear",
      filter: `${loading ? "blur(50px)" : ""}`,
    };
  };

  render() {
    const { currentImage, loading } = this.state;
    const { alt } = this.props;
    return (
      <img
        className={this.props.className}
        style={this.style(loading)}
        src={currentImage}
        alt={alt}
      />
    );
  }
}
