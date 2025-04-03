import React from "react";

interface ImageProps {
  src: string;
  alt?: string;
  height: string;
  width: string;
}

export default class Image extends React.Component<
  ImageProps,
  {
    loaded: boolean;
  }
> {
  constructor(props: ImageProps) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  render() {
    return (
      <>
        {!this.state.loaded && (
          <div
            className="animate-pulse bg-gray-300"
            style={{
              width: this.props.width,
              height: this.props.height,
              animationDuration: "0.5s",
            }}
          ></div>
        )}
        <img
          src={this.props.src}
          alt={this.props.alt}
          onLoad={() => this.setState({ loaded: true })}
          className={`transition-opacity duration-500 ${
            this.state.loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </>
    );
  }
}
