import storage from './storage';
import {inlineSvgFonts} from 'scratch-svg-renderer';
import ConfigServer from '../config_server';
// Contains 'font-family', but doesn't only contain 'font-family="none"'
const HAS_FONT_REGEXP = 'font-family(?!="none")';

const getCostumeUrl = (function () {
    let cachedAssetId;
    let cachedUrl;

    return function (asset) {

        if (cachedAssetId === asset.assetId) {
            return cachedUrl;
        }

        cachedAssetId = asset.assetId;

        // If the SVG refers to fonts, they must be inlined in order to display correctly in the img tag.
        // Avoid parsing the SVG when possible, since it's expensive.
        if (asset.assetType === storage.AssetType.ImageVector) {
            const svgString = asset.decodeText();
            if (svgString.match(HAS_FONT_REGEXP)) {
                const svgText = inlineSvgFonts(svgString);
                cachedUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svgText)}`;
            } else {
                cachedUrl = asset.encodeDataURI();
            }
        } else {
            cachedUrl = asset.encodeDataURI();
        }

        //cachedUrl = "https://www.transparentpng.com/thumb/animation/human-animation-png-5.png";
       // return `${this.assetHost}/api/tasks`;

       return ConfigServer.host  + "/api/tasks";

 
        //"http://192.168.2.206:3000/api/tasks";
    };
}());

export {
    getCostumeUrl as default,
    HAS_FONT_REGEXP
};
