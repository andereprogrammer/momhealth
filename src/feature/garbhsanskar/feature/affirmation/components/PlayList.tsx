import React from 'react';
import Svg, { Path } from "react-native-svg";

const Playlist = (props:{onOpenList?:()=>void}) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        onPress={props?.onOpenList}
    >
        <Path
            fill="#fff"
            d="M15 6v2H3V6h12Zm0 4v2H3v-2h12ZM3 16v-2h8v2H3ZM17 6h5v2h-3v9a3 3 0 1 1-3-3c.35 0 .69.07 1 .18V6Zm-1 10a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
        />
    </Svg>
)

export default Playlist;