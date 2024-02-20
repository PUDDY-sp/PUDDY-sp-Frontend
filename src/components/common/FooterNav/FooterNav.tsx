import home from "../../../assets/NavIcon/default/home.svg";
import message from "../../../assets/NavIcon/default/message.svg";
import myPage from "../../../assets/NavIcon/default/myPage.svg";
import map from "../../../assets/NavIcon/default/map.svg";
import community from "../../../assets/NavIcon/default/community.svg";
import home_click from "../../../assets/NavIcon/click/home_click.svg";
import message_click from "../../../assets/NavIcon/click/message_click.svg";
import myPage_click from "../../../assets/NavIcon/click/myPage_click.svg";
import map_click from "../../../assets/NavIcon/click/map_click.svg";
import community_click from "../../../assets/NavIcon/click/community_click.svg";

import useNavStore from "../../../store/useNavstore";
import { NAV_MODE } from "../../../constants/footerNav";
import { PATH_NAME } from "../../../constants/routes.ts";

export const FooterNav = () => {
  const [navMode, selectMode] = useNavStore((state) => [
    state.navMode,
    state.selectMode,
  ]);

  return (
    <>
      <ul className="flex justify-between items-center bg-white px-4 h-20">
        <li className="pr-3.5">
          <a href={PATH_NAME.HOME} onClick={() => selectMode(NAV_MODE.HOME)}>
            {navMode == NAV_MODE.HOME ? (
              <img src={home_click} className="w-10 h-10" alt={NAV_MODE.HOME} />
            ) : (
              <img src={home} className="w-10 h-10" alt={NAV_MODE.HOME} />
            )}
          </a>
        </li>
        <li className="pr-3.5">
          <a
            href={PATH_NAME.MESSAGE}
            onClick={() => selectMode(NAV_MODE.MESSAGE)}
          >
            {navMode == NAV_MODE.MESSAGE ? (
              <img
                src={message_click}
                className="w-10 h-10"
                alt={NAV_MODE.MESSAGE}
              />
            ) : (
              <img src={message} className="w-10 h-10" alt={NAV_MODE.MESSAGE} />
            )}
          </a>
        </li>
        <li className="pr-3.5">
          <a
            href={PATH_NAME.COMMUNITY}
            onClick={() => selectMode(NAV_MODE.COMMUNITY)}
          >
            {navMode == NAV_MODE.COMMUNITY ? (
              <img
                src={community_click}
                className="w-10 h-10"
                alt={NAV_MODE.COMMUNITY}
              />
            ) : (
              <img
                src={community}
                className="w-10 h-10"
                alt={NAV_MODE.COMMUNITY}
              />
            )}
          </a>
        </li>
        <li className="pr-3.5">
          <a href={PATH_NAME.MAP} onClick={() => selectMode(NAV_MODE.MAP)}>
            {navMode == NAV_MODE.MAP ? (
              <img src={map_click} className="w-10 h-10" alt={NAV_MODE.MAP} />
            ) : (
              <img src={map} className="w-10 h-10" alt={NAV_MODE.MAP} />
            )}
          </a>
        </li>
        <li>
          <a
            href={PATH_NAME.MY_PAGE}
            onClick={() => selectMode(NAV_MODE.MY_PAGE)}
          >
            {navMode == NAV_MODE.MY_PAGE ? (
              <img
                src={myPage_click}
                className="w-10 h-10"
                alt={NAV_MODE.MY_PAGE}
              />
            ) : (
              <img src={myPage} className="w-10 h-10" alt={NAV_MODE.MY_PAGE} />
            )}
          </a>
        </li>
      </ul>
    </>
  );
};
