import { UserAddress, UserLocation, WalkRoadType } from "../../types/walkRoad";
import { MapComponent } from "../TMap/InitTmap.tsx";

interface RecommendWalkRoadTemplateProps {
  walkRoadTypeList: WalkRoadType[];
  userLocation: UserLocation;
  userAddress: UserAddress;
}

export const RecommendWalkRoadTemplate = (
  props: RecommendWalkRoadTemplateProps,
) => {
  return (
    <div className="h-full">
      <MapComponent
        UserLat={props.userLocation.lat}
        UserLong={props.userLocation.long}
        WalkRoadTypeList={props.walkRoadTypeList}
      />
      <p className="text-fontBlack">내 위치 : {props.userAddress.mainAddress}</p>
    </div>
  );
};
