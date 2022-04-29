import axios from "axios";
import React from "react";
import { Popover } from "react-bootstrap";
import { IEpisode } from "../../models/EpisodeModel";
import { IPopoverProps } from "../../models/PopoversModel";
import Loader from "../Loader/Loader";
import "./popovers.scss";

const EpisodePopover = React.forwardRef<HTMLDivElement, IPopoverProps>(
  (props, ref) => {
    const { url, popper } = props;
    const [episode, setEpisode] = React.useState<IEpisode>(null);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
      popper.scheduleUpdate();
    }, [isLoading, popper]);

    React.useEffect(() => {
      axios
        .get(url)
        .then(({ data }) => {
          setEpisode(data);
        })
        .catch((error) => {
          console.error("EpisodePopover", error);
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
                <p className="popover__item__value">{episode.name}</p>
              </div>
              <div className="popover__item">
                <p className="popover__item__title">Episode:</p>
                <p className="popover__item__value">{episode.episode}</p>
              </div>
              <div className="popover__item">
                <p className="popover__item__title">Air date:</p>
                <p className="popover__item__value">{episode.air_date}</p>
              </div>
            </>
          )}
        </Popover.Body>
      </Popover>
    );
  }
);

export default EpisodePopover;
