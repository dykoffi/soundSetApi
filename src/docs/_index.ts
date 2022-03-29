import generalDocs from "./info.json";

import soundDocs from "../modules/sound/sound.docs.json"; 
import userDocs from "../modules/user/user.docs.json"; 
import homeDocs from "../modules/home/home.docs.json";

export default {
    ...generalDocs,
    paths: {
        ...homeDocs, 
        ...soundDocs, 
        ...userDocs,
    }
};