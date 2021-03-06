import axios from "axios";
import React from "react";
import { Popover } from "react-bootstrap";
import { ILocation } from "../../models/LocationModel";
import { IPopoverProps } from "../../models/PopoversModel";
import Loader from "../Loader/Loader";
import "./popovers.scss";

const LocationPopover = React.forwardRef<HTMLDivElement, IPopoverProps>(
  (props, ref) => {
    const { url, popper } = props;
    const [location, setLocation] = React.useState<ILocation>(null);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
      popper.scheduleUpdate();
    }, [isLoading, popper]);

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
      <Popover className="popover" id="popover-basic" ref={ref} {...props}>
        <Popover.Body>
          {isLoading ? (
            <Loader />
          ) : (
            <>
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
            </>
          )}
        </Popover.Body>
      </Popover>
    );
  }
);

export default LocationPopover;
