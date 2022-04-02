import axios from "axios";
import React from "react";
import { Popover } from "react-bootstrap";
import { ILocationPopoverProps } from "../../models/PopoversModel";
import Loader from "../Loader/Loader";
import "./popovers.scss";

const LocationPopover = React.forwardRef<HTMLDivElement, ILocationPopoverProps>(
  (props, ref) => {
    const { url } = props;
    const [location, setLocation] = React.useState(null);
    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
      axios
        .get(url)
        .then(({ data }) => {
          setLocation(data);
        })
        .catch((error) => {
          console.error("LocationPopover", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, []); // eslint-disable-line

    return (
      <Popover className="popover" id="popover-basic" {...props} ref={ref}>
        {isLoading ? (
          <Popover.Body>
            <Loader />
          </Popover.Body>
        ) : (
          <Popover.Body>
            <div className="popover__item">
              <p className="popover__item__title">Name:</p>
              <p className="popover__item__value">{location.name}</p>
            </div>
            <div className="popover__item">
              <p className="popover__item__title">Type:</p>
              <p className="popover__item__value">{location.type}</p>
            </div>
            <div className="popover__item">
              <p className="popover__item__title">Dimension:</p>
              <p className="popover__item__value">{location.dimension}</p>
            </div>
          </Popover.Body>
        )}
      </Popover>
    );
  }
);

export default LocationPopover;
