import * as fs from 'fs';
import * as util from 'util';

import SeatMap from './seatMap';
import * as seatMapExtractor from './seatMapExtractor';
import * as seatMapDisplayer from './seatMapDisplayer';

/**
 * Get file path for plane number
 * @param {string} planeNumber Plane number
 * @returns {string} Path to JSON file
 */
function getFilePath(planeNumber: string): string {
    return `./data/${planeNumber}.json`;
}

(async () => {
    const planeNumber: string = process.argv[2];

    try{
        if (!/^VP-[A-Z]+$/.test(planeNumber)) throw new RangeError('Invalid plane number');

        const seatMap: SeatMap.SeatMap = await util.promisify(fs.readFile)(getFilePath(planeNumber))
            .then(seatMapExtractor.extract);

        seatMapDisplayer.display(seatMap);
    }catch(error){
        console.error(`Error getting seat map for plane ${planeNumber}`, error);
    }
})();
